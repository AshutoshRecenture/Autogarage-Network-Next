const SocialMedia = require("../models/SocialMedia");

// @desc    Get all social media links
// @route   GET /api/social-media
// @access  Public
const getSocialMedia = async (req, res) => {
  try {
    const links = await SocialMedia.find().sort({ createdAt: 1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a social media link
// @route   POST /api/social-media
// @access  Private/Admin
const createSocialMedia = async (req, res) => {
  try {
    const { platform, url, name, isActive, iconType } = req.body || {};

    if (!platform || !url || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newLink = await SocialMedia.create({
      platform,
      url,
      name,
      isActive: isActive !== undefined ? isActive : true,
      iconType: iconType || "globe",
    });
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a social media link
// @route   PUT /api/social-media/:id
// @access  Private/Admin
const updateSocialMedia = async (req, res) => {
  try {
    const { platform, url, name, isActive, iconType } = req.body || {};

    const link = await SocialMedia.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ message: "Social media link not found" });
    }

    if (platform !== undefined) link.platform = platform;
    if (url !== undefined) link.url = url;
    if (name !== undefined) link.name = name;
    if (isActive !== undefined) link.isActive = isActive;
    if (iconType !== undefined) link.iconType = iconType;

    const updatedLink = await link.save();
    res.json(updatedLink);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a social media link
// @route   DELETE /api/social-media/:id
// @access  Private/Admin
const deleteSocialMedia = async (req, res) => {
  try {
    const link = await SocialMedia.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ message: "Social media link not found" });
    }

    await link.deleteOne();
    res.json({ message: "Social media link removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSocialMedia,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
};
