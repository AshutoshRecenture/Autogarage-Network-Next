"use client";

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function BlogHero() {
  return (
    <div
      className="text-white py-20 md:py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/mot-mechanic.jpg')" }}
    >
      {/* Dark Premium Blue Overlay */}
      <div className="absolute inset-0 bg-[#0a192f]/50 mix-blend-multiply z-0"></div>

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 uppercase drop-shadow-md">
          Auto Garage{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
            Network Blog
          </span>
        </h1>
      </div>
    </div>
  );
}
