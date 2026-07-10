const express = require("express");
const { getCaptchaToken } = require("../controllers/captcha.controller");

const router = express.Router();

router.get("/token", getCaptchaToken);

module.exports = router;
