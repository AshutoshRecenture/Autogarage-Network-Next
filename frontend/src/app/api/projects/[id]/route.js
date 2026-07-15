import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import { protect, admin } from '@/utils/auth';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const project = await Project.findById(params.id);
    if (project) {
      return NextResponse.json(project);
    } else {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
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
    const { title, desc, image, link } = body;

    const project = await Project.findById(params.id);

    if (project) {
      project.title = title || project.title;
      project.desc = desc || project.desc;
      project.image = image || project.image;
      project.link = link || project.link;

      const updatedProject = await project.save();
      return NextResponse.json(updatedProject);
    } else {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
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
    const project = await Project.findById(params.id);

    if (project) {
      await project.deleteOne();
      return NextResponse.json({ message: "Project removed" });
    } else {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
