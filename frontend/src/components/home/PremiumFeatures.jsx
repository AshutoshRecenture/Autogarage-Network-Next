import React from "react";
import Link from "next/link";
import {
  FaCheckCircle,
  FaArrowRight,
  FaDesktop,
  FaMobileAlt,
  FaSearch,
  FaCalendarAlt,
} from "react-icons/fa";

export default function PremiumFeatures() {
  const features = [
    {
      id: 1,
      logos: ["/images/tecrml.webp", "/images/solera-autodata.webp"],
      points: [
        "We partner with AutoData / TecRMI, the trusted source for vehicle maintenance, diagnostics, repair information.",
        "Our trial offers unlimited user access, with no credit card required. This makes us over 50% more cost-effective than our competitors.",
        "Garages gain direct access to one of the UK's most comprehensive Vehicle Technical Data systems at the click of a button.",
        "Our user-friendly platform provides up-to-date data covering more than 99% of vehicles on the road. This includes over 3,000 models, 130 marques, 90,000 images, and 59,000 illustrated procedures.",
      ],
      button1: "Click for further information",
      href1: "/products/gms",
      image: "/images/dashboard-mockup.png", // Or whatwedo-1.png if preferred
      imageRight: true,
    },
    {
      id: 2,
      title: "Website Solutions for Garages",
      desc: "Digitise your offerings with our feature-rich website. Manage task allocations, revenue reporting, pricing and client data - all with just a few clicks.",
      button1: "More details",
      href1: "/products/website",
      button2: "Free demo",
      href2: "/contact-us",
      image: "/images/whatwedo-1.png",
      imageRight: false, // Image on left for zig-zag
    },
    {
      id: 3,
      title: "MOT Diary",
      desc: "Access a comprehensive digital MOT database through our DVLA partnership. Enable online bookings, automate reminders, streamline workflows and easily launch SMS campaigns.",
      button1: "More details",
      href1: "/products/mot-diary",
      image: "/images/whatwedo-2.png",
      imageRight: true,
    },
    {
      id: 4,
      title: "SEO Services",
      desc: "As a leading automotive SEO provider, we help your business stand out. Our strategies drive web bookings, calls, emails and visits. This ensures a steady flow of new and returning customers.",
      button1: "More details",
      href1: "/seo",
      image: "/images/whatwedo-3.png",
      imageRight: false,
    },
    {
      id: 5,
      title: "Mobile App for Garages",
      desc: "Simplify bookings and operations with our user-friendly mobile app for iOS and Android. The sleek interface and cutting-edge technology are designed to elevate your garage services.",
      button1: "More details",
      href1: "/products/gms",
      image: "/images/whatwedo-4.png",
      imageRight: true,
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-50/50 blur-3xl"></div>
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-50/50 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-blue-50/50 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-12 lg:gap-16">
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              className={`flex flex-col gap-8 lg:gap-12 items-center ${feature.imageRight ? "lg:flex-row" : "lg:flex-row-reverse"}`}
            >
              {/* Text Content */}
              <div className="flex-1 w-full flex flex-col justify-center">
                {feature.logos ? (
                  <div className="flex items-center gap-6 mb-8">
                    <img
                      src={feature.logos[0]}
                      alt="TecRMI"
                      className="h-10 object-contain"
                    />
                    <div className="w-px h-10 bg-slate-300"></div>
                    <img
                      src={feature.logos[1]}
                      alt="Solera Autodata"
                      className="h-8 object-contain"
                    />
                  </div>
                ) : (
                  <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    {feature.title}
                  </h3>
                )}

                {feature.points ? (
                  <ul className="space-y-5 mb-10">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex gap-4">
                        <FaCheckCircle className="text-blue-500 text-xl flex-shrink-0 mt-1" />
                        <span className="text-slate-600 leading-relaxed text-[15px]">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg text-slate-600 leading-relaxed mb-10">
                    {feature.desc}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  {feature.button1 && (
                    <Link href={feature.href1 || "/"} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-7 rounded-xl transition-all shadow-lg shadow-blue-600/30 group hover:-translate-y-0.5">
                      {feature.button1}
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                  {feature.button2 && (
                    <Link href={feature.href2 || "/"} className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white font-semibold py-3.5 px-7 rounded-xl transition-all shadow-lg shadow-slate-900/30 group hover:-translate-y-0.5">
                      {feature.button2}
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Image Content */}
              <div className="flex-1 w-full group">
                <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.1)] border border-slate-100 transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_rgb(14,165,233,0.15)] bg-slate-50">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                  <img
                    src={feature.image}
                    alt={feature.title || "Feature showcase"}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
