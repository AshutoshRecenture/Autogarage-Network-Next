import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import generateToken from '@/utils/generateToken';
import { verifyCaptchaToken } from '@/utils/captcha';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password, captchaToken } = body || {};

    if (!(await verifyCaptchaToken(captchaToken))) {
      return NextResponse.json(
        { message: "Invalid or expired Captcha verification. Please try again." },
        { status: 400 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide email and password" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return NextResponse.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        token: generateToken(user._id),
      });
    } else {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
