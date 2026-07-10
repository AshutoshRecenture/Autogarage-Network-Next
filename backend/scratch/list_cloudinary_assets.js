const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const cloudinaryUrl = process.env.CLOUDINARY_URL;
if (!cloudinaryUrl) {
  console.error("CLOUDINARY_URL not found in .env!");
  process.exit(1);
}

const match = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
if (match) {
  cloudinary.config({
    api_key: match[1],
    api_secret: match[2],
    cloud_name: match[3],
  });
} else {
  console.error("Invalid CLOUDINARY_URL format");
  process.exit(1);
}

console.log("Fetching video resources from Cloudinary...");

cloudinary.api.resources(
  {
    resource_type: "video",
    max_results: 50,
  },
  function (error, result) {
    if (error) {
      console.error("Error fetching resources:", error);
      process.exit(1);
    }
    console.log("Videos found:");
    result.resources.forEach((resource) => {
      console.log(`- Public ID: ${resource.public_id}`);
      console.log(`  URL: ${resource.url}`);
      console.log(`  Secure URL: ${resource.secure_url}`);
      console.log(`  Format: ${resource.format}`);
      console.log("------------------------");
    });
    process.exit(0);
  }
);
