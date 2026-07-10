const Faq = require("../models/Faq");

// Get all FAQs
exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Create a new FAQ
exports.createFaq = async (req, res) => {
  try {
    const { question, answer, order } = req.body;
    
    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer are required" });
    }

    const newFaq = new Faq({
      question,
      answer,
      order: order || 0
    });

    const savedFaq = await newFaq.save();
    res.status(201).json(savedFaq);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update an FAQ
exports.updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, order } = req.body;

    const faq = await Faq.findById(id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    faq.question = question || faq.question;
    faq.answer = answer || faq.answer;
    if (order !== undefined) {
      faq.order = order;
    }

    const updatedFaq = await faq.save();
    res.status(200).json(updatedFaq);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete an FAQ
exports.deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await Faq.findById(id);
    
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    await Faq.findByIdAndDelete(id);
    res.status(200).json({ message: "FAQ removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
