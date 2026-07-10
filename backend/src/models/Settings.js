const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    logoUrl: {
      type: String,
      default: "https://www.autogaragenetwork.com/catalog/view/theme/avnv1/assets/img/logo-color.png",
    },
    siteAccentColor: {
      type: String,
      default: "indigo",
    },
    enableCustomCursor: {
      type: Boolean,
      default: true,
    },
    salesPhone: {
      type: String,
      default: "07947 906789",
    },
    supportPhone: {
      type: String,
      default: "01702 655556",
    },
    email: {
      type: String,
      default: "info@autogaragenetwork.com",
    },
    supportEmail: {
      type: String,
      default: "jatindersingh@autogaragenetwork.com",
    },
    address: {
      type: String,
      default: "The Chestnuts, 46 Middle Lane, Nether Broughton, LE14 3HD",
    },
    googleMapUrl: {
      type: String,
      default: "https://maps.app.goo.gl/vBwPZYJRoGCNC1M67",
    },
    priceEliteWorkshop: {
      type: String,
      default: "135",
    },
    setupEliteWorkshop: {
      type: String,
      default: "500",
    },
    priceEliteProMax: {
      type: String,
      default: "235",
    },
    setupEliteProMax: {
      type: String,
      default: "1000",
    },
    priceEliteProMaxPlus: {
      type: String,
      default: "375",
    },
    setupEliteProMaxPlus: {
      type: String,
      default: "500",
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);
module.exports = Settings;
