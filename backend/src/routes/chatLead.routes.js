const express = require("express");
const {
  createChatLead,
  updateChatLead,
  getChatLeads,
  deleteChatLead,
} = require("../controllers/chatLead.controller");
const { protect, checkPermission } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").get(protect, checkPermission("chatLeads", "read"), getChatLeads).post(createChatLead);

router.route("/:id").put(updateChatLead).delete(protect, checkPermission("chatLeads", "write"), deleteChatLead);

module.exports = router;
