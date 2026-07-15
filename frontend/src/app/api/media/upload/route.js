import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Media from '@/models/Media';
import { cloudinary, configureCloudinary } from '@/config/cloudinary';
import { protect, checkPermission } from '@/utils/auth';

// Initialize Cloudinary
configureCloudinary();

export async function POST(req) {
  try {
    const authResult = await protect(req);
    if (authResult.error) {
      return NextResponse.json({ message: authResult.error }, { status: authResult.status });
    }
    
    if (!checkPermission(authResult.user, "media", "write")) {
      return NextResponse.json({ message: "Access denied. You do not have 'write' permission for media." }, { status: 403 });
    }

    await connectDB();
    
    const formData = await req.formData();
    const file = formData.get("file");
    const title = formData.get("title");
    const description = formData.get("description");

    if (!file) {
      return NextResponse.json({ message: "Please upload a file" }, { status: 400 });
    }

    const isVideo = file.type.startsWith("video/");
    const resourceType = isVideo ? "video" : "image";
    
    // Convert Web File to Buffer for Cloudinary stream upload
    const buffer = Buffer.from(await file.arrayBuffer());

    console.log(`Uploading ${file.name} to Cloudinary via stream...`);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "blogs",
          resource_type: resourceType,
          chunk_size: isVideo ? 6000000 : undefined,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      // Write buffer to stream
      uploadStream.end(buffer);
    });

    // Save media info to MongoDB
    const media = await Media.create({
      public_id: result.public_id,
      url: result.url,
      secure_url: result.secure_url,
      format: result.format,
      resource_type: result.resource_type || resourceType,
      folder: "blogs",
      original_filename: file.name,
      title: title || "",
      description: description || "",
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error("Upload Media Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
