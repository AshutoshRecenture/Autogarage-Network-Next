import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { protect } from '@/utils/auth';

export async function GET(req) {
  try {
    const authResult = await protect(req);
    if (authResult.error) {
      return NextResponse.json(
        { message: authResult.error },
        { status: authResult.status }
      );
    }
    const loggedInUser = authResult.user;

    await connectDB();
    const user = await User.findById(loggedInUser._id);

    if (user) {
      return NextResponse.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      });
    } else {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
