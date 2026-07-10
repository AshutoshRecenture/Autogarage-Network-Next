const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faq.controller");
const { protect, checkPermission } = require("../middleware/auth.middleware");

// Public route to get all FAQs
router.get("/", faqController.getAllFaqs);

// Protected routes (Admin only for modifying FAQs)
router.post("/", protect, checkPermission("faqs", "write"), faqController.createFaq);
router.put("/:id", protect, checkPermission("faqs", "write"), faqController.updateFaq);
router.delete("/:id", protect, checkPermission("faqs", "write"), faqController.deleteFaq);

module.exports = router;
