import { createOpenAI } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";
import connectToDatabase from "@/lib/mongodb";
import ChatLead from "@/models/ChatLead";
import TalkToAiLead from "@/models/TalkToAiLead";

export const maxDuration = 30;

export async function POST(req) {
  try {
    // Force fallback mode by ignoring the OpenAI key.
    // The configured key is likely out of credits or invalid, causing timeouts.
    const apiKey = null; // process.env.OPENAI_API_KEY;
    const body = await req.json();
    const { messages, sessionId, mode = "text", captchaToken } = body;

    if (!sessionId || !messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    // Dynamic lead model based on mode
    const LeadModel = mode === "voice" ? TalkToAiLead : ChatLead;

    // Find or Create Lead
    let lead = await LeadModel.findOne({ sessionId });
    if (!lead) {
      lead = await LeadModel.create({ sessionId, chatMode: mode });
    }

    // Save User Message
    const latestMessage = messages[messages.length - 1];
    if (latestMessage.role === "user") {
      try {
        lead.chatMessages.push({
          sender: "user",
          message: latestMessage.content,
          time: new Date(),
        });
        await lead.save();

        // Synchronously extract and update lead fields in DB before streaming/API setup
        await updateLeadFieldsFromMessage(lead, latestMessage.content);
      } catch (dbError) {
        console.error("Database Save Error (User Message):", dbError);
        return new Response(
          JSON.stringify({
            error: "Failed to save user message to database",
            details: dbError.message,
          }),
          { status: 500, headers: { "Content-Type": "application/json" } },
        );
      }
    }

    let customStream;
    let useFallback = false;

    if (!apiKey) {
      console.warn("No OpenAI API Key found, using fallback dialog manager.");
      useFallback = true;
    } else {
      try {
        const systemPrompt = `You are the official AI Assistant for Auto Garage Network.
Your PRIMARY GOAL is to collect the user's information through natural conversation.
You MUST follow this exact sequence to collect and save details:
1. First, the user selects or states a service they are interested in. If it is not saved yet, save it under 'selectedService' immediately. (Available services: "Garage Management System", "Website for Garages", "Autotech Data", "MOT Diary", "SEO Services").
2. Next, ask for their Full Name.
3. Then, ask for their Email Address and Phone Number.
4. Then, ask for their Purpose / description (what specific features or help they need under that service).
5. Finally, ask for their Budget.

Guidelines:
- If the user hasn't selected a service yet, ask them to choose or specify a service first.
- If they ask a question before providing their details, politely acknowledge it, but explain that you need their basic details to best assist them, and ask the next missing detail in the sequence.
- Keep your answers concise and friendly so it sounds natural when spoken aloud.
- Ask for one detail at a time to avoid overwhelming the user.
- As soon as the user provides any piece of information (service, name, email, phone, purpose, budget), you MUST call the 'save_lead_details' tool immediately to save it.
- CRITICAL: Whenever you call the 'save_lead_details' tool, you MUST also generate a text response (e.g., "Got it, thank you! Could I get your email address next?"). Never call a tool without speaking.
- Only after all details are collected (Service, Name, Email, Phone, Purpose, Budget) should you provide detailed solutions or answer deep questions about our services.
- LANGUAGE GUIDELINE: Greet the user in English. However, always respond in the same language used by the user. If they type or speak in Hindi or Hinglish (e.g., "naam mera...", "haan", "mujhko..."), you MUST respond in Hindi or Hinglish. If they type or speak in English, respond in English.`;

        const formattedMessages = [
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ];

        const openai = createOpenAI({ apiKey });

        const result = await streamText({
          model: openai("gpt-3.5-turbo"),
          system: systemPrompt,
          messages: formattedMessages,
          maxRetries: 0, // Fail fast on rate-limits/quotas to trigger fallback immediately
          maxSteps: 3,
          tools: {
            save_lead_details: tool({
              description:
                "Update the user's lead information in the database. Call this tool as soon as the user provides any of the requested details.",
              parameters: z.object({
                selectedService: z.string().optional(),
                fullName: z.string().optional(),
                email: z.string().optional(),
                phone: z.string().optional(),
                purpose: z.string().optional(),
                budget: z.string().optional(),
                additionalDetails: z.string().optional(),
              }),
              execute: async (args) => {
                try {
                  const updateFields = {};
                  Object.keys(args).forEach((key) => {
                    if (args[key] !== undefined) updateFields[key] = args[key];
                  });

                  if (Object.keys(updateFields).length > 0) {
                    await LeadModel.findOneAndUpdate(
                      { sessionId },
                      { $set: updateFields },
                    );
                    return "Lead info updated successfully.";
                  }
                  return "No info to update.";
                } catch (e) {
                  console.error("Tool Error:", e);
                  return "Failed to update.";
                }
              },
            }),
          },
          async onFinish({ text }) {
            try {
              const updatedLead = await LeadModel.findOne({ sessionId });
              if (updatedLead) {
                updatedLead.chatMessages.push({
                  sender: "assistant",
                  message: text || "[Action Performed]",
                  time: new Date(),
                });
                await updatedLead.save();
              }
            } catch (dbError) {
              console.error(
                "Database Save Error (Assistant Message):",
                dbError,
              );
            }
          },
        });

        customStream = new ReadableStream({
          async start(controller) {
            let hasReceivedText = false;
            let hasError = false;
            const encoder = new TextEncoder();
            try {
              for await (const chunk of result.fullStream) {
                if (chunk.type === "text-delta" && chunk.textDelta) {
                  hasReceivedText = true;
                  controller.enqueue(encoder.encode(chunk.textDelta));
                } else if (chunk.type === "error") {
                  hasError = true;
                  throw new Error(chunk.error?.message || "Provider error");
                }
              }
              if (!hasReceivedText && !hasError) {
                controller.enqueue(
                  encoder.encode("Got it! Just saving your details now..."),
                );
              }
            } catch (streamError) {
              console.error(
                "OpenAI stream processing failed, switching to offline assistant. Error:",
                streamError,
              );
              const recoveryReply = await getDialogManagerReply(lead);
              controller.enqueue(encoder.encode(recoveryReply));
            } finally {
              controller.close();
            }
          },
        });
      } catch (openaiErr) {
        console.warn(
          "OpenAI API call setup failed, falling back to rule-based dialog manager. Error:",
          openaiErr.message,
        );
        useFallback = true;
      }
    }

    if (useFallback) {
      const replyText = await getDialogManagerReply(lead);
      const encoder = new TextEncoder();
      customStream = new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(replyText));
          controller.close();
        },
      });
    }

    // Retrieve final lead details to send back current lead status in headers
    const finalLead = await LeadModel.findOne({ sessionId });

    return new Response(customStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Selected-Service": finalLead?.selectedService || "",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Internal Server Error",
        stack: error.stack,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

// Synchronously parses and updates the lead database fields based on sequential empty state
async function updateLeadFieldsFromMessage(lead, lastUserMsg) {
  const VALID_SERVICES = [
    "Garage Management System",
    "Website for Garages",
    "Autotech Data",
    "MOT Diary",
    "SEO Services",
  ];

  if (!lead.selectedService) {
    // Find if user message matches one of our services (case-insensitive, substring match)
    const matchedService = VALID_SERVICES.find(
      (s) =>
        lastUserMsg.toLowerCase().includes(s.toLowerCase()) ||
        s.toLowerCase().includes(lastUserMsg.toLowerCase()),
    );

    if (matchedService) {
      lead.selectedService = matchedService;
    }
  } else if (!lead.fullName) {
    lead.fullName = lastUserMsg;
  } else if (!lead.email || !lead.phone) {
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
    const phoneRegex = /(\+?\d[\d-\s()]{7,15})/g;
    const emailMatch = lastUserMsg.match(emailRegex);
    const phoneMatch = lastUserMsg.match(phoneRegex);

    let updatedEmail = false;
    let updatedPhone = false;

    if (emailMatch && !lead.email) {
      lead.email = emailMatch[0];
      updatedEmail = true;
    }
    if (phoneMatch && phoneMatch.length > 0 && !lead.phone) {
      lead.phone = phoneMatch[0].trim();
      updatedPhone = true;
    }

    if (!updatedEmail && !updatedPhone) {
      if (!lead.email) {
        lead.email = lastUserMsg;
      } else if (!lead.phone) {
        lead.phone = lastUserMsg;
      }
    }
  } else if (!lead.purpose) {
    lead.purpose = lastUserMsg;
  } else if (!lead.budget) {
    lead.budget = lastUserMsg;
  }

  await lead.save();
}

// Dialog manager function to calculate the rule-based response
async function getDialogManagerReply(lead) {
  try {
    // Check if the user is using Hindi/Hinglish by scanning the latest user message or previous user messages
    const userMessages = lead.chatMessages.filter((m) => m.sender === "user");
    const lastUserMsgText =
      userMessages[userMessages.length - 1]?.message || "";

    const hindiWords = [
      "naam",
      "mera",
      "mira",
      "hu",
      "hai",
      "kya",
      "kaise",
      "shuru",
      "haan",
      "achha",
      "dhanyawad",
      "hindi",
      "namaste",
      "chahiye",
      "krdo",
      "kardo",
      "he",
      "ko",
      "se",
      "kar",
      "bata",
      "batao",
      "apna",
      "apni",
      "sakte",
      "sakti",
      "kuch",
      "aur",
      "jald",
    ];

    // Check if it has Devanagari characters or contains any common Hindi words
    const hasDevanagari = /[\u0900-\u097F]/.test(lastUserMsgText);
    const hasHindiWord = hindiWords.some((word) =>
      new RegExp(`\\b${word}\\b`, "i").test(lastUserMsgText.toLowerCase()),
    );
    const isHindi = hasDevanagari || hasHindiWord;

    // Determine what to ask next based on current lead fields
    let replyText = "";
    if (isHindi) {
      if (!lead.selectedService) {
        replyText =
          "Please select or state one of our available services to get started: Garage Management System, Website for Garages, Autotech Data, MOT Diary, ya SEO Services.";
      } else if (!lead.fullName) {
        replyText = `Samajh gaya! Aap "${lead.selectedService}" me interested hain. Shuru karne ke liye kya aap mujhe apna pura naam bata sakte hain?`;
      } else if (!lead.email || !lead.phone) {
        if (lead.email && !lead.phone) {
          replyText = `Aapka email mil gaya: ${lead.email}. Kya aap apna phone number bhi de sakte hain taaki hum aapse contact kar sakein?`;
        } else {
          replyText = `Dhanyawad, ${lead.fullName}! Hume aapse contact karne ke liye aapka email address aur phone number kya hai?`;
        }
      } else if (!lead.purpose) {
        replyText = `Acha! Is project ka main purpose kya hai, aur aap kya features chahte hain?`;
      } else if (!lead.budget) {
        replyText = `Got it. Aakhiri sawaal, is service ke liye aapka estimated budget kya hai?`;
      } else {
        const closingWords = [
          "thank",
          "thanks",
          "bye",
          "nothing",
          "no",
          "nahi",
          "dhanyawad",
          "goodbye",
          "ok",
          "okay",
        ];
        const isClosing = closingWords.some((word) =>
          lastUserMsgText.toLowerCase().includes(word),
        );

        if (isClosing) {
          replyText =
            "Dhanyawad! Aapka din shubh ho. Hum jaldi hi aapse sampark karenge.";
        } else {
          replyText = `Bahut bahut dhanyawad, ${lead.fullName}! Maine aapki saari details database mein save kar li hain. Humari team jaldi hi aapse ${lead.email} aur ${lead.phone} par contact karegi "${lead.selectedService}" ke liye. Kya aap kuch aur puchna chahte hain?`;
        }
      }
    } else {
      if (!lead.selectedService) {
        replyText =
          "Please select or state one of our available services to get started: Garage Management System, Website for Garages, Autotech Data, MOT Diary, or SEO Services.";
      } else if (!lead.fullName) {
        replyText = `Understood! You're interested in the "${lead.selectedService}". Could you please tell me your full name to start?`;
      } else if (!lead.email || !lead.phone) {
        if (lead.email && !lead.phone) {
          replyText = `Got your email: ${lead.email}. Could you also provide your phone number so we can easily reach you?`;
        } else {
          replyText = `Thank you, ${lead.fullName}! What is your email address and phone number so our team can get in touch?`;
        }
      } else if (!lead.purpose) {
        replyText = `Great! What is the purpose of this project, or what features are you looking to implement?`;
      } else if (!lead.budget) {
        replyText = `Got it. Lastly, what is your estimated budget for this service?`;
      } else {
        const closingWords = [
          "thank",
          "thanks",
          "bye",
          "nothing",
          "no",
          "nahi",
          "dhanyawad",
          "goodbye",
          "ok",
          "okay",
        ];
        const isClosing = closingWords.some((word) =>
          lastUserMsgText.toLowerCase().includes(word),
        );

        if (isClosing) {
          replyText =
            "You're welcome! Have a great day! We will be in touch soon.";
        } else {
          replyText = `Thank you so much, ${lead.fullName}! I have successfully saved all your requirements in our database. Our sales team will reach out to you at email ${lead.email} and phone number ${lead.phone} to discuss the next steps for "${lead.selectedService}". Is there anything else you'd like to ask?`;
        }
      }
    }

    // Save assistant message to DB
    lead.chatMessages.push({
      sender: "assistant",
      message: replyText,
      time: new Date(),
    });
    await lead.save();

    return replyText;
  } catch (err) {
    console.error("Dialog Manager Fallback Error:", err);
    return "I'm sorry, I encountered an issue updating your details. How else can I help?";
  }
}
