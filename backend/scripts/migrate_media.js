const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const Media = require("../src/models/Media");

// Load backend .env file
dotenv.config({ path: path.join(__dirname, "../.env") });

if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI is not set in backend/.env!");
  process.exit(1);
}

if (!process.env.CLOUDINARY_URL) {
  console.error("Error: CLOUDINARY_URL is not set in backend/.env!");
  process.exit(1);
}

// Configure Cloudinary explicitly by parsing the URL
const cloudinaryUrl = process.env.CLOUDINARY_URL;
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
  process.exit(1);
}

const frontendAssetsDir = path.join(__dirname, "../../frontned/src/assets");
const frontendPublicDir = path.join(__dirname, "../../frontned/public");

// Recursive function to get all image files in a directory
function getImagesRecursively(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return fileList;
  }

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getImagesRecursively(filePath, fileList);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp", ".svg"].includes(ext)) {
        fileList.push({
          filePath,
          filename: file,
          ext,
          type: "image",
        });
      }
    }
  }
  return fileList;
}

// Helper function to upload large files using promise wrapper
function uploadLargeVideo(filePath, options) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(filePath, options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

async function runMigration() {
  try {
    console.log("Connecting to MongoDB Database...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully!");

    // 1. Gather all files
    const assets = [];

    // Scan images recursively in frontend src/assets
    console.log(`Scanning frontend assets in: ${frontendAssetsDir}`);
    const images = getImagesRecursively(frontendAssetsDir);
    assets.push(...images);

    // Scan public folder specifically for the video Agn_01.mp4
    const videoPath = path.join(frontendPublicDir, "Agn_01.mp4");
    if (fs.existsSync(videoPath)) {
      console.log(`Found founder video asset: Agn_01.mp4`);
      assets.push({
        filePath: videoPath,
        filename: "Agn_01.mp4",
        ext: ".mp4",
        type: "video",
      });
    } else {
      console.warn(`Warning: Agn_01.mp4 video file not found in: ${frontendPublicDir}`);
    }

    console.log(`Gathered ${assets.length} assets to migrate to Cloudinary + MongoDB.`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      const publicIdBase = path.basename(asset.filename, asset.ext);
      
      // Check if record already exists with valid non-null public_id in MongoDB
      const existingRecord = await Media.findOne({
        original_filename: asset.filename,
        public_id: { $ne: null },
      });

      if (existingRecord) {
        console.log(`- [${i + 1}/${assets.length}] ${asset.filename} already migrated, skipping.`);
        successCount++;
        continue;
      }

      console.log(`[${i + 1}/${assets.length}] Migrating ${asset.filename} (${asset.type})...`);

      try {
        let result;
        if (asset.type === "video") {
          // Use uploadLargeVideo helper for chunked uploading of the video
          result = await uploadLargeVideo(asset.filePath, {
            folder: "blogs",
            public_id: publicIdBase,
            resource_type: "video",
            chunk_size: 6000000, // 6MB chunks
            overwrite: true,
            invalidate: true,
          });
        } else {
          result = await cloudinary.uploader.upload(asset.filePath, {
            folder: "blogs",
            public_id: publicIdBase,
            resource_type: "image",
            overwrite: true,
            invalidate: true,
          });
        }

        console.log(`✓ Cloudinary Upload Successful: ${result.secure_url}`);

        // Update or insert into MongoDB
        const mediaRecord = await Media.findOneAndUpdate(
          { public_id: result.public_id },
          {
            public_id: result.public_id,
            url: result.url,
            secure_url: result.secure_url,
            format: result.format,
            resource_type: result.resource_type || asset.type,
            folder: "blogs",
            original_filename: asset.filename,
            title: publicIdBase.replace(/[-_]/g, " "),
            description: `Auto migrated frontend ${asset.type} asset`,
          },
          { upsert: true, new: true }
        );

        console.log(`✓ MongoDB Record Saved: ID ${mediaRecord._id}`);
        successCount++;
      } catch (error) {
        console.error(`✗ Failed to migrate ${asset.filename}:`, error.message);
        errorCount++;
      }
    }

    console.log("\n=================================");
    console.log("Migration Complete!");
    console.log(`Successfully migrated: ${successCount}`);
    console.log(`Failed: ${errorCount}`);
    console.log("=================================");

    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Migration fatal error:", error);
    process.exit(1);
  }
}

runMigration();
