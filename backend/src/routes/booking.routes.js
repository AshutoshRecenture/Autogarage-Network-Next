const express = require("express");
const {
  submitBooking,
  getBookings,
  deleteBooking,
} = require("../controllers/booking.controller");
const { protect, admin } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").post(submitBooking).get(protect, admin, getBookings);

router.route("/:id").delete(protect, admin, deleteBooking);

module.exports = router;
