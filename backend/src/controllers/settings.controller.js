const Settings = require("../models/Settings");

// @desc    Get system settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // Create default settings if not exists
      settings = await Settings.create({
        logoUrl: "https://www.autogaragenetwork.com/catalog/view/theme/avnv1/assets/img/logo-color.png",
        siteAccentColor: "indigo",
        enableCustomCursor: true,
        salesPhone: "07947 906789",
        supportPhone: "01702 655556",
        email: "info@autogaragenetwork.com",
        supportEmail: "jatindersingh@autogaragenetwork.com",
        address: "The Chestnuts, 46 Middle Lane, Nether Broughton, LE14 3HD",
        googleMapUrl: "https://maps.app.goo.gl/vBwPZYJRoGCNC1M67",
        priceEliteWorkshop: "135",
        setupEliteWorkshop: "500",
        priceEliteProMax: "235",
        setupEliteProMax: "1000",
        priceEliteProMaxPlus: "375",
        setupEliteProMaxPlus: "500",
      });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update system settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
  try {
    const {
      logoUrl,
      siteAccentColor,
      enableCustomCursor,
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
    } = req.body || {};

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
    }

    if (logoUrl !== undefined) settings.logoUrl = logoUrl;
    if (siteAccentColor !== undefined) settings.siteAccentColor = siteAccentColor;
    if (enableCustomCursor !== undefined) settings.enableCustomCursor = enableCustomCursor;
    if (salesPhone !== undefined) settings.salesPhone = salesPhone;
    if (supportPhone !== undefined) settings.supportPhone = supportPhone;
    if (email !== undefined) settings.email = email;
    if (supportEmail !== undefined) settings.supportEmail = supportEmail;
    if (address !== undefined) settings.address = address;
    if (googleMapUrl !== undefined) settings.googleMapUrl = googleMapUrl;

    // Only allow super admins to edit pricing and setup costs
    if (req.user && req.user.role === "super_admin") {
      if (priceEliteWorkshop !== undefined) settings.priceEliteWorkshop = priceEliteWorkshop;
      if (setupEliteWorkshop !== undefined) settings.setupEliteWorkshop = setupEliteWorkshop;
      if (priceEliteProMax !== undefined) settings.priceEliteProMax = priceEliteProMax;
      if (setupEliteProMax !== undefined) settings.setupEliteProMax = setupEliteProMax;
      if (priceEliteProMaxPlus !== undefined) settings.priceEliteProMaxPlus = priceEliteProMaxPlus;
      if (setupEliteProMaxPlus !== undefined) settings.setupEliteProMaxPlus = setupEliteProMaxPlus;
    }

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
