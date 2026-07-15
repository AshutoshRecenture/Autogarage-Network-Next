import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Media from '@/models/Media';
import { cloudinary, configureCloudinary } from '@/config/cloudinary';
import { protect, checkPermission } from '@/utils/auth';

// Initialize Cloudinary
configureCloudinary();

export async function GET(req) {
  try {
    await connectDB();
    const mediaList = await Media.find({}).sort({ createdAt: -1 });
    return NextResponse.json(mediaList);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
