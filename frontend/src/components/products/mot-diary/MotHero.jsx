"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function MotHero() {
  return (
    <section 
      className="relative pt-16 md:pt-20 pb-28 overflow-hidden bg-cover bg-center bg-no-repeat bg-[#0f172a]"
      style={{ backgroundImage: "url('/images/mot-hero-bg.jpg')" }} // Premium dark garage background
    >
      {/* Premium Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/95 via-[#0f172a]/80 to-blue-900/60"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-start gap-16 pt-8">
        
        <div className="flex-1">
          
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            Scale Your Garage with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">MOT Diary</span>
          </h1>
          
          <p className="text-xl text-slate-300 font-medium mb-10 max-w-2xl leading-relaxed">
            Transform your independent garage into an industry leader. Our state-of-the-art MOT management system automates scheduling, connects directly with DVLA databases, and drives unprecedented customer retention.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
            <Link href="/contact-us" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_10px_30px_rgba(6,182,212,0.2)] hover:shadow-[0_15px_40px_rgba(6,182,212,0.4)] hover:-translate-y-1 flex items-center justify-center gap-3 text-lg">
              Get Your Free Version <FaArrowRight />
            </Link>
            <Link href="#features" className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-xl transition-all backdrop-blur-sm flex items-center justify-center text-lg hover:-translate-y-1">
              Explore Features
            </Link>
          </div>
        </div>

        <div className="flex-1 relative hidden lg:block">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src="/images/mot-dashboard.jpg"
              alt="MOT Diary Dashboard Interface" 
              className="w-full h-auto object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
               <div className="bg-slate-900/80 backdrop-blur-md rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">DVLA Synced Successfully</p>
                      <p className="text-slate-400 text-xs">Real-time vehicle data retrieved</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
