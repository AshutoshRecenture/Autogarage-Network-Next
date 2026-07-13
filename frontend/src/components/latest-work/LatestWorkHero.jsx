"use client";

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function LatestWorkHero() {
  return (
    <div 
      className="bg-[#0a192f] text-white py-10 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/latest-work-bg.jpg')" }}
    >
      {/* Dark Premium Blue Overlay */}
      <div className="absolute inset-0 bg-[#0a2342]/90 mix-blend-multiply z-0"></div>
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center flex flex-col items-center justify-center">
        


        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase">
          Latest Work
        </h1>
        
        {/* Breadcrumbs */}
        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium">
          <Link href="/" className="text-white hover:underline transition-colors">
            Home
          </Link>
          <FaChevronRight className="text-[10px] text-[#1EA1F1]" />
          <span className="text-[#1EA1F1]">Latest Work</span>
        </div>
      </div>
    </div>
  );
}
