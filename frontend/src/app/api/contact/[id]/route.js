import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Contact from '@/models/Contact';
import { protect, admin } from '@/utils/auth';

export async function DELETE(req, { params }) {
  try {
    const authResult = await protect(req);
    if (authResult.error) {
      return NextResponse.json({ message: authResult.error }, { status: authResult.status });
    }
    
    if (!admin(authResult.user)) {
      return NextResponse.json({ message: "Not authorized as an admin" }, { status: 403 });
    }

    await connectDB();
    const contact = await Contact.findById(params.id);

    if (contact) {
      await contact.deleteOne();
      return NextResponse.json({ message: "Contact submission removed" });
    } else {
      return NextResponse.json({ message: "Contact submission not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const authResult = await protect(req);
    if (authResult.error) {
      return NextResponse.json({ message: authResult.error }, { status: authResult.status });
    }
    
    if (!admin(authResult.user)) {
      return NextResponse.json({ message: "Not authorized as an admin" }, { status: 403 });
    }

    await connectDB();
    const contact = await Contact.findById(params.id);

    if (contact) {
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
      } = body || {};

      contact.name = name !== undefined ? name : contact.name;
      contact.garageName = garageName !== undefined ? garageName : contact.garageName;
      contact.email = email !== undefined ? email : contact.email;
      contact.phone = phone !== undefined ? phone : contact.phone;
      contact.interestedIn = interestedIn || interest || contact.interestedIn;
      contact.address = address !== undefined ? address : contact.address;
      contact.message = message !== undefined ? message : contact.message;

      const updatedContact = await contact.save();
      return NextResponse.json(updatedContact);
    } else {
      return NextResponse.json({ message: "Contact submission not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
