"use client";

import Image from "next/image";
import { FaBolt } from "react-icons/fa";

export default function FeaturesGrid() {
  const features = [
    {
      id: 1,
      image: "/images/tecrml.webp",
      title: "TecRMI Inside",
      description: "Unlock OEM-level technical data, repair times, and maintenance schedules directly within your workflow. Empower your mechanics with the exact specifications they need to fix vehicles faster and more accurately.",
      isIconOnly: false
    },
    {
      id: 2,
      image: "/images/automated-reminders.webp",
      title: "Automated Reminders",
      description: "Eradicate costly no-shows and drive repeat business on autopilot. Our system automatically dispatches SMS and email reminders for upcoming MOTs, services, and outstanding quotes.",
      isIconOnly: false
    },
    {
      id: 3,
      image: "/images/courtesy-vehicles.webp",
      title: "Courtesy Vehicles",
      description: "Manage your entire fleet of loaner cars seamlessly. Track availability, log vehicle condition reports, and assign courtesy cars to specific bookings without the headache of overlapping schedules.",
      isIconOnly: false
    },
    {
      id: 4,
      image: "/images/calendar.webp",
      title: "Smart Calendar",
      description: "A centralized, drag-and-drop diary that gives your front desk complete control. Visualize mechanic workloads, identify bottlenecks, and maximize your daily bay utilization.",
      isIconOnly: false
    },
    {
      id: 5,
      image: "/images/customer-management.webp",
      title: "Customer Management",
      description: "Build a comprehensive database of your clientele. Access full vehicle histories, previous invoices, and personalized notes in seconds to deliver a truly VIP experience.",
      isIconOnly: false
    },
    {
      id: 6,
      image: "/images/customer-portal.webp",
      title: "Client Portal",
      description: "Give your customers the power to view quotes, authorize additional work, and pay invoices online via a secure, branded portal—dramatically reducing phone traffic.",
      isIconOnly: false
    },
    {
      id: 7,
      image: "/images/solera-autodata.webp",
      title: "Autodata Integration",
      description: "Seamlessly pull in industry-standard Autodata for pinpoint diagnostics and exact labor times, ensuring every quote you generate is highly profitable and fiercely competitive.",
      isIconOnly: false
    },
    {
      id: 8,
      image: "/images/gsf-car-parts.webp",
      title: "GSF Integration",
      description: "Order parts at the speed of light. Our direct GSF integration allows you to check live local stock, compare pricing, and order components without ever leaving the management system.",
      isIconOnly: false
    },
    {
      id: 9,
      image: "/images/partslink24.webp",
      title: "Partslink24 Integration",
      description: "Access original manufacturer parts catalogs directly. Ensure you are ordering the exact OEM component required first time, every time, eliminating costly returns and delays.",
      isIconOnly: false
    },
    {
      id: 10,
      image: null,
      title: "Bond Integration",
      description: "Connect your operations with Bond for streamlined financial workflows. Keep your accounting in sync and reduce manual data entry errors across your entire enterprise.",
      isIconOnly: true,
      customIcon: "BOND"
    },
    {
      id: 11,
      image: "/images/multi-site-garage-management-system.webp",
      title: "Multi-Site Control",
      description: "Operating several garages? Unify your network under one master dashboard. Track performance, shift inventory, and manage personnel across all your locations simultaneously.",
      isIconOnly: false
    },
    {
      id: 12,
      image: "/images/purchase-orders.webp",
      title: "Purchase Orders",
      description: "Take total control of your expenditure. Generate digital purchase orders, track supplier deliveries, and automate your goods-in process for flawless inventory management.",
      isIconOnly: false
    }
  ];

  return (
    <section className="bg-slate-50 py-24 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group relative"
            >
              {/* Decorative top gradient on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1EA1F1] to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Icon / Image Header */}
              <div className="h-40 w-full bg-slate-50/50 flex items-center justify-center border-b border-slate-50 relative overflow-hidden p-8">
                {feature.image ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="max-h-full max-w-full object-contain filter group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black text-white flex items-center justify-center rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-500">
                       <span className="text-3xl font-black italic tracking-widest">{feature.customIcon}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-[20px] font-bold text-slate-900 mb-3 group-hover:text-[#1EA1F1] transition-colors leading-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-[14px] leading-relaxed flex-grow">
                  {feature.description}
                </p>
                
                {/* Minimalist Learn More link */}
                <div className="mt-6 flex items-center text-[#1EA1F1] font-semibold text-[13px] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <span>Explore capability</span>
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
