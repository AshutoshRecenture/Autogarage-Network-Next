const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const ChatLead = require("../src/models/ChatLead");
const TalkToAiLead = require("../src/models/TalkToAiLead");

dotenv.config({ path: path.join(__dirname, "../.env") });

async function verify() {
  try {
    console.log("Connecting to MongoDB at:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);

    // Clean up previous test leads if any
    await ChatLead.deleteMany({ sessionId: "test-chat-session-123" });
    await TalkToAiLead.deleteMany({ sessionId: "test-talk-session-456" });

    // 1. Create a ChatLead (Text Mode)
    console.log("Creating a ChatLead (Text Mode)...");
    const chatLead = await ChatLead.create({
      sessionId: "test-chat-session-123",
      chatMode: "text",
      selectedService: "Garage Management System",
      fullName: "Alice Smith",
      email: "alice@example.com",
      phone: "+447700900077",
      purpose: "Need auto booking SMS system",
      budget: "£1,000 - £5,000",
      chatMessages: [
        { sender: "assistant", message: "What service can I help you with today?" },
        { sender: "user", message: "Garage Management System" },
        { sender: "assistant", message: "Got it! Could I please get your full name?" },
        { sender: "user", message: "Alice Smith" }
      ]
    });
    console.log("ChatLead created successfully:", chatLead._id);

    // 2. Create a TalkToAiLead (Voice Mode)
    console.log("Creating a TalkToAiLead (Voice Mode)...");
    const talkLead = await TalkToAiLead.create({
      sessionId: "test-talk-session-456",
      chatMode: "voice",
      selectedService: "Website for Garages",
      fullName: "Bob Jones",
      email: "bob@example.com",
      phone: "+447700900088",
      purpose: "Create premium tyre shop website",
      budget: "£5,000+",
      chatMessages: [
        { sender: "assistant", message: "What service can I help you with today?" },
        { sender: "user", message: "Website for Garages" },
        { sender: "assistant", message: "Got it! Could I please get your full name?" },
        { sender: "user", message: "Bob Jones" }
      ]
    });
    console.log("TalkToAiLead created successfully:", talkLead._id);

    // 3. Query the DB collections directly to verify separation
    const chatCollectionName = ChatLead.collection.name;
    const talkCollectionName = TalkToAiLead.collection.name;

    console.log("\n--- Verification Results ---");
    console.log(`ChatLead Collection Name in MongoDB: "${chatCollectionName}"`);
    console.log(`TalkToAiLead Collection Name in MongoDB: "${talkCollectionName}"`);

    const chatLeadsInDb = await ChatLead.find({ sessionId: "test-chat-session-123" });
    const talkLeadsInDb = await TalkToAiLead.find({ sessionId: "test-talk-session-456" });

    console.log(`\nChatLeads count: ${chatLeadsInDb.length}`);
    console.log("ChatLead fields retrieved:", {
      id: chatLeadsInDb[0]._id,
      selectedService: chatLeadsInDb[0].selectedService,
      fullName: chatLeadsInDb[0].fullName,
      email: chatLeadsInDb[0].email,
      phone: chatLeadsInDb[0].phone,
      purpose: chatLeadsInDb[0].purpose,
      budget: chatLeadsInDb[0].budget,
      messagesCount: chatLeadsInDb[0].chatMessages.length
    });

    console.log(`\nTalkToAiLeads count: ${talkLeadsInDb.length}`);
    console.log("TalkToAiLead fields retrieved:", {
      id: talkLeadsInDb[0]._id,
      selectedService: talkLeadsInDb[0].selectedService,
      fullName: talkLeadsInDb[0].fullName,
      email: talkLeadsInDb[0].email,
      phone: talkLeadsInDb[0].phone,
      purpose: talkLeadsInDb[0].purpose,
      budget: talkLeadsInDb[0].budget,
      messagesCount: talkLeadsInDb[0].chatMessages.length
    });

    if (chatCollectionName !== talkCollectionName) {
      console.log("\nSUCCESS: Leads are stored in separate MongoDB collections!");
    } else {
      console.log("\nFAILURE: Leads are in the same collection.");
    }

    // Clean up
    await ChatLead.deleteMany({ sessionId: "test-chat-session-123" });
    await TalkToAiLead.deleteMany({ sessionId: "test-talk-session-456" });
    console.log("Cleanup completed.");

  } catch (err) {
    console.error("Verification error:", err);
  } finally {
    await mongoose.connection.close();
  }
}

verify();
