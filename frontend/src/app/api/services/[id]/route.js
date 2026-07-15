import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Service from '@/models/Service';
import { protect, admin } from '@/utils/auth';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const service = await Service.findById(params.id);
    if (service) {
      return NextResponse.json(service);
    } else {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }
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
    const { title, price, desc, icon } = body;

    const service = await Service.findById(params.id);

    if (service) {
      service.title = title || service.title;
      service.price = price || service.price;
      service.desc = desc || service.desc;
      service.icon = icon || service.icon;

      const updatedService = await service.save();
      return NextResponse.json(updatedService);
    } else {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }
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
    const service = await Service.findById(params.id);

    if (service) {
      await service.deleteOne();
      return NextResponse.json({ message: "Service removed" });
    } else {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
