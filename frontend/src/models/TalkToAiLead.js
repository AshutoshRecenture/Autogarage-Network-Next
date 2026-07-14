import mongoose from "mongoose";

const talkToAiLeadSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    chatMode: { type: String, enum: ["text", "voice"], default: "voice" },
    selectedService: { type: String },
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

if (mongoose.models.TalkToAiLead) {
  delete mongoose.models.TalkToAiLead;
}
const TalkToAiLead = mongoose.model("TalkToAiLead", talkToAiLeadSchema);
export default TalkToAiLead;
