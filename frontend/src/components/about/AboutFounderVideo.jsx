import Image from "next/image";
import { FaPlay, FaArrowRight } from "react-icons/fa";

export default function AboutFounderVideo() {
  return (
    <section className="pt-24 pb-12 bg-[#f3f4f6] font-sans">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div className="pr-4 lg:pr-12">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-gray-800 leading-tight flex flex-wrap items-center gap-2">
              Hear our story from Auto Garage Network founder <span className="text-blue-600">Mr Jatinder Singh Bassi</span>
              <FaArrowRight className="text-blue-600 mt-2 ml-2" size={28} />
            </h2>
          </div>

          {/* Right Video Player */}
          <div className="relative w-full h-[280px] md:h-[340px] rounded-lg overflow-hidden shadow-lg z-30">
            <video
              controls
              preload="metadata"
              poster="/images/portfolio-1.png"
              className="w-full h-full object-cover relative z-40"
              src="https://res.cloudinary.com/n4okswsd/video/upload/q_auto,f_auto/v1/Agn_01_1_1_1.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>

        </div>
      </div>
    </section>
  );
}
