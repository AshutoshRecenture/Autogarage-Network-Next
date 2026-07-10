const WebsiteRegister = require("../models/WebsiteRegister");
const { verifyCaptchaToken } = require("../utils/captcha");
const { cloudinary } = require("../config/cloudinary");
const fs = require("fs");

// Helper function to upload file to Cloudinary
const uploadToCloudinary = async (file) => {
  if (!file) return "";
  try {
    console.log(`Uploading document ${file.originalname} to Cloudinary...`);
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "documents",
      resource_type: "auto", // PDF, Docx, txt, images etc.
    });
    // Delete local temp file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    return result.secure_url || result.url || "";
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    // Cleanup local temp file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    throw error;
  }
};

// @desc    Submit website register GMS form
// @route   POST /api/website-register
// @access  Public
const submitWebsiteRegister = async (req, res) => {
  try {
    const {
      monFriFrom,
      monFriTo,
      satFrom,
      satTo,
      sunFrom,
      sunTo,
      email,
      address,
      contactName,
      phone,
      domainName,
      domainRegUrl,
      domainUsername,
      domainPassword,
      noDomainName,
      sellTyres,
      offerServices,
      useSocialMedia,
      companyNumber,
      companyAge,
      socialInfo,
      salesPerson,
      designStyle,
      captchaToken,
    } = req.body || {};

    // 1. Verify captcha
    if (!verifyCaptchaToken(captchaToken)) {
      // Cleanup files if uploaded before rejecting
      if (req.files) {
        Object.keys(req.files).forEach((key) => {
          const fileList = req.files[key];
          if (fileList && fileList.length > 0) {
            fileList.forEach((file) => {
              if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
              }
            });
          }
        });
      }
      return res.status(400).json({
        status: false,
        message: "Invalid or expired Captcha verification. Please try again.",
      });
    }

    // 2. Validate mandatory fields
    if (!email || !contactName || !phone || !companyNumber) {
      // Cleanup files
      if (req.files) {
        Object.keys(req.files).forEach((key) => {
          const fileList = req.files[key];
          if (fileList && fileList.length > 0) {
            fileList.forEach((file) => {
              if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
              }
            });
          }
        });
      }
      return res.status(400).json({
        status: false,
        message: "Please fill in all mandatory fields: Email, Contact Name, Phone No., and Company Number.",
      });
    }

    // 3. Process file uploads
    let termsDocUrl = "";
    let privacyDocUrl = "";
    let returnsDocUrl = "";

    if (req.files) {
      if (req.files.termsDoc && req.files.termsDoc[0]) {
        termsDocUrl = await uploadToCloudinary(req.files.termsDoc[0]);
      }
      if (req.files.privacyDoc && req.files.privacyDoc[0]) {
        privacyDocUrl = await uploadToCloudinary(req.files.privacyDoc[0]);
      }
      if (req.files.returnsDoc && req.files.returnsDoc[0]) {
        returnsDocUrl = await uploadToCloudinary(req.files.returnsDoc[0]);
      }
    }

    // 4. Save to Database
    const newRegister = await WebsiteRegister.create({
      monFriFrom: monFriFrom || "Closed",
      monFriTo: monFriTo || "Closed",
      satFrom: satFrom || "Closed",
      satTo: satTo || "Closed",
      sunFrom: sunFrom || "Closed",
      sunTo: sunTo || "Closed",
      email,
      address: address || "",
      contactName,
      phone,
      domainName: domainName || "",
      domainRegUrl: domainRegUrl || "",
      domainUsername: domainUsername || "",
      domainPassword: domainPassword || "",
      noDomainName: noDomainName === "true" || noDomainName === true,
      sellTyres: sellTyres || "No",
      offerServices: offerServices || "No",
      useSocialMedia: useSocialMedia || "No",
      companyNumber,
      termsDocUrl,
      privacyDocUrl,
      returnsDocUrl,
      companyAge: companyAge || "",
      socialInfo: socialInfo || "",
      salesPerson: salesPerson || "",
      designStyle: designStyle || "",
    });

    res.status(201).json({
      status: true,
      message: "Website requirement gathering form submitted successfully!",
      data: newRegister,
    });
  } catch (error) {
    // Ensure cleanup of local temp files on error
    if (req.files) {
      Object.keys(req.files).forEach((key) => {
        const fileList = req.files[key];
        if (fileList && fileList.length > 0) {
          fileList.forEach((file) => {
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          });
        }
      });
    }
    console.error("Website Register Submission Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all website register form submissions
// @route   GET /api/website-register
// @access  Private/Admin
const getWebsiteRegisters = async (req, res) => {
  try {
    const submissions = await WebsiteRegister.find({}).sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a website register form submission
// @route   DELETE /api/website-register/:id
// @access  Private/Admin
const deleteWebsiteRegister = async (req, res) => {
  try {
    const submission = await WebsiteRegister.findById(req.params.id);

    if (submission) {
      // Optional: Delete documents from Cloudinary as well
      // For simplicity, we just delete the DB record
      await submission.deleteOne();
      res.status(200).json({ message: "Submission deleted successfully" });
    } else {
      res.status(404).json({ message: "Submission not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitWebsiteRegister,
  getWebsiteRegisters,
  deleteWebsiteRegister,
};
