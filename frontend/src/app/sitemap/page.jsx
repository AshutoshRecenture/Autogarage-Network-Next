"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, FileText, BookOpen, ArrowRight, RefreshCw } from "lucide-react";

const API_BASE = "http://localhost:5000";

const FALLBACK_BLOGS = [
  {
    _id: "1",
    title: "How Workshop Management Systems Increase Profitability",
    slug: "how-workshop-management-systems-increase-profitability",
  },
  {
    _id: "2",
    title: "Top 5 MOT Diary Features You Aren't Using (But Should Be)",
    slug: "top-5-mot-diary-features",
  },
  {
    _id: "3",
    title: "Why Your Auto Garage Needs a Bespoke Website in 2026",
    slug: "why-your-garage-needs-a-website",
  },
];

export default function SitemapPage() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [blogsOpen, setBlogsOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoadingBlogs(true);
      try {
        const blogsData = (await import("../../data/blogs.json")).default;
        const processedBlogs = blogsData.map((blog, index) => ({
          ...blog,
          _id: blog._id || index.toString(),
          slug: blog.slug || blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        }));
        setBlogs(processedBlogs);
      } catch (err) {
        console.error("Failed to load sitemap blogs", err);
        setBlogs(FALLBACK_BLOGS);
      } finally {
        setLoadingBlogs(false);
      }
    };
    fetchBlogs();
  }, []);

  const pageCategories = [
    {
      title: "Company",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact-us" },
        { name: "Career", href: "/career" },
        { name: "Pricing", href: "/pricing" },
        { name: "Latest Work", href: "/latest-work" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms" },
      ],
    },
    {
      title: "Industries",
      links: [
        { name: "Car Workshop", href: "/#workshop" },
        { name: "Car Traders", href: "/#traders" },
        { name: "MOT Centres", href: "/#mot" },
        { name: "Automotive", href: "/#automotive" },
      ],
    },
    {
      title: "Products & Services",
      links: [
        { name: "Garage Management System", href: "/products/gms" },
        { name: "Website for Garages", href: "/products/website" },
        { name: "Autotech Data", href: "https://www.autotechdata.co.uk/" },
        { name: "MOT Diary", href: "/products/mot" },
        { name: "SEO", href: "/seo" },
        { name: "Website Register (WRF)", href: "/websiteregister" },
        { name: "Website Register with Contract", href: "/websiteregister" },
        { name: "Products & Services Price", href: "/pricing" },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans antialiased">
      {/* Hero Banner Header matching user screenshot */}
      <section className="bg-[url('/images/slide-1.png')] bg-cover bg-center bg-no-repeat py-20 text-center select-none relative border-b border-[#0c2340]/10">
        <div className="absolute inset-0 bg-[#0062ff]/40 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c2340]/50 to-[#0c2340]/80 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-black tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Sitemap
          </h1>
        </div>
      </section>

      {/* Accordions Container */}
      <section className="max-w-5xl mx-auto px-6 mt-12 space-y-4">
        
        {/* Information Accordion */}
        <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={() => setInfoOpen(!infoOpen)}
            className="w-full flex items-center justify-between px-6 py-4 bg-[#575757] text-white hover:bg-[#474747] focus:outline-none transition-colors duration-200"
          >
            <span className="text-base font-semibold tracking-wide flex items-center gap-3">
              <FileText className="text-blue-300" size={20} />
              Information
            </span>
            <span>
              {infoOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out bg-white ${
              infoOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {pageCategories.map((category, catIdx) => (
                  <div key={catIdx}>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2 border-slate-100">
                      {category.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {category.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <Link
                            href={link.href}
                            className="text-sm text-slate-600 hover:text-[#0062ff] flex items-center gap-2 group transition-colors duration-150"
                          >
                            <ArrowRight size={14} className="text-slate-400 group-hover:text-[#0062ff] transition-colors" />
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blogs Accordion */}
        <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={() => setBlogsOpen(!blogsOpen)}
            className="w-full flex items-center justify-between px-6 py-4 bg-[#575757] text-white hover:bg-[#474747] focus:outline-none transition-colors duration-200"
          >
            <span className="text-base font-semibold tracking-wide flex items-center gap-3">
              <BookOpen className="text-blue-300" size={20} />
              Blogs
            </span>
            <span>
              {blogsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out bg-white ${
              blogsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-8">
                {loadingBlogs ? (
                  <div className="flex items-center gap-2 text-slate-500 py-4">
                    <RefreshCw className="animate-spin text-[#0062ff]" size={18} />
                    <span className="text-sm">Loading blogs...</span>
                  </div>
                ) : blogs.length > 0 ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {blogs.map((blog) => (
                      <li key={blog._id}>
                        <Link
                          href={`/blog/${blog.slug}`}
                          className="text-sm text-slate-600 hover:text-[#0062ff] flex items-start gap-2.5 group transition-colors duration-150 py-1"
                        >
                          <ArrowRight size={14} className="text-slate-400 mt-1 shrink-0 group-hover:text-[#0062ff] transition-colors" />
                          <span className="leading-snug">{blog.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-400 py-4">No blogs found.</p>
                )}
              </div>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
