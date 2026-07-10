const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    color: {
      type: String,
      default: "bg-blue-500/10 text-blue-400",
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
