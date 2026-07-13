"use client";

import { FaCheckCircle, FaCarSide, FaCogs, FaChartLine, FaMobileAlt } from "react-icons/fa";

export default function GmsFeatures() {
  const features = [
    {
      title: "Streamlined Operations",
      description: "Automate your daily tasks from bookings to invoicing, giving you more time to focus on your customers.",
      icon: <FaCogs className="text-4xl text-blue-500 mb-4" />
    },
    {
      title: "Comprehensive Vehicle Data",
      description: "Integrated VRM lookup and advanced Autodata services to get accurate vehicle information instantly.",
      icon: <FaCarSide className="text-4xl text-blue-500 mb-4" />
    },
    {
      title: "Powerful Analytics",
      description: "Track your garage's performance with detailed reports on sales, efficiency, and inventory management.",
      icon: <FaChartLine className="text-4xl text-blue-500 mb-4" />
    },
    {
      title: "Customer Engagement",
      description: "Keep your customers informed with automated SMS/email reminders for MOTs and services.",
      icon: <FaMobileAlt className="text-4xl text-blue-500 mb-4" />
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-3xl mix-blend-multiply"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/50 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Why Choose AGN GMS?</h2>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Everything you need to run a successful garage.</h3>
          <p className="text-lg text-gray-600">Our Garage Management System is built from the ground up to handle the unique challenges of modern automotive repair shops.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] transition-all duration-300 group">
              <div className="transform group-hover:scale-110 transition-transform duration-300 origin-left">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-gray-200 py-12">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">1000+</div>
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Active Garages</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">Free</div>
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Setup & Training</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">24/7</div>
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Expert Support</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">#1</div>
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Rated GMS</div>
          </div>
        </div>
      </div>
    </section>
  );
}
