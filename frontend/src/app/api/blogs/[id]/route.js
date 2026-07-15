import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import { protect, checkPermission } from '@/utils/auth';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const blog = await Blog.findById(params.id).lean();
    if (blog) {
      return NextResponse.json(blog);
    } else {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
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
    
    if (!checkPermission(authResult.user, "blogs", "write")) {
      return NextResponse.json({ message: "Access denied. You do not have 'write' permission for blogs." }, { status: 403 });
    }

    await connectDB();
    const body = await req.json();
    const { category, title, date, readTime, excerpt, content, color, image } = body;

    const blog = await Blog.findById(params.id);

    if (blog) {
      blog.category = category || blog.category;
      blog.title = title || blog.title;
      blog.date = date || blog.date;
      blog.readTime = readTime || blog.readTime;
      blog.excerpt = excerpt || blog.excerpt;
      blog.content = content || blog.content;
      blog.color = color || blog.color;
      blog.image = image || blog.image;

      const updatedBlog = await blog.save();
      return NextResponse.json(updatedBlog);
    } else {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const authResult = await protect(req);
    if (authResult.error) {
      return NextResponse.json({ message: authResult.error }, { status: authResult.status });
    }
    
    if (!checkPermission(authResult.user, "blogs", "write")) {
      return NextResponse.json({ message: "Access denied. You do not have 'write' permission for blogs." }, { status: 403 });
    }

    await connectDB();
    const blog = await Blog.findById(params.id);

    if (blog) {
      await blog.deleteOne();
      return NextResponse.json({ message: "Blog post removed" });
    } else {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
