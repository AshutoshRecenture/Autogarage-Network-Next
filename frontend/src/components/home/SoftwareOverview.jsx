import { FaPlay, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default function SoftwareOverview() {
  return (
    <section className="relative py-16 bg-[#f8fafc] overflow-hidden font-sans">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-300/20 blur-[150px] -z-10 rounded-full mix-blend-multiply pointer-events-none"></div>
      <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-indigo-300/20 blur-[150px] -z-10 rounded-full mix-blend-multiply pointer-events-none"></div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
        {/* Integrations Banner (Moved to top as "Trusted By" style) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 opacity-70">
          <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
            Powered by Industry Leaders
          </p>
          <div className="hidden md:block h-px w-12 bg-gray-300"></div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#00d66c] rounded-sm"></div>
              <span className="text-[17px] font-extrabold text-gray-800 tracking-tight leading-none mt-1">
                TecRMI{" "}
                <span className="font-medium text-[#00d66c]">inside</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl text-[#3b1c68] font-black tracking-widest uppercase">
                Solera
              </span>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info Block (Spans 7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center bg-[#0a1128] rounded-[32px] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-900/40 z-0"></div>
 
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white leading-[1.15] mb-6">
                The Ultimate <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                  Garage Management
                </span>{" "}
                <br />
                Software.
              </h2>
              <p className="text-sm md:text-base font-light text-gray-300 leading-relaxed max-w-xl mb-6">
                Perfectly engineered for Workshops, MOT Centres, & Tyre Fitting
                Specialists. Streamline your operations and grow your business
                today.
              </p>
 
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-200 font-medium text-base">
                  <FaCheckCircle className="text-blue-400" size={18} />{" "}
                  Integrated Vehicle Data
                </li>
                <li className="flex items-center gap-3 text-gray-200 font-medium text-base">
                  <FaCheckCircle className="text-blue-400" size={18} /> Seamless
                  Web Presence
                </li>
                <li className="flex items-center gap-3 text-gray-200 font-medium text-base">
                  <FaCheckCircle className="text-blue-400" size={18} />{" "}
                  Automated Workflows
                </li>
              </ul>
 
              <Link
                href="/products/gms"
                className="group flex items-center gap-3 rounded-full bg-blue-500 px-7 py-3 text-[15px] font-bold text-white shadow-[0_8px_25px_rgba(59,130,246,0.3)] transition-all duration-300 hover:shadow-[0_12px_35px_rgba(59,130,246,0.5)] hover:-translate-y-1 w-max"
              >
                Book Free Demo
                <FaArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
 
          {/* Videos Block (Spans 5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            {/* Video 1 */}
            <div className="relative w-full h-[220px] sm:h-[250px] lg:h-[220px] bg-[#0a1128] rounded-[32px] overflow-hidden shadow-xl border border-gray-800 z-30">
              <video
                controls
                preload="metadata"
                poster="/images/video-1.png"
                className="w-full h-full object-cover relative z-40"
                src="https://res.cloudinary.com/n4okswsd/video/upload/q_auto,f_auto/v1/agn_long_intro_2_1.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>
 
            {/* Video 2 */}
            <div className="relative w-full h-[220px] sm:h-[250px] lg:h-[220px] bg-[#0a1128] rounded-[32px] overflow-hidden shadow-xl border border-gray-800 z-30">
              <video
                controls
                preload="metadata"
                poster="/images/video-2.png"
                className="w-full h-full object-cover relative z-40"
                src="https://res.cloudinary.com/n4okswsd/video/upload/v1/agn_long_intro_4_1.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
