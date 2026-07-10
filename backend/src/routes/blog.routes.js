const express = require("express");
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");
const { protect, checkPermission } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").get(getBlogs).post(protect, checkPermission("blogs", "write"), createBlog);

router
  .route("/:id")
  .get(getBlogById)
  .put(protect, checkPermission("blogs", "write"), updateBlog)
  .delete(protect, checkPermission("blogs", "write"), deleteBlog);

module.exports = router;
