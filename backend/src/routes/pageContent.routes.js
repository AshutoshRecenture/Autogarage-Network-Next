const express = require("express");
const {
  getPages,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
} = require("../controllers/pageContent.controller");
const { protect, checkPermission } = require("../middleware/auth.middleware");

const router = express.Router();

router
  .route("/")
  .get(getPages)
  .post(protect, checkPermission("pages", "write"), createPage);

router
  .route("/slug/:slug")
  .get(getPageBySlug);

router
  .route("/:id")
  .put(protect, checkPermission("pages", "write"), updatePage)
  .delete(protect, checkPermission("pages", "write"), deletePage);

module.exports = router;
