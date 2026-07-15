import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Media from '@/models/Media';
import { cloudinary, configureCloudinary } from '@/config/cloudinary';
import { protect, checkPermission } from '@/utils/auth';

// Initialize Cloudinary
configureCloudinary();

export async function DELETE(req, { params }) {
  try {
    const authResult = await protect(req);
    if (authResult.error) {
      return NextResponse.json({ message: authResult.error }, { status: authResult.status });
    }
    
    if (!checkPermission(authResult.user, "media", "write")) {
      return NextResponse.json({ message: "Access denied. You do not have 'write' permission for media." }, { status: 403 });
    }

    await connectDB();
    
    const media = await Media.findById(params.id);
    if (!media) {
      return NextResponse.json({ message: "Media record not found" }, { status: 404 });
    }

    console.log(`Deleting public_id ${media.public_id} from Cloudinary...`);
    
    // Delete from Cloudinary
    await cloudinary.uploader.destroy(media.public_id, {
      resource_type: media.resource_type || "image",
    });

    // Delete from MongoDB
    await media.deleteOne();

    return NextResponse.json({ message: "Media deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
