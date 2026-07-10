const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { protect, superAdmin } = require("../middleware/auth.middleware");

const router = express.Router();

// Apply auth protection and Super Admin checking to all routes in this file
router.use(protect);
router.use(superAdmin);

router.route("/")
  .get(getUsers)
  .post(createUser);

router.route("/:id")
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
