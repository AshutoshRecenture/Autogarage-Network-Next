const Booking = require("../models/Booking");
const { verifyCaptchaToken } = require("../utils/captcha");

// @desc    Submit a booking inquiry
// @route   POST /api/bookings
// @access  Public
const submitBooking = async (req, res) => {
  try {
    const { name, garageName, email, phone, interestedIn, address, message, captchaToken } =
      req.body || {};

    if (!verifyCaptchaToken(captchaToken)) {
      return res.status(400).json({
        status: false,
        message: "Invalid or expired Captcha verification. Please try again.",
      });
    }

    if (!name || !garageName || !email || !phone || !interestedIn || !address) {
      return res.status(400).json({
        status: false,
        message: "Please provide name, garage name, email, phone, interestedIn, and address",
      });
    }

    const booking = await Booking.create({
      name,
      garageName,
      email,
      phone,
      interestedIn,
      address,
      message: message || "",
    });

    res.status(201).json({
      status: true,
      message: "Booking request submitted successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// @desc    Get all booking inquiries
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// @desc    Delete a booking inquiry
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      await booking.deleteOne();
      res.json({ status: true, message: "Booking inquiry removed successfully" });
    } else {
      res.status(404).json({ status: false, message: "Booking inquiry not found" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  submitBooking,
  getBookings,
  deleteBooking,
};
