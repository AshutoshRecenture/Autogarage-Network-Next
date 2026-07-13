"use client";

import Link from "next/link";
import Image from "next/image";
import { FaClock, FaCalendarAlt, FaUser } from "react-icons/fa";

export default function BlogCard({ blog }) {
  // Format date nicely
  let formattedDate;
  if (blog.date) {
    formattedDate = blog.date; // Use the pre-formatted string if available
  } else if (blog.createdAt) {
    formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  } else {
    formattedDate = "Recently";
  }

  const linkHref = `/blog/${blog.slug || blog._id}`;
  const displayImage = blog.featuredImage || blog.image;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      
      <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
        <Link href={linkHref} className="block w-full h-full">
          {displayImage ? (
            <Image 
              src={displayImage} 
              alt={blog.title} 
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
              No Image
            </div>
          )}
        </Link>
        {blog.category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
              {blog.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        
        <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500 mb-3 uppercase tracking-wide">
          <div className="flex items-center gap-1.5">
            <FaCalendarAlt className="text-blue-500" />
            <span>{formattedDate}</span>
          </div>
          {(blog.readingTime || blog.readTime) && (
            <div className="flex items-center gap-1.5">
              <FaClock className="text-blue-500" />
              <span>{blog.readTime || `${blog.readingTime} Min Read`}</span>
            </div>
          )}
        </div>

        <Link href={linkHref} className="block group-hover:text-blue-600 transition-colors mb-2">
          <h2 className="text-lg font-bold text-slate-900 leading-tight line-clamp-2">
            {blog.title}
          </h2>
        </Link>

        <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-grow">
          {blog.excerpt || (typeof blog.content === 'string' ? blog.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : '')}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">
              <FaUser />
            </div>
            <span className="text-xs font-semibold text-slate-900">{blog.author || "Admin"}</span>
          </div>
          
          <Link 
            href={`/blog/${blog.slug || blog._id}`}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/link transition-colors"
          >
            Read More
            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
