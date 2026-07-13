"use client";

import Link from "next/link";
import { FaLaptopCode } from "react-icons/fa";

export default function WebsiteRegisterTab() {
  return (
    <Link 
      href="/websiteregister"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center gap-2 bg-gradient-to-l from-blue-600 to-[#1ea1f1] hover:from-blue-700 hover:to-blue-600 text-white px-2 py-4 md:px-3.5 md:py-7 rounded-l-2xl shadow-[0_8px_30px_rgba(30,161,241,0.3)] border-l border-y border-white/20 transition-all duration-300 transform translate-x-1 hover:translate-x-0 group cursor-pointer"
    >
      <div 
        className="font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 select-none"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        <span className="flex items-center gap-2">
          <FaLaptopCode className="rotate-90 text-blue-100 text-sm group-hover:scale-120 transition-transform duration-200" />
          Website Register
        </span>
      </div>
    </Link>
  );
}
