const Media = require("../models/Media");
const { cloudinary } = require("../config/cloudinary");
const fs = require("fs");

// Helper function to upload large files using promise wrapper
const uploadLargeVideo = (filePath, options) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(filePath, options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

// @desc    Upload media to Cloudinary and save metadata in MongoDB
// @route   POST /api/media/upload
// @access  Private/Admin
const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const { title, description } = req.body;
    const filePath = req.file.path;
    const isVideo = req.file.mimetype.startsWith("video/");
    const resourceType = isVideo ? "video" : "image";

    console.log(`Uploading ${req.file.originalname} to Cloudinary...`);

    let result;
    if (isVideo) {
      // Use uploadLargeVideo helper for chunked uploading of videos
      result = await uploadLargeVideo(filePath, {
        folder: "blogs",
        resource_type: "video",
        chunk_size: 6000000, // 6MB chunks
      });
    } else {
      result = await cloudinary.uploader.upload(filePath, {
        folder: "blogs",
        resource_type: "image",
      });
    }

    // Delete local temp file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Save media info to MongoDB
    const media = await Media.create({
      public_id: result.public_id,
      url: result.url,
      secure_url: result.secure_url,
      format: result.format,
      resource_type: result.resource_type || resourceType,
      folder: "blogs",
      original_filename: req.file.originalname,
      title: title || "",
      description: description || "",
    });

    res.status(201).json(media);
  } catch (error) {
    // Ensure cleanup of local file
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error("Upload Media Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all media records from MongoDB
// @route   GET /api/media
// @access  Public
const getMedia = async (req, res) => {
  try {
    const mediaList = await Media.find({}).sort({ createdAt: -1 });
    res.json(mediaList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete media from Cloudinary and MongoDB
// @route   DELETE /api/media/:id
// @access  Private/Admin
const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: "Media record not found" });
    }

    console.log(`Deleting public_id ${media.public_id} from Cloudinary...`);
    
    // Delete from Cloudinary
    await cloudinary.uploader.destroy(media.public_id, {
      resource_type: media.resource_type || "image",
    });

    // Delete from MongoDB
    await media.deleteOne();

    res.json({ message: "Media deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadMedia,
  getMedia,
  deleteMedia,
};
