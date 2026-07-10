const mongoose = require("mongoose");

const chatLeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    mobile: {
      type: String,
      required: false,
    },
    businessName: {
      type: String,
      required: false,
    },
    chatMessages: [
      {
        sender: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: false,
        },
        time: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    selectedService: {
      type: String,
      required: false,
    },
    budgetRange: {
      type: String,
      required: false,
    },
    projectDeadline: {
      type: String,
      required: false,
    },
    projectDescription: {
      type: String,
      required: false,
    },
    leadStatus: {
      type: String,
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

const ChatLead = mongoose.model("ChatLead", chatLeadSchema);
module.exports = ChatLead;
