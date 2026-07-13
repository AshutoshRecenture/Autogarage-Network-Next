import { createOpenAI } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";
import connectToDatabase from "@/lib/mongodb";
import ChatLead from "@/models/ChatLead";

export const maxDuration = 30;

export async function POST(req) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing OpenAI API Key" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const body = await req.json();
    const { messages, sessionId, mode = "text" } = body;

    if (!sessionId || !messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    await connectToDatabase();

    // Find or Create ChatLead
    let lead = await ChatLead.findOne({ sessionId });
    if (!lead) {
      lead = await ChatLead.create({ sessionId, chatMode: mode });
    }

    // Save User Message
    const latestMessage = messages[messages.length - 1];
    if (latestMessage.role === "user") {
      try {
        lead.chatMessages.push({ 
          sender: "user", 
          message: latestMessage.content,
          time: new Date()
        });
        await lead.save();
      } catch (dbError) {
        console.error("Database Save Error (User Message):", dbError);
        return new Response(JSON.stringify({ 
          error: "Failed to save user message to database", 
          details: dbError.message 
        }), { status: 500, headers: { "Content-Type": "application/json" } });
      }
    }

    const systemPrompt = `You are the official AI Assistant for Auto Garage Network.
Your PRIMARY GOAL is to collect the user's information BEFORE providing detailed solutions or answering complex questions.
You must collect the following details through natural conversation:
1. Their Purpose / What they are looking for
2. Full Name
3. Email Address
4. Phone Number
5. Budget

Guidelines:
- If they ask a complex question, politely acknowledge it, but explain that you need some basic details to best assist them, and ask the first missing question from the list.
- Keep your answers concise and friendly so it sounds natural when spoken aloud.
- Ask one or two questions at a time to avoid overwhelming the user.
- As soon as they provide ANY piece of information (name, email, etc.), you MUST call the 'save_lead_details' tool to save it.
- CRITICAL: Whenever you call the tool, you MUST also generate a text response (e.g., "Got it! And what is your email?"). Never call a tool without speaking.
- Only after all details are collected should you proceed to answer their deep questions about our garage software, websites, or SEO services.`;

    const formattedMessages = [
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const openai = createOpenAI({ apiKey });

    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      system: systemPrompt,
      messages: formattedMessages,
      maxSteps: 3,
      tools: {
        save_lead_details: tool({
          description: "Update the user's lead information in the database. Call this tool as soon as the user provides any of the requested details.",
          parameters: z.object({
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
              Object.keys(args).forEach(key => { if (args[key]) updateFields[key] = args[key]; });
              
              if (Object.keys(updateFields).length > 0) {
                 await ChatLead.findOneAndUpdate({ sessionId }, { $set: updateFields });
                 return "Lead info updated successfully.";
              }
              return "No info to update.";
            } catch (e) {
              console.error("Tool Error:", e);
              return "Failed to update.";
            }
          }
        })
      },
      async onFinish({ text }) {
        try {
          const updatedLead = await ChatLead.findOne({ sessionId });
          if (updatedLead) {
            updatedLead.chatMessages.push({
              sender: "assistant",
              message: text || "[Action Performed]",
              time: new Date()
            });
            await updatedLead.save();
          }
        } catch (dbError) {
          console.error("Database Save Error (Assistant Message):", dbError);
        }
      },
    });

    const customStream = new ReadableStream({
      async start(controller) {
        let hasReceivedText = false;
        let hasError = false;
        const encoder = new TextEncoder();
        try {
          // Use fullStream to capture text-delta events from ALL steps (including after tool calls)
          for await (const chunk of result.fullStream) {
            if (chunk.type === "text-delta" && chunk.textDelta) {
              hasReceivedText = true;
              controller.enqueue(encoder.encode(chunk.textDelta));
            } else if (chunk.type === "error") {
              hasError = true;
              const errMsg = chunk.error?.message || JSON.stringify(chunk.error) || "Provider error";
              console.error("AI Provider Stream Error:", chunk.error);
              controller.enqueue(encoder.encode(`\n[AI Error: ${errMsg}]`));
            }
          }
          if (!hasReceivedText && !hasError) {
            // This can happen if the AI only called a tool on the last step. Surface it gracefully.
            console.warn("AI returned no text — only tool calls were made.");
            controller.enqueue(encoder.encode("Got it! Just saving your details now..."));
          }
        } catch (streamError) {
          console.error("AI Stream Error:", streamError);
          const errorMsg = streamError?.message || "Unknown streaming error";
          controller.enqueue(encoder.encode(`\n[Stream Error: ${errorMsg}]`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(customStream, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error", stack: error.stack }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
