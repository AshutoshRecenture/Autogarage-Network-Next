"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function WhatWeDoFeatures() {
  const features = [
    {
      id: 1,
      image: "/images/whatwedo-1.png",
      description:
        "Create & manage websites exclusively for independent garages and workshops.",
    },
    {
      id: 2,
      image: "/images/whatwedo-2.png",
      description:
        "Build bespoke websites that don't just look good - they drive real conversions.",
    },
    {
      id: 3,
      image: "/images/whatwedo-3.png",
      description:
        "We produce real results for you, the independent garage owner.",
    },
    {
      id: 4,
      image: "/images/whatwedo-4.png",
      description:
        "Advanced booking systems integrated seamlessly into your workflow.",
    },
    {
      id: 5,
      image: "/images/whatwedo-5.png",
      description:
        "Comprehensive SEO analytics and performance tracking to accelerate growth.",
    },
  ];

  return (
    <section className="py-12 bg-white font-sans overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0a1128] mb-12 tracking-tight">
          What we do...
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 30 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 3, spaceBetween: 50 },
          }}
          className="what-we-do-swiper !pb-12"
        >
          {features.map((feature) => (
            <SwiperSlide key={feature.id}>
              <div className="group flex flex-col items-center cursor-pointer h-full">
                <div className="relative w-full h-[280px] lg:h-[340px] mb-8 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-4">
                  <div className="absolute inset-0 bg-blue-50/50 rounded-full blur-3xl scale-75 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"></div>
                  <img
                    src={feature.image}
                    alt="Feature showcase"
                    className="relative z-10 w-auto h-full max-h-full object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:drop-shadow-[0_25px_45px_rgba(37,99,235,0.25)]"
                  />
                </div>

                <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed max-w-sm transition-colors duration-300 group-hover:text-[#1890d6]">
                  {feature.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .what-we-do-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .what-we-do-swiper .swiper-pagination-bullet-active {
          background: #3b82f6;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          transform: scale(1.3);
        }
      `}</style>
    </section>
  );
}
