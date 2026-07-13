"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaQuoteRight, FaPlay, FaExternalLinkAlt } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      image: "/images/george.png",
      name: "GEORGE",
      company: "COVENTRY TYRES",
      text: "Seamless garage operations with a focus on customer satisfaction, delivered at accessible prices.",
      website: "https://www.tyres-coventry.co.uk/"
    },
    {
      id: 2,
      image: "/images/andrew.png",
      name: "ANDREW PAGE",
      company: "KINGSWINFORD TYRES",
      text: "After joining AGN, my sales skyrocketed—and we're expecting even greater growth this year!",
      website: "https://www.kingswinfordtyres.co.uk/"
    },
    {
      id: 3,
      image: "/images/mark.png",
      name: "MARK",
      company: "ROBERTS TYRES",
      text: "I had some doubts initially, but the software delivered exactly what it promised.",
      website: "https://www.robertstyres.co.uk/"
    },
    {
      id: 4,
      image: "/images/lee.png",
      name: "LEE JONES",
      company: "MS AUTO CENTRE",
      text: "Effortless garage services prioritising customer satisfaction, all at competitive prices.",
      website: "https://www.msautocentreltd.co.uk/"
    },
    {
      id: 5,
      image: "/images/robert.png",
      name: "ROBERT MAZAN",
      company: "TYRES SHREWSBURY",
      text: "The garage software solutions from Auto Garage Network is a great tool to reach out to more customers.",
      website: "https://www.tyresshrewsbury.co.uk/"
    }
  ];

  return (
    <section className="py-16 bg-[#f8fafc] font-sans overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-100/50 rounded-bl-[100px] z-0 blur-[80px]"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-indigo-100/50 rounded-tr-[100px] z-0 blur-[80px]"></div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12">
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0a1128] mb-4 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            We love our customers and they love us too. Here is what independent garage owners have to say about our platform.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1280: { slidesPerView: 3, spaceBetween: 40 },
          }}
          className="testimonial-swiper !pb-12"
        >
          {testimonials.map((client) => (
            <SwiperSlide key={client.id} className="h-auto">
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group cursor-grab active:cursor-grabbing">
                
                <div>
                  {/* Top: Image, Name & Quote Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-50 shadow-sm">
                          <img 
                            src={client.image} 
                            alt={client.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-tight">
                          {client.name}
                        </h3>
                        <p className="text-sm font-semibold text-blue-600 tracking-wide mt-1">
                          {client.company}
                        </p>
                      </div>
                    </div>
                    
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <FaQuoteRight size={18} />
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-[17px] text-gray-600 leading-relaxed mb-8 italic">
                    "{client.text}"
                  </p>
                </div>

                {/* Bottom Links */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <a href={client.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
                    <FaExternalLinkAlt size={12} />
                    Website
                  </a>
                  
                  <button className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors group/btn">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover/btn:bg-blue-100 transition-colors">
                      <FaPlay size={10} className="text-blue-600 ml-0.5" />
                    </div>
                    Watch Video
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .testimonial-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          transition: all 0.3s ease;
          margin: 0 6px !important;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #2563eb;
          width: 24px;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}
