const ChatLead = require("../models/ChatLead");

// @desc    Create a new chatbot lead
// @route   POST /api/chat-leads
// @access  Public
const createChatLead = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      businessName,
      chatMessages,
      selectedService,
      budgetRange,
      projectDeadline,
      projectDescription,
      leadStatus,
    } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ message: "Please provide user name" });
    }

    const chatLead = await ChatLead.create({
      name,
      email,
      mobile,
      businessName,
      chatMessages: chatMessages || [],
      selectedService,
      budgetRange,
      projectDeadline,
      projectDescription,
      leadStatus: leadStatus || "New",
    });

    res.status(201).json({ success: true, data: chatLead });
  } catch (error) {
    console.error("Create ChatLead Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a chatbot lead by ID
// @route   PUT /api/chat-submissions/:id
// @access  Public
const updateChatLead = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const chatLead = await ChatLead.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!chatLead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    res.status(200).json({ success: true, data: chatLead });
  } catch (error) {
    console.error("Update ChatLead Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all chatbot leads
// @route   GET /api/chat-leads
// @access  Private/Admin
const getChatLeads = async (req, res) => {
  try {
    const leads = await ChatLead.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    console.error("Get ChatLeads Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a chatbot lead by ID
// @route   DELETE /api/chat-submissions/:id
// @access  Private/Admin
const deleteChatLead = async (req, res) => {
  try {
    const chatLead = await ChatLead.findById(req.params.id);

    if (chatLead) {
      await chatLead.deleteOne();
      res.json({ message: "Chatbot lead removed" });
    } else {
      res.status(404).json({ message: "Chatbot lead not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createChatLead,
  updateChatLead,
  getChatLeads,
  deleteChatLead,
};
