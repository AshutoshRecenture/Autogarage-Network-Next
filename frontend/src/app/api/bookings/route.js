import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import { verifyCaptchaToken } from '@/utils/captcha';

export async function GET(req) {
  try {
    await connectDB();
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, garageName, email, phone, interestedIn, address, message, captchaToken } = body || {};

    if (!(await verifyCaptchaToken(captchaToken))) {
      return NextResponse.json(
        { status: false, message: "Invalid or expired Captcha verification. Please try again." },
        { status: 400 }
      );
    }

    if (!name || !garageName || !email || !phone || !interestedIn || !address) {
      return NextResponse.json(
        { status: false, message: "Please provide name, garage name, email, phone, interestedIn, and address" },
        { status: 400 }
      );
    }

    const booking = await Booking.create({
      name,
      garageName,
      email,
      phone,
      interestedIn,
      address,
      message: message || "",
    });

    return NextResponse.json(
      { status: true, message: "Booking request submitted successfully", data: booking },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}
