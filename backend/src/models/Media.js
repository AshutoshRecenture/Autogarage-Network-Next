const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    public_id: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    resource_type: {
      type: String,
      required: true,
    },
    folder: {
      type: String,
      default: "",
    },
    original_filename: {
      type: String,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;
