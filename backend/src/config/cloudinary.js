const cloudinary = require("cloudinary").v2;

const configureCloudinary = () => {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (!cloudinaryUrl) {
    console.warn("Warning: CLOUDINARY_URL is not set in backend/.env!");
    return;
  }

  const match = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
  if (match) {
    cloudinary.config({
      cloud_name: match[3],
      api_key: match[1],
      api_secret: match[2],
      secure: true,
    });
    console.log(`Cloudinary Configured successfully for: ${match[3]}`);
  } else {
    console.error("Error: Invalid CLOUDINARY_URL format.");
  }
};

module.exports = { configureCloudinary, cloudinary };
