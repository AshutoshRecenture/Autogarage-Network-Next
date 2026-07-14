"use client";

import { FaExternalLinkAlt } from "react-icons/fa";

export default function Portfolio() {
  const portfolios = [
    {
      id: 1,
      name: "CarFix Garage",
      location: "LONDON, UK",
      image: "/images/portfolio-1.png",
      color: "bg-[#2563eb]", // Blue
      tags: ["Tyre Fitting", "MOT & Services", "Instant Reg Quote"],
    },
    {
      id: 2,
      name: "Kilnhurst Tyres",
      location: "ROTHERHAM, UK",
      image: "/images/portfolio-2.png",
      color: "bg-[#064e3b]", // Dark Green
      tags: ["Wheel Alignment", "Mobile Tyre Fitting", "Live Slot Scheduler"],
    },
    {
      id: 3,
      name: "MS Auto Centre Ltd",
      location: "BIRMINGHAM, UK",
      image: "/images/video-2.png", // Using the dark tech image as third mockup
      color: "bg-[#991b1b]", // Dark Red
      tags: ["MOT & Servicing", "Brakes & Exhausts", "E-Commerce System"],
    },
  ];

  return (
    <section className="py-16 bg-[#0a1128] font-sans">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4">
            Our Work
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            See Our Digital Showroom
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore the high-performance websites and booking systems we've
            built for independent garages across the UK.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-3xl overflow-hidden bg-white group hover:-translate-y-2 transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
            >
              {/* Card Header */}
              <div
                className={`${item.color} px-6 py-5 flex items-center justify-between relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center gap-2">
                  <span className="px-3 py-1 bg-black/20 rounded-full text-xs font-bold tracking-wider text-white uppercase border border-white/10 backdrop-blur-md">
                    {item.location}
                  </span>
                </div>
                <button className="relative z-10 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/40 transition-colors backdrop-blur-md">
                  <FaExternalLinkAlt size={12} />
                </button>
              </div>

              {/* Browser Mockup Area */}
              <div className={`${item.color} px-6 pb-6 pt-2`}>
                <div className="w-full bg-white rounded-t-xl rounded-b-md overflow-hidden shadow-2xl border border-white/20">
                  {/* Browser Top Bar */}
                  <div className="bg-[#f1f5f9] px-4 py-2 flex items-center gap-2 border-b border-gray-200">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></div>
                    <div className="mx-auto bg-white border border-gray-200 rounded-md h-5 w-1/2 max-w-[150px]"></div>
                  </div>
                  {/* Website Image */}
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom White Section */}
              <div className="p-8 flex-grow flex flex-col justify-between">
                <h3 className="text-2xl font-extrabold text-[#0a1128] tracking-tight mb-6">
                  {item.name}
                </h3>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#f8fafc] text-gray-600 text-xs font-bold rounded-md border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
