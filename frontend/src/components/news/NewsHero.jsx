"use client";

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function NewsHero() {
  return (
    <div 
      className="bg-[#0a192f] text-white pt-32 pb-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/news-car-bg.jpg')" }}
    >
      {/* Dark Premium Blue Overlay */}
      <div className="absolute inset-0 bg-[#0a2342]/90 mix-blend-multiply z-0"></div>
      
      {/* Hexagon Pattern Overlay (Left aligned) */}
      <div className="absolute top-0 left-0 w-1/2 h-full z-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPjxwYXRoIGQ9Ik0yOCAzMS40TDEuNCAxNmwyNi42LTE1LjRMMzEuNCAxNiAyOCAzMS40em0yOCAzMS40TDI5LjQgMTZsMjYuNi0xNS40TDYxLjQgMTYgNTYgMzEuNHpNMjggODAuNEwxLjQgNjVsMjYuNi0xNS40TDMxLjQgNjUgMjggODAuNHptMjggMzEuNEwyOS40IDY1bDI2LjYtMTUuNEw2MS40IDY1IDU2IDk2LjR6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] bg-[length:60px_100px]"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        


        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          News & Insights
        </h1>
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm md:text-base font-medium">
          <Link href="/" className="text-white hover:underline transition-colors">
            Home
          </Link>
          <FaChevronRight className="text-[10px] text-white opacity-80" />
          <span className="text-[#1EA1F1]">Archive by Category "News"</span>
        </div>
      </div>
    </div>
  );
}
