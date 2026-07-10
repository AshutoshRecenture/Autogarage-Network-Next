const { createCaptchaToken } = require("../utils/captcha");

// @desc    Get a signed captcha token
// @route   GET /api/captcha/token
// @access  Public
const getCaptchaToken = (req, res) => {
  try {
    const { token } = createCaptchaToken();
    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCaptchaToken,
};
