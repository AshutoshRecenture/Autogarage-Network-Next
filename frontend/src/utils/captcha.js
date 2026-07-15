import crypto from "crypto";

/**
 * Generate a cryptographically signed captcha token
 * @returns {Object} { token }
 */
export const createCaptchaToken = () => {
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
 * Verify a captcha token with Google reCAPTCHA
 * @param {string} token 
 * @returns {Promise<boolean>}
 */
export const verifyCaptchaToken = async (token) => {
  if (!token) return false;
  
  const secret = process.env.RECAPTCHA_SECRET_KEY || process.env.RECAPRCHA_SECRET_KEY;
  if (!secret) {
    console.error("reCAPTCHA secret key is missing in environment variables.");
    return false;
  }
  
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });
    
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Error verifying reCAPTCHA token with Google:", error);
    return false;
  }
};
