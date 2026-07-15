import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import { protect, admin } from '@/utils/auth';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const booking = await Booking.findById(params.id);
    if (booking) return NextResponse.json(booking);
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const authResult = await protect(req);
    if (authResult.error) return NextResponse.json({ message: authResult.error }, { status: authResult.status });
    if (!admin(authResult.user)) return NextResponse.json({ message: "Not authorized as an admin" }, { status: 403 });

    await connectDB();
    const body = await req.json();
    const booking = await Booking.findById(params.id);

    if (booking) {
      Object.assign(booking, body);
      const updatedBooking = await booking.save();
      return NextResponse.json(updatedBooking);
    }
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const authResult = await protect(req);
    if (authResult.error) return NextResponse.json({ message: authResult.error }, { status: authResult.status });
    if (!admin(authResult.user)) return NextResponse.json({ message: "Not authorized as an admin" }, { status: 403 });

    await connectDB();
    const booking = await Booking.findById(params.id);

    if (booking) {
      await booking.deleteOne();
      return NextResponse.json({ message: "Removed" });
    }
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
