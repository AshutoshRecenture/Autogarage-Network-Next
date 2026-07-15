import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Settings from '@/models/Settings';
import { protect, admin } from '@/utils/auth';

export async function GET(req) {
  try {
    await connectDB();
    const settings = await Settings.findOne({});
    return NextResponse.json(settings || {});
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const authResult = await protect(req);
    if (authResult.error) return NextResponse.json({ message: authResult.error }, { status: authResult.status });
    if (!admin(authResult.user)) return NextResponse.json({ message: "Not authorized as an admin" }, { status: 403 });

    await connectDB();
    const body = await req.json();
    let settings = await Settings.findOne({});

    if (settings) {
      Object.assign(settings, body);
      const updatedSettings = await settings.save();
      return NextResponse.json(updatedSettings);
    } else {
      settings = new Settings(body);
      const createdSettings = await settings.save();
      return NextResponse.json(createdSettings, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
