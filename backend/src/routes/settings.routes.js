const express = require("express");
const {
  getSettings,
  updateSettings,
} = require("../controllers/settings.controller");
const { protect, checkPermission } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").get(getSettings).put(protect, checkPermission("settings", "write"), updateSettings);

module.exports = router;
