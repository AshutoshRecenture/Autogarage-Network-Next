import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Service from '@/models/Service';
import { protect, admin } from '@/utils/auth';

export async function GET(req) {
  try {
    await connectDB();
    const services = await Service.find({}).sort({ createdAt: -1 });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const authResult = await protect(req);
    if (authResult.error) return NextResponse.json({ message: authResult.error }, { status: authResult.status });
    if (!admin(authResult.user)) return NextResponse.json({ message: "Not authorized as an admin" }, { status: 403 });

    await connectDB();
    const body = await req.json();
    const { title, price, desc, icon } = body;

    const service = new Service({
      title,
      price,
      desc,
      icon,
    });

    const createdService = await service.save();
    return NextResponse.json(createdService, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
