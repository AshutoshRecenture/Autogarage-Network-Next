const Blog = require("../models/Blog");
const blogsData = require("../data/blogs.json");

const getCloudinaryUrl = (imagePath) => {
  if (imagePath.startsWith("http") || imagePath.startsWith("/")) return imagePath;
  const cloudName = "n4okswsd";
  const filename = imagePath.split("/").pop();
  return `https://res.cloudinary.com/${cloudName}/image/upload/Blog/${filename}`;
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100; // Large default so old clients don't break immediately if they expect all
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

    res.json({
      success: true,
      data: blogs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBlogs: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).lean();
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = async (req, res) => {
  try {
    const { category, title, date, readTime, excerpt, content, color, image } = req.body;

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
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = async (req, res) => {
  try {
    const { category, title, date, readTime, excerpt, content, color, image } = req.body;

    const blog = await Blog.findById(req.params.id);

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
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      await blog.deleteOne();
      res.json({ message: "Blog post removed" });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
