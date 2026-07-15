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
      const blogsData = (await import("../../data/blogs.json")).default;

      const processedBlogs = blogsData.map((blog, index) => ({
        ...blog,
        _id: blog._id || index.toString(),
        slug: blog.slug || blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        createdAt: blog.createdAt || blog.date
      }));

      const limit = 8;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedBlogs = processedBlogs.slice(startIndex, endIndex);

      setBlogs(paginatedBlogs);
      setCurrentPage(page);
      setTotalPages(Math.ceil(processedBlogs.length / limit));
      setError(null);
    } catch (err) {
      console.error("Error loading blogs from json:", err);
      setError("Failed to load blog data.");
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
