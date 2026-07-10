const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  uploadMedia,
  getMedia,
  deleteMedia,
} = require("../controllers/media.controller");
const { protect, checkPermission } = require("../middleware/auth.middleware");

const router = express.Router();

// Ensure temporary uploads directory exists
const tempUploadDir = path.join(__dirname, "../../temp_uploads");
if (!fs.existsSync(tempUploadDir)) {
  fs.mkdirSync(tempUploadDir, { recursive: true });
}

// Configure multer storage
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
    fileSize: 400 * 1024 * 1024, // 400MB maximum file size limit
  },
});

// GET all media records (public access)
router.route("/").get(getMedia);

// POST upload media (Admin protected)
router
  .route("/upload")
  .post(protect, checkPermission("media", "write"), upload.single("file"), uploadMedia);

// DELETE media (Admin protected)
router.route("/:id").delete(protect, checkPermission("media", "write"), deleteMedia);

module.exports = router;
