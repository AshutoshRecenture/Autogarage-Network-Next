const express = require("express");
const {
  getVacancies,
  createVacancy,
  updateVacancy,
  deleteVacancy,
} = require("../controllers/vacancy.controller");
const { protect, checkPermission } = require("../middleware/auth.middleware");

const router = express.Router();

router
  .route("/")
  .get(getVacancies)
  .post(protect, checkPermission("vacancies", "write"), createVacancy);

router
  .route("/:id")
  .put(protect, checkPermission("vacancies", "write"), updateVacancy)
  .delete(protect, checkPermission("vacancies", "write"), deleteVacancy);

module.exports = router;
