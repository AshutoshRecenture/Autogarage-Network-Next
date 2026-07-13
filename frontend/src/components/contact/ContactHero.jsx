"use client";

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function ContactHero() {
  return (
    <div 
      className="bg-slate-900 text-white py-12 md:py-20 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/latest-work-bg.jpg')" }}
    >
      {/* Dark Overlay for readability instead of blue */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center flex flex-col items-center justify-center">
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 uppercase drop-shadow-md">
          CONTACT US
        </h1>
        
      </div>
    </div>
  );
}
