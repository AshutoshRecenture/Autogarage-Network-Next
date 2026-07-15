import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import blogsData from '@/data/blogs.json';
import { protect, checkPermission } from '@/utils/auth';

const getCloudinaryUrl = (imagePath) => {
  if (imagePath.startsWith("http") || imagePath.startsWith("/")) return imagePath;
  const cloudName = "n4okswsd";
  const filename = imagePath.split("/").pop();
  return `https://res.cloudinary.com/${cloudName}/image/upload/Blog/${filename}`;
};

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 100;
    const skip = (page - 1) * limit;

    let total = await Blog.countDocuments({});

    if (total === 0) {
      console.log("No blogs found in DB. Seeding from blogs.json...");
      const seededBlogs = blogsData.map((blog) => ({
        category: blog.category,
        title: blog.title,
        date: blog.date,
        readTime: blog.readTime,
        excerpt: blog.excerpt,
        content: blog.content || "",
        color: blog.color || "bg-blue-500/10 text-blue-400",
        image: getCloudinaryUrl(blog.image),
      }));
      await Blog.insertMany(seededBlogs);
      total = await Blog.countDocuments({});
    }

    const blogs = await Blog.find({})
      .select("-content")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: blogs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBlogs: total
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
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

    const blog = new Blog({
      category,
      title,
      date: date || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      readTime,
      excerpt,
      content: content || "",
      color: color || "bg-blue-500/10 text-blue-400",
      image,
    });

    const createdBlog = await blog.save();
    return NextResponse.json(createdBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
