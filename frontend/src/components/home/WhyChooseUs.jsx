import React from "react";
import { FaCheckCircle, FaPhoneAlt, FaArrowRight } from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <section className="py-12 relative overflow-hidden bg-slate-50">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[0%] right-[0%] w-[600px] h-[600px] rounded-full bg-blue-100/40 blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-[0%] left-[0%] w-[600px] h-[600px] rounded-full bg-indigo-100/40 blur-3xl -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Us?
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Illustration Side */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-indigo-100 rounded-[40px] transform -rotate-3 scale-105 -z-10 blur-sm transition-transform duration-500 group-hover:rotate-0 group-hover:scale-100"></div>
            <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 border border-white">
              {/* Using a placeholder image path. User can swap with their specific illustration */}
              <img
                src="/images/slide-3.png"
                alt="Why Choose Auto Garage Network"
                className="w-full h-auto object-contain transform transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center">
            <ul className="space-y-6 mb-10">
              <li className="flex gap-4 group">
                <div className="mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <FaCheckCircle className="text-lg" />
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-[16px] flex-1">
                  At{" "}
                  <span className="font-bold text-slate-900">
                    Auto Garage Network
                  </span>
                  , we know the automotive industry inside and out. With years
                  of experience, we understand what works and the challenges
                  garage owners face.
                </p>
              </li>
              <li className="flex gap-4 group">
                <div className="mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <FaCheckCircle className="text-lg" />
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-[16px] flex-1">
                  Our garage management software eliminates common problems,
                  increases efficiency and increases profitability. Many clients
                  in the UK have seen{" "}
                  <span className="font-bold text-blue-600 bg-blue-50 px-2 rounded">
                    2,000% ROI
                  </span>{" "}
                  with our solutions.
                </p>
              </li>
              <li className="flex gap-4 group">
                <div className="mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <FaCheckCircle className="text-lg" />
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-[16px] flex-1">
                  We help your business stand out, boost sales, manage customer
                  relationships, and retain customers.
                </p>
              </li>
            </ul>

            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group hover:border-blue-200 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>

              <h4 className="text-xl font-bold text-slate-900 mb-3">
                Are you interested?
              </h4>
              <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
                Call us today to speak with our expert. We'll be happy to answer
                questions and host an on-site demonstration to show how we can
                transform your garage.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-600/20 hover:shadow-lg hover:-translate-y-0.5">
                  <FaPhoneAlt />
                  <span>Call Us Today</span>
                </button>
                <span className="text-slate-800 font-semibold italic text-[15px]">
                  Discover what our software can do for your business!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
