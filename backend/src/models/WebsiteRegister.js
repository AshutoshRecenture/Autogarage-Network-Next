const mongoose = require("mongoose");

const websiteRegisterSchema = new mongoose.Schema(
  {
    // Business Information
    monFriFrom: { type: String, default: "Closed" },
    monFriTo: { type: String, default: "Closed" },
    satFrom: { type: String, default: "Closed" },
    satTo: { type: String, default: "Closed" },
    sunFrom: { type: String, default: "Closed" },
    sunTo: { type: String, default: "Closed" },
    email: { type: String, required: true },
    address: { type: String, default: "" },
    contactName: { type: String, required: true },
    phone: { type: String, required: true },

    // Domain Information
    domainName: { type: String, default: "" },
    domainRegUrl: { type: String, default: "" },
    domainUsername: { type: String, default: "" },
    domainPassword: { type: String, default: "" },
    noDomainName: { type: Boolean, default: false },

    // Tyre, Servicing & Social Media
    sellTyres: { type: String, default: "No" },
    offerServices: { type: String, default: "No" },
    useSocialMedia: { type: String, default: "No" },

    // Essential Info & Documents
    companyNumber: { type: String, required: true },
    termsDocUrl: { type: String, default: "" },
    privacyDocUrl: { type: String, default: "" },
    returnsDocUrl: { type: String, default: "" },
    companyAge: { type: String, default: "" },
    socialInfo: { type: String, default: "" },

    // Sales Person & Design
    salesPerson: { type: String, default: "" },
    designStyle: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const WebsiteRegister = mongoose.model("WebsiteRegister", websiteRegisterSchema);
module.exports = WebsiteRegister;
