"use client";

import { FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Hero() {
  const slides = [
    {
      id: 1,
      title: (
        <>
          Redefining <span className="text-blue-400">Luxury</span> <br /> Automotive Digital
        </>
      ),
      subtitle: "Experience unparalleled web performance tailored exclusively for premium garages.",
      buttonText: "Start the Journey",
      image: "/images/slide-1.png"
    },
    {
      id: 2,
      title: (
        <>
          Engineered for <br /> <span className="text-blue-400">Excellence</span>
        </>
      ),
      subtitle: "High-end UI/UX designs that convert visitors into lifelong clients.",
      buttonText: "Explore Features",
      image: "/images/slide-2.png"
    },
    {
      id: 3,
      title: (
        <>
          Responsive & <br /> <span className="text-blue-400">Flawless</span>
        </>
      ),
      subtitle: "Your business, accessible everywhere with perfect pixel precision.",
      buttonText: "View Portfolio",
      image: "/images/slide-3.png"
    }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#0a1128] text-white font-sans">
      {/* Background abstract gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        className="hero-swiper z-10"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative z-10 mx-auto flex min-h-[700px] max-w-[1400px] items-center px-12 lg:px-28 py-20">
              <div className="grid w-full grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
                
                {/* Left Text */}
                <div className="lg:col-span-7 space-y-8 relative z-20 pr-4 lg:pr-10">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-sm">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-[22px] font-light text-blue-100/80 leading-relaxed max-w-xl">
                    {slide.subtitle}
                  </p>
                  <div className="pt-6">
                    <button className="group flex items-center gap-3 rounded-full bg-blue-600 hover:bg-blue-500 px-9 py-4 text-[17px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(37,99,235,0.4)]">
                      {slide.buttonText} 
                      <FaArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Right Image */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end relative z-10">
                  {/* Subtle glow behind image */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-blue-400/10 blur-[80px]"></div>
                  
                  <img 
                    src={slide.image} 
                    alt="Premium Showcase" 
                    className="relative z-10 max-h-[500px] max-w-full w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-105" 
                  />
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Custom Styles to match the Premium Design */}
      <style>{`
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          display: none;
          color: white;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        @media (min-width: 768px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            display: flex;
          }
        }
        .hero-swiper .swiper-button-next:after,
        .hero-swiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: rgba(37, 99, 235, 0.5);
          border-color: rgba(37, 99, 235, 0.8);
          transform: scale(1.1);
        }
        .hero-swiper .swiper-button-prev {
          left: 20px;
        }
        .hero-swiper .swiper-button-next {
          right: 20px;
        }
        .hero-swiper .swiper-pagination-bullet {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.5);
          opacity: 1;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #3b82f6;
          border-color: #3b82f6;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
          transform: scale(1.2);
        }
        .hero-swiper .swiper-pagination {
          bottom: 30px !important;
          z-index: 20 !important;
        }
      `}</style>
    </div>
  );
}

