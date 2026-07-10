const express = require("express");
const {
  getSocialMedia,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
} = require("../controllers/socialMedia.controller");
const { protect, checkPermission } = require("../middleware/auth.middleware");

const router = express.Router();

router
  .route("/")
  .get(getSocialMedia)
  .post(protect, checkPermission("socialMedia", "write"), createSocialMedia);

router
  .route("/:id")
  .put(protect, checkPermission("socialMedia", "write"), updateSocialMedia)
  .delete(protect, checkPermission("socialMedia", "write"), deleteSocialMedia);

module.exports = router;
