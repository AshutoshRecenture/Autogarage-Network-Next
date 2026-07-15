import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Contact from '@/models/Contact';
import { verifyCaptchaToken } from '@/utils/captcha';
import { protect, admin } from '@/utils/auth';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      name,
      garageName,
      email,
      phone,
      interestedIn,
      interest,
      address,
      message,
      captchaToken,
    } = body || {};

    if (!(await verifyCaptchaToken(captchaToken))) {
      return NextResponse.json(
        { status: false, message: "Invalid or expired Captcha verification. Please try again." },
        { status: 400 }
      );
    }

    if (!name || !email || !phone) {
      return NextResponse.json(
        { status: false, message: "Please provide name, email, and phone number" },
        { status: 400 }
      );
    }

    const contact = await Contact.create({
      name,
      garageName: garageName || name,
      email,
      phone,
      interestedIn: interestedIn || interest || "Garage Management System",
      address: address || "Not Provided",
      message: message || "",
    });

    return NextResponse.json(
      { status: true, message: "Contact form submitted successfully", data: contact },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const authResult = await protect(req);
    if (authResult.error) {
      return NextResponse.json({ message: authResult.error }, { status: authResult.status });
    }
    
    if (!admin(authResult.user)) {
      return NextResponse.json({ message: "Not authorized as an admin" }, { status: 403 });
    }

    await connectDB();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
