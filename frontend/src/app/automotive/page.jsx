"use client";

import React from "react";
import Image from "next/image";

export default function AutomotivePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Top Banner with Background Image */}
      <section className="relative h-[200px] md:h-[250px] lg:h-[300px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/automotive_banner.png"
            alt="Automotive Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Dark Overlay for text contrast without blue tint */}
        <div className="absolute inset-0 z-0 bg-black/50" />
        
        {/* Banner Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-widest uppercase shadow-sm">
            Automotive
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-[1300px] mx-auto px-6 py-16 md:py-20">
        
        {/* Intro */}
        <p className="text-[15px] md:text-[16px] leading-[1.8] text-slate-600 mb-12">
          The Automotive industry is fundamentally changing, while it is growing at the same time. Auto Garage Network aptly holds the overall operations through the evolution and is thus here to stay!
        </p>

        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-5">
            Features That Stand-out
          </h2>
        </div>

        {/* Content Details & Image */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Column (Text) */}
            <div className="space-y-6 text-[15px] md:text-[16px] leading-[1.8] text-slate-600">
              
              <div className="space-y-6">
                <p>
                  <strong className="text-slate-800 font-bold">
                    Rich dashboard
                  </strong>{" "}
                  – Despite offering several features in one place, the user interface is intuitive and smooth to use. These features together let you control all technical and data operations. Auto Garage Network, with its built-in intelligence, can readily spot out any disparity in online reading so that you can fix the glitch at the earliest.
                </p>

                <p>
                  <strong className="text-slate-800 font-bold">
                    Reduced Administration time
                  </strong>{" "}
                  - In the highly competitive automotive world, where most of the time is invested in technical processes, we often lag with the administrative tasks and eventually have a disorganised mess to manage. Lucky that there is Auto Garage Network to play its part. It is crafted to meet the most demanding requirements of automotive repair and management.
                </p>

                <p>
                  <strong className="text-slate-800 font-bold">
                    Easy And Automated Functions
                  </strong>{" "}
                  - From car service management to spare parts management and financial management to creating job cards and invoices, every function is transcended to being as easy as ABC.
                </p>
              </div>

              <p className="pt-4 border-t border-slate-100">
                Auto Garage Network is persistently responsive and stable, despite being engaged with several thousand users across the UK. Yes, we are here to stay!
              </p>
            </div>

            {/* Right Column (Image) */}
            <div className="relative w-full rounded-lg overflow-hidden shadow-xl shadow-slate-200/50 bg-white group">
              <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[600px]">
                <Image
                  src="/images/automotive.jpg"
                  alt="Automotive Technology"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
