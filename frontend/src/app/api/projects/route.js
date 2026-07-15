import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import { protect, admin } from '@/utils/auth';

export async function GET(req) {
  try {
    await connectDB();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
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
    const { title, desc, image, link } = body;

    const project = new Project({
      title,
      desc,
      image,
      link: link || "",
    });

    const createdProject = await project.save();
    return NextResponse.json(createdProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
