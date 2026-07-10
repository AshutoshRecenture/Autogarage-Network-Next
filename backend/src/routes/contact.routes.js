const express = require("express");
const {
  submitContact,
  getContacts,
  deleteContact,
  updateContact,
} = require("../controllers/contact.controller");
const { protect, checkPermission } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").post(submitContact).get(protect, checkPermission("contacts", "read"), getContacts);

router
  .route("/:id")
  .put(protect, checkPermission("contacts", "write"), updateContact)
  .delete(protect, checkPermission("contacts", "write"), deleteContact);

module.exports = router;
