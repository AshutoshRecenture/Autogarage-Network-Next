const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    garageName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    interestedIn: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
