"use client";

import Image from "next/image";
import { FaCarSide, FaBell, FaCommentSms, FaDatabase } from "react-icons/fa6";
import { FaCheckCircle, FaCogs } from "react-icons/fa";

export default function MotFeatures() {
  const features = [
    {
      id: 1,
      title: "Smart Job Cards",
      description:
        "Automatically generate detailed job cards upon MOT booking. Every vital vehicle specification and required service is instantly organized for your mechanics, saving hours of manual data entry.",
      icon: <FaCarSide className="text-2xl" />,
      color: "from-blue-400 to-blue-600",
      bg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      title: "Automated Reminders",
      description:
        "Our intelligent digital diary actively monitors your bookings. It automatically dispatches timely reminders via SMS and Email to your entire client roster, dramatically reducing no-shows and boosting revenue.",
      icon: <FaBell className="text-2xl" />,
      color: "from-indigo-400 to-indigo-600",
      bg: "bg-indigo-50",
      iconColor: "text-indigo-500",
    },
    {
      id: 3,
      title: "Smart SMS Campaigns",
      description:
        "Keep your customers engaged year-round. MOT Diary auto-generates targeted SMS campaigns to inform your clients about seasonal offers, new services, and critical updates regarding their vehicles.",
      icon: <FaCommentSms className="text-2xl" />,
      color: "from-teal-400 to-teal-600",
      bg: "bg-teal-50",
      iconColor: "text-teal-500",
    },
    {
      id: 4,
      title: "Ramp Configuration",
      description:
        "Optimize your workshop floor with intuitive ramp management. Easily assign specific vehicles to appropriate ramps, streamlining your entire garage operation and maximizing daily throughput.",
      icon: <FaCogs className="text-2xl" />,
      color: "from-cyan-400 to-cyan-600",
      bg: "bg-cyan-50",
      iconColor: "text-cyan-500",
    },
  ];

  return (
    <div className="bg-slate-50">
      {/* What Not To Miss Section */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Never Miss a Detail with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Live DVLA Data
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Yes, cloud-based MOT management is now a reality. Through our
                exclusive tie-up with the DVLA, your garage gains instantaneous,
                first-hand access to the UK's most extensive vehicle database.
              </p>
              <div className="space-y-4">
                {[
                  "Automatic MOT expiry date retrieval",
                  "Instant VIN and engine number lookup",
                  "Complete MOT history and tyre data",
                  "Guaranteed accurate vehicle specifications",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FaCheckCircle className="text-blue-500 text-xl shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-lg text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                This prime feature ensures your records are flawlessly accurate,
                completely eliminating manual lookup errors and cementing MOT
                Diary as the premier management tool in the UK.
              </p>
            </div>

            <div className="flex-1 relative w-full">
              {/* Image Group */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src="/images/mot-mechanic.jpg"
                  alt="Mechanic using laptop"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating DVLA Stats Card */}
              <div className="absolute -bottom-10 -left-10 bg-white rounded-2xl p-6 shadow-xl border border-slate-100 z-20 flex items-center gap-5">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <FaDatabase className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                    Database Sync
                  </p>
                  <p className="text-2xl font-black text-slate-900">
                    100% Live
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* It's Feature-loaded Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              It's Completely{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Feature-Loaded
              </span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Everything you need to automate your daily operations, engage with
              customers, and rapidly scale your independent garage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Large Background Number */}
                <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-50 opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                  {feature.id}
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.iconColor} flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">
                  {feature.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            {/* Text Content */}
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Designed Exclusively for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Independent Garages
                </span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                We don't build generic software. MOT Diary was engineered
                specifically for the automotive industry to tackle the exact
                pain points you face daily.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                    <FaCogs className="text-xl" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">
                    Zero Learning Curve
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    An intuitive interface ensures your mechanics and reception
                    staff can master the system in minutes, not days.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                    <FaDatabase className="text-xl" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">
                    Bank-Grade Security
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Your client data and business metrics are encrypted and
                    backed up securely in the cloud 24/7.
                  </p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="flex-1 relative w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700 group">
                <img
                  src="/images/mot-premium.jpg"
                  alt="Premium Garage Interface"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-lg">
                    Empowering 500+ Garages
                  </p>
                  <p className="text-blue-300 text-sm">
                    Join the network today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      </section>
    </div>
  );
}
