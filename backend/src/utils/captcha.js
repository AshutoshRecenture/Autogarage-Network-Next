const crypto = require("crypto");

/**
 * Generate a cryptographically signed captcha token
 * @returns {Object} { token }
 */
const createCaptchaToken = () => {
  const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes valid
  const secret = process.env.JWT_SECRET || "supersecretjwtkeyagnkey123";
  
  // A unique salt for this token session
  const salt = crypto.randomBytes(16).toString("hex");
  
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${expiry}.${salt}`)
    .digest("hex");
    
  const token = `${expiry}.${salt}.${signature}`;
  
  return { token };
};

/**
 * Verify a captcha token
 * @param {string} token 
 * @returns {boolean}
 */
const verifyCaptchaToken = (token) => {
  if (!token) return false;
  
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  
  const [expiryStr, salt, signature] = parts;
  const expiry = parseInt(expiryStr, 10);
  
  if (isNaN(expiry) || Date.now() > expiry) {
    return false; // Expired
  }
  
  const secret = process.env.JWT_SECRET || "supersecretjwtkeyagnkey123";
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${expiryStr}.${salt}`)
    .digest("hex");
    
  return signature === expectedSignature;
};

module.exports = {
  createCaptchaToken,
  verifyCaptchaToken,
};
