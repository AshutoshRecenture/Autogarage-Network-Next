"use client";

import { FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  const slides = [
    {
      id: 1,
      title: (
        <>
          Redefining <span className="text-blue-400">Luxury</span>{" "}
          Automotive Digital
        </>
      ),
      subtitle:
        "Experience unparalleled web performance tailored exclusively for premium garages.",
      buttonText: "Start the Journey",
      image: "/images/slide-1.png",
    },
    {
      id: 2,
      title: (
        <>
          Engineered for{" "}
          <span className="text-blue-400">Excellence</span>
        </>
      ),
      subtitle:
        "High-end UI/UX designs that convert visitors into lifelong clients.",
      buttonText: "Explore Features",
      image: "/images/slide-2.png",
    },
    {
      id: 3,
      title: (
        <>
          Responsive &{" "}
          <span className="text-blue-400">Flawless</span>
        </>
      ),
      subtitle:
        "Your business, accessible everywhere with perfect pixel precision.",
      buttonText: "View Portfolio",
      image: "/images/slide-3.png",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#0a1128] text-white font-sans">
      {/* Background abstract gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={600}
        loop={true}
        className="hero-swiper z-10"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative z-10 mx-auto flex min-h-[580px] sm:min-h-[640px] md:min-h-[680px] lg:min-h-[720px] max-w-[1400px] items-center px-5 sm:px-8 md:px-12 lg:px-24 xl:px-28 py-14 sm:py-16 lg:py-20">
              <div className="grid w-full grid-cols-1 lg:grid-cols-12 items-center gap-8 md:gap-10 lg:gap-8">

                {/* Left Text — full width on mobile, 7 cols on desktop */}
                <div className="lg:col-span-7 space-y-5 sm:space-y-6 relative z-20 text-center lg:text-left">
                  <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-sm">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-[22px] font-light text-blue-100/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
                    {slide.subtitle}
                  </p>
                  <div className="pt-2 sm:pt-4 flex justify-center lg:justify-start">
                    <button className="group inline-flex items-center gap-3 rounded-full bg-blue-600 hover:bg-blue-500 px-7 sm:px-9 py-3.5 sm:py-4 text-[15px] sm:text-[17px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(37,99,235,0.4)] active:scale-95">
                      {slide.buttonText}
                      <FaArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>

                {/* Right Image — shown below text on mobile */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end relative z-10 mt-2 lg:mt-0">
                  {/* Glow behind image */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-blue-400/10 blur-[80px]"></div>
                  <img
                    src={slide.image}
                    alt="Premium Showcase"
                    className="relative z-10 w-full max-w-[260px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-full lg:max-h-[500px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-105"
                  />
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Custom Styles */}
      <style>{`
        .hero-swiper .swiper-pagination-bullet {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.4);
          opacity: 1;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          transition: all 0.3s ease;
          margin: 0 4px !important;
        }
        @media (min-width: 768px) {
          .hero-swiper .swiper-pagination-bullet {
            width: 14px;
            height: 14px;
          }
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #3b82f6;
          border-color: #3b82f6;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
          transform: scale(1.2);
        }
        .hero-swiper .swiper-pagination {
          bottom: 14px !important;
          z-index: 20 !important;
        }
        @media (min-width: 768px) {
          .hero-swiper .swiper-pagination {
            bottom: 28px !important;
          }
        }
      `}</style>
    </div>
  );
}
