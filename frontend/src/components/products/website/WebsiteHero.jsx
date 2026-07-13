"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function WebsiteHero() {
  return (
    <section 
      className="relative pt-16 md:pt-20 pb-28 overflow-hidden bg-cover bg-center bg-no-repeat bg-[#0a1128]"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop')" }}
    >
      {/* Premium Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128]/95 via-[#0a1128]/80 to-[#0a1128]/95"></div>
      
      {/* Decorative Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
          Get Your Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Garage Website</span> Today
        </h1>
        
        <p className="text-xl md:text-2xl text-blue-50 font-medium mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          Take advantage of our state-of-the-art website design technology to establish your brand online and kick-start your digital journey.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link href="/contact-us" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-[0_10px_30px_rgba(6,182,212,0.3)] hover:shadow-[0_15px_40px_rgba(6,182,212,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3 text-lg">
            Get a Free Quote <FaArrowRight />
          </Link>
          <Link href="#details" className="w-full sm:w-auto bg-white/5 border border-white/20 hover:bg-white/10 text-white font-bold py-4 px-10 rounded-xl transition-all backdrop-blur-sm flex items-center justify-center text-lg hover:-translate-y-1">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
