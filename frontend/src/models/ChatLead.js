import mongoose from "mongoose";

const chatLeadSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    chatMode: { type: String, enum: ["text", "voice"], default: "text" },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    purpose: { type: String },
    budget: { type: String },
    additionalDetails: { type: String },
    chatMessages: [
      {
        sender: { type: String, enum: ["user", "assistant"], required: true },
        message: { type: String, required: true },
        time: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const ChatLead = mongoose.models.ChatLead || mongoose.model("ChatLead", chatLeadSchema);
export default ChatLead;
