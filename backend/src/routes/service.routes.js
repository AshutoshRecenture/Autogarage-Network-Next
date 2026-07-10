const express = require("express");
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/service.controller");
const { protect, admin } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").get(getServices).post(protect, admin, createService);

router
  .route("/:id")
  .get(getServiceById)
  .put(protect, admin, updateService)
  .delete(protect, admin, deleteService);

module.exports = router;
