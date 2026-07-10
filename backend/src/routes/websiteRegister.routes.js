const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  submitWebsiteRegister,
  getWebsiteRegisters,
  deleteWebsiteRegister,
} = require("../controllers/websiteRegister.controller");
const { protect, checkPermission } = require("../middleware/auth.middleware");

const router = express.Router();

// Ensure temporary uploads directory exists
const tempUploadDir = path.join(__dirname, "../../temp_uploads");
if (!fs.existsSync(tempUploadDir)) {
  fs.mkdirSync(tempUploadDir, { recursive: true });
}

// Multer Disk Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempUploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit per file
  },
});

// Configure file upload field keys
const uploadFields = upload.fields([
  { name: "termsDoc", maxCount: 1 },
  { name: "privacyDoc", maxCount: 1 },
  { name: "returnsDoc", maxCount: 1 },
]);

// Public route for form submission
router.route("/").post(uploadFields, submitWebsiteRegister);

// Protected routes for Admin/Super Admin
router.route("/").get(protect, checkPermission("websiteRegister", "read"), getWebsiteRegisters);
router.route("/:id").delete(protect, checkPermission("websiteRegister", "write"), deleteWebsiteRegister);

module.exports = router;
