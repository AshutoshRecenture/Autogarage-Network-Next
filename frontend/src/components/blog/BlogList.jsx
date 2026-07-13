"use client";

import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { FaSearch } from "react-icons/fa";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Reset to page 1 on search change
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      console.log("Fetching blogs from http://localhost:5000/api/blogs...");
      const response = await fetch(`http://localhost:5000/api/blogs?page=${page}&limit=8`, {
        cache: "no-store",
      });
      const result = await response.json();

      console.log("API Response JSON:", result);

      if (result.success) {
        console.log("Setting blogs data:", result.data);
        setBlogs(result.data);
        setCurrentPage(result.currentPage || 1);
        setTotalPages(result.totalPages || 1);
        setError(null);
      } else if (Array.isArray(result)) {
        console.log("Setting blogs data:", result);
        setBlogs(result);
        setError(null);
      } else {
        throw new Error(result.message || "Failed to fetch blogs");
      }
    } catch (err) {
      console.error("Backend fetch error:", err);
      setError("Backend connection failed. Displaying preview data.");
      // Fallback to mock data if backend isn't running yet
      setBlogs([
        {
          _id: "1",
          title: "How Workshop Management Systems Increase Profitability",
          slug: "how-workshop-management-systems-increase-profitability",
          excerpt:
            "Discover the hidden metrics and workflows you can optimize using a digital management system in your independent garage.",
          category: "Business Tips",
          readingTime: 4,
          createdAt: new Date().toISOString(),
          author: "Alex Rivera",
          featuredImage: "/images/dashboard-mockup.png",
        },
        {
          _id: "2",
          title: "Top 5 MOT Diary Features You Aren't Using (But Should Be)",
          slug: "top-5-mot-diary-features",
          excerpt:
            "Are you fully utilizing automated SMS reminders and integrated DVSA lookups? Learn how to unlock the full potential of your MOT Diary.",
          category: "Software Guide",
          readingTime: 6,
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          author: "Sarah Jenkins",
          featuredImage:
            "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        },
        {
          _id: "3",
          title: "Why Your Auto Garage Needs a Bespoke Website in 2026",
          slug: "why-your-garage-needs-a-website",
          excerpt:
            "In a digital-first world, relying on word-of-mouth isn't enough. See how a professional web presence drives local foot traffic.",
          category: "Marketing",
          readingTime: 5,
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          author: "Marketing Team",
          featuredImage: "/images/premium-features-bg.png",
        },
      ]);
      setError("Backend connection failed. Displaying preview data.");
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      (blog.category &&
        blog.category.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <section className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header and Search */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            All Articles
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto mb-8">
            Browse our complete library of resources and guides.
          </p>
          
          <div className="relative max-w-md w-full mx-auto">
            <input
              type="text"
              placeholder="Search articles by title or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full py-3 pl-12 pr-6 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm text-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            />
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm flex items-center gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-200 text-amber-700 font-bold shrink-0">
              !
            </span>
            <div>
              <strong>Note:</strong> {error} Make sure your Node.js backend is
              running and connected to MongoDB.
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl h-[450px] animate-pulse border border-slate-100 shadow-sm"
              >
                <div className="h-64 bg-slate-200 rounded-t-3xl"></div>
                <div className="p-8 space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full mt-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No articles found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search criteria.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none transition-all"
            >
              Previous
            </button>

            <div className="hidden sm:flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
