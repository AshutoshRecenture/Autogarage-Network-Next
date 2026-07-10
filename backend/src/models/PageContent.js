const mongoose = require("mongoose");

const pageContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    bannerTitle: {
      type: String,
      default: "",
    },
    bannerSubtitle: {
      type: String,
      default: "",
    },
    bannerImage: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    aboutImgUrl: {
      type: String,
      default: "",
    },
    aboutVideoUrl: {
      type: String,
      default: "",
    },
    salesPhone: {
      type: String,
      default: "",
    },
    supportPhone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    supportEmail: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    googleMapUrl: {
      type: String,
      default: "",
    },
    priceEliteWorkshop: {
      type: String,
      default: "",
    },
    setupEliteWorkshop: {
      type: String,
      default: "",
    },
    priceEliteProMax: {
      type: String,
      default: "",
    },
    setupEliteProMax: {
      type: String,
      default: "",
    },
    priceEliteProMaxPlus: {
      type: String,
      default: "",
    },
    setupEliteProMaxPlus: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const PageContent = mongoose.model("PageContent", pageContentSchema);
module.exports = PageContent;
