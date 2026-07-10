const PageContent = require("../models/PageContent");
const Settings = require("../models/Settings");

// @desc    Get all pages list
// @route   GET /api/pages
// @access  Public
const getPages = async (req, res) => {
  try {
    const pages = await PageContent.find().sort({ createdAt: -1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get page by slug
// @route   GET /api/pages/:slug
// @access  Public
const getPageBySlug = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();
    const page = await PageContent.findOne({ slug });
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }
    if (page.isActive === false) {
      return res.status(403).json({ message: "This page has been disabled by the administrator", isDisabled: true });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new page
// @route   POST /api/pages
// @access  Private/Admin
const createPage = async (req, res) => {
  try {
    const {
      title,
      slug,
      bannerTitle,
      bannerSubtitle,
      bannerImage,
      content,
      images,
      aboutImgUrl,
      aboutVideoUrl,
      salesPhone,
      supportPhone,
      email,
      supportEmail,
      address,
      googleMapUrl,
      priceEliteWorkshop,
      setupEliteWorkshop,
      priceEliteProMax,
      setupEliteProMax,
      priceEliteProMaxPlus,
      setupEliteProMaxPlus,
      isActive,
    } = req.body || {};

    if (!title || !slug) {
      return res.status(400).json({ message: "Title and slug are required" });
    }

    const cleanSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, "-")
      .trim();

    // Check for existing slug
    const existing = await PageContent.findOne({ slug: cleanSlug });
    if (existing) {
      return res
        .status(400)
        .json({ message: "A page with this slug already exists" });
    }

    const newPage = await PageContent.create({
      title,
      slug: cleanSlug,
      bannerTitle: bannerTitle || "",
      bannerSubtitle: bannerSubtitle || "",
      bannerImage: bannerImage || "",
      content: content || "",
      images: images || [],
      aboutImgUrl: aboutImgUrl || "",
      aboutVideoUrl: aboutVideoUrl || "",
      salesPhone: salesPhone || "",
      supportPhone: supportPhone || "",
      email: email || "",
      supportEmail: supportEmail || "",
      address: address || "",
      googleMapUrl: googleMapUrl || "",
      priceEliteWorkshop: priceEliteWorkshop || "",
      setupEliteWorkshop: setupEliteWorkshop || "",
      priceEliteProMax: priceEliteProMax || "",
      setupEliteProMax: setupEliteProMax || "",
      priceEliteProMaxPlus: priceEliteProMaxPlus || "",
      setupEliteProMaxPlus: setupEliteProMaxPlus || "",
      isActive: isActive !== undefined ? isActive : true,
    });

    if (cleanSlug === "contact-us") {
      await Settings.findOneAndUpdate(
        {},
        {
          salesPhone: salesPhone || "",
          supportPhone: supportPhone || "",
          email: email || "",
          supportEmail: supportEmail || "",
          address: address || "",
          googleMapUrl: googleMapUrl || "",
        },
        { upsert: true }
      );
    }

    if (cleanSlug === "pricing") {
      await Settings.findOneAndUpdate(
        {},
        {
          priceEliteWorkshop: priceEliteWorkshop || "",
          setupEliteWorkshop: setupEliteWorkshop || "",
          priceEliteProMax: priceEliteProMax || "",
          setupEliteProMax: setupEliteProMax || "",
          priceEliteProMaxPlus: priceEliteProMaxPlus || "",
          setupEliteProMaxPlus: setupEliteProMaxPlus || "",
        },
        { upsert: true }
      );
    }

    res.status(201).json(newPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a page
// @route   PUT /api/pages/:id
// @access  Private/Admin
const updatePage = async (req, res) => {
  try {
    const {
      title,
      slug,
      bannerTitle,
      bannerSubtitle,
      bannerImage,
      content,
      images,
      aboutImgUrl,
      aboutVideoUrl,
      salesPhone,
      supportPhone,
      email,
      supportEmail,
      address,
      googleMapUrl,
      priceEliteWorkshop,
      setupEliteWorkshop,
      priceEliteProMax,
      setupEliteProMax,
      priceEliteProMaxPlus,
      setupEliteProMaxPlus,
      isActive,
    } = req.body || {};

    const page = await PageContent.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    if (title !== undefined) page.title = title;

    if (slug !== undefined) {
      const cleanSlug = slug
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, "-")
        .trim();
      if (cleanSlug !== page.slug) {
        const existing = await PageContent.findOne({ slug: cleanSlug });
        if (existing) {
          return res
            .status(400)
            .json({ message: "A page with this slug already exists" });
        }
        page.slug = cleanSlug;
      }
    }

    if (bannerTitle !== undefined) page.bannerTitle = bannerTitle;
    if (bannerSubtitle !== undefined) page.bannerSubtitle = bannerSubtitle;
    if (bannerImage !== undefined) page.bannerImage = bannerImage;
    if (content !== undefined) page.content = content;
    if (images !== undefined) page.images = images;
    if (aboutImgUrl !== undefined) page.aboutImgUrl = aboutImgUrl;
    if (aboutVideoUrl !== undefined) page.aboutVideoUrl = aboutVideoUrl;
    if (salesPhone !== undefined) page.salesPhone = salesPhone;
    if (supportPhone !== undefined) page.supportPhone = supportPhone;
    if (email !== undefined) page.email = email;
    if (supportEmail !== undefined) page.supportEmail = supportEmail;
    if (address !== undefined) page.address = address;
    if (googleMapUrl !== undefined) page.googleMapUrl = googleMapUrl;
    if (priceEliteWorkshop !== undefined) page.priceEliteWorkshop = priceEliteWorkshop;
    if (setupEliteWorkshop !== undefined) page.setupEliteWorkshop = setupEliteWorkshop;
    if (priceEliteProMax !== undefined) page.priceEliteProMax = priceEliteProMax;
    if (setupEliteProMax !== undefined) page.setupEliteProMax = setupEliteProMax;
    if (priceEliteProMaxPlus !== undefined) page.priceEliteProMaxPlus = priceEliteProMaxPlus;
    if (setupEliteProMaxPlus !== undefined) page.setupEliteProMaxPlus = setupEliteProMaxPlus;
    if (isActive !== undefined) page.isActive = isActive;

    const updatedPage = await page.save();

    if (updatedPage.slug === "contact-us") {
      await Settings.findOneAndUpdate(
        {},
        {
          salesPhone: updatedPage.salesPhone || "",
          supportPhone: updatedPage.supportPhone || "",
          email: updatedPage.email || "",
          supportEmail: updatedPage.supportEmail || "",
          address: updatedPage.address || "",
          googleMapUrl: updatedPage.googleMapUrl || "",
        },
        { upsert: true }
      );
    }

    if (updatedPage.slug === "pricing") {
      await Settings.findOneAndUpdate(
        {},
        {
          priceEliteWorkshop: updatedPage.priceEliteWorkshop || "",
          setupEliteWorkshop: updatedPage.setupEliteWorkshop || "",
          priceEliteProMax: updatedPage.priceEliteProMax || "",
          setupEliteProMax: updatedPage.setupEliteProMax || "",
          priceEliteProMaxPlus: updatedPage.priceEliteProMaxPlus || "",
          setupEliteProMaxPlus: updatedPage.setupEliteProMaxPlus || "",
        },
        { upsert: true }
      );
    }
    res.json(updatedPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a page
// @route   DELETE /api/pages/:id
// @access  Private/Admin
const deletePage = async (req, res) => {
  try {
    const page = await PageContent.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    await page.deleteOne();
    res.json({ message: "Page removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPages,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
};
