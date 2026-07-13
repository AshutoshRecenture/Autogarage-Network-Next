"use client";

import Image from "next/image";

export default function LatestWorkGrid() {
  const portfolioItems = [
    {
      id: 1,
      image: "/images/portfolio-1.png",
      alt: "CarFix Garage Website"
    },
    {
      id: 2,
      image: "/images/portfolio-2.png",
      alt: "Kilnhurst Mobile App"
    },
    {
      id: 3,
      image: "/images/website-for-garages.png",
      alt: "MS Auto Centre Website"
    }
  ];

  return (
    <section className="bg-slate-50 py-12 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Our Recent Transformations</h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto">
            Explore a selection of our recent digital overhauls for independent garages. We build high-converting, modern web experiences that turn traffic into confirmed bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            {
              id: 1,
              image: "/images/carfix_mockup.png",
              title: "CarFix Garage",
              url: "https://www.carfixgarage.co.uk/",
              desc: "A vibrant, conversion-optimized platform featuring instant MOT and servicing lookups."
            },
            {
              id: 2,
              image: "/images/kilnhurst_mockup.png",
              title: "Kilnhurst Tyres",
              url: "https://www.kilnhursttyres.co.uk/",
              desc: "A sleek dark-mode interface designed specifically to highlight premium tyre fitting services."
            },
            {
              id: 3,
              image: "/images/msauto_mockup.png",
              title: "MS Auto Centre Ltd",
              url: "https://www.msautocentreltd.co.uk/",
              desc: "A highly trusted, professional layout integrating industry-standard accreditations."
            },
            {
              id: 4,
              image: "/images/kingz_mockup.png",
              title: "Kingz Automotive",
              url: "https://www.kingzautomotive.com/",
              desc: "An ultra-luxurious digital storefront tailored for high-end, bespoke automotive care."
            },
            {
              id: 5,
              image: "/images/solent_mockup.png",
              title: "Solent MOT Centre Ltd",
              url: "https://www.solentmotcentre.co.uk/",
              desc: "A bright, accessible, and highly legible platform optimized for rapid appointment booking."
            },
            {
              id: 6,
              image: "/images/smartmot_mockup.png",
              title: "Smart MOT & Service",
              url: "https://www.smartmot.com/",
              desc: "A high-performance booking portal featuring clean typography and vivid green accents."
            },
            {
              id: 7,
              image: "/images/roberts_mockup.png",
              title: "Roberts Tyres",
              url: "https://www.robertstyres.co.uk/",
              desc: "A modern, bold interface focusing heavily on streamlined tyre and wheel selection."
            },
            {
              id: 8,
              image: "/images/treadmark_mockup.png",
              title: "Treadmark Wheels",
              url: "https://www.treadmarkwheelsandtyres.co.uk/",
              desc: "A sophisticated dark-theme experience built to showcase premium wheel and tyre products."
            }
          ].map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow relative bg-white">
                <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-[#1EA1F1] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-grow line-clamp-2">
                  {item.desc}
                </p>
                
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 hover:bg-[#1EA1F1] hover:text-white hover:border-[#1EA1F1] transition-all duration-300 group/btn"
                >
                  Visit Live Site
                  <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
