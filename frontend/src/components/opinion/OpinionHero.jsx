"use client";

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function OpinionHero() {
  return (
    <div 
      className="bg-[#0a192f] text-white pt-32 pb-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/opinion-hero-bg.jpg')" }}
    >
      {/* Dark Premium Blue Overlay */}
      <div className="absolute inset-0 bg-[#0a2342]/90 mix-blend-multiply z-0"></div>
      
      {/* Subtle Dot Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        


        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Opinion
        </h1>
        

      </div>
    </div>
  );
}
