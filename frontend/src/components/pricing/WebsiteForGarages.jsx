"use client";

import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function WebsiteForGarages() {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);

  const plans = [
    {
      name: "Iframe In Your Website",
      description: "For garages wanting to embed functionality in an existing site.",
      freeGMS: false,
      setupPrice: "500",
      setupSubtitle: "One-off iframe setup cost",
      monthlyPrice: "150",
      monthlySubtitle: "Monthly Fee",
      isPopular: false
    },
    {
      name: "Standard Website",
      description: "A perfect website for garages only wanting to sell Tyres.",
      freeGMS: true,
      setupPrice: "1000",
      setupSubtitle: "Includes GMS & SEO with guaranteed top positions.",
      monthlyPrice: "300",
      monthlySubtitle: "Monthly Fee with SEO Moneyback Guarantee",
      isPopular: false
    },
    {
      name: "Premium Website",
      description: "Ideal for those garages wanting to push Tyres and Services.",
      freeGMS: true,
      setupPrice: "2000",
      setupSubtitle: "Includes GMS & SEO with guaranteed top positions.",
      monthlyPrice: "350",
      monthlySubtitle: "Monthly Fee with SEO Moneyback Guarantee",
      isPopular: false
    },
    {
      name: "Professional",
      description: "The complete package for offering Tyres, Services and MOT's.",
      freeGMS: true,
      setupPrice: "3000",
      setupSubtitle: "Includes GMS & SEO with guaranteed top positions.",
      monthlyPrice: "450",
      monthlySubtitle: "Monthly Fee with SEO Moneyback Guarantee",
      isPopular: true
    },
    {
      name: "Full Package Website",
      description: "The ultimate solution for maximum digital dominance.",
      freeGMS: true,
      setupPrice: "6000",
      setupSubtitle: "Includes GMS & SEO with guaranteed top positions.",
      monthlyPrice: "650",
      monthlySubtitle: "Monthly Fee with SEO Moneyback Guarantee",
      isPopular: false
    }
  ];

  const features = [
    { label: "Website Setup", values: ["On Request", true, true, true, true] },
    { label: "VRM Lookup", values: ["On Request", true, true, true, true] },
    { label: "Tyre Selling Feature", values: ["On Request", true, true, true, true] },
    { label: "Services Booking (All Services)", values: ["On Request", false, true, true, true] },
    { label: "Notification App", values: ["On Request", false, true, true, true] },
    { label: "MOT Booking", values: ["On Request", false, false, true, true] },
    { label: "Wheels", values: ["On Request", false, false, true, true] },
    { label: "Body Shop", values: ["On Request", false, false, true, true] },
    { label: "Payment Gateway", values: ["On Request", false, false, true, true] },
    { label: "Payment Assist", values: ["On Request", false, false, true, true] },
    { label: "Car Trading", values: ["On Request", false, false, true, true] },
    { label: "Web Development For One Year", values: ["On Request", false, false, true, true] },
    { label: "Web Development For Lifetime", values: ["On Request", false, false, false, true] },
    { label: "Facebook Advertising", values: ["On Request", false, false, false, true] },
    { label: "Mobile App", values: ["On Request", false, false, false, true] },
    { label: "Area Exclusivity", values: ["On Request", false, false, false, true] },
    { label: "A Dedicated SEO Person Full Time", values: ["On Request", false, false, false, true] },
    { label: "Vostel (Telephone Integration)", values: ["On Request", false, false, false, true] },
    { label: "Customer App", values: ["On Request", false, false, false, true] },
    { label: "Technician App", values: ["On Request", false, false, false, true] },
    { label: "5 Miles Location Micro Website", values: ["On Request", false, false, false, true] },
    { label: "Unique Landing Pages", values: ["On Request", "Upto 10", "Upto 20", "Upto 30", "Upto 100"] }
  ];

  const renderValue = (value) => {
    if (value === true) {
      return <FaCheck className="text-green-500 mx-auto" size={16} />;
    }
    if (value === false) {
      return <FaTimes className="text-black mx-auto" size={16} />;
    }
    if (value === "On Request") {
      return <span className="text-orange-500 font-semibold text-xs bg-orange-50 px-2 py-1 rounded-md inline-block">On Request</span>;
    }
    return <span className="text-gray-800 font-bold text-[13px]">{value}</span>;
  };

  const displayedPlans = selectedPlanIndex !== null 
    ? [{ ...plans[selectedPlanIndex], originalIndex: selectedPlanIndex }] 
    : plans.map((p, i) => ({ ...p, originalIndex: i }));

  return (
    <section className="bg-white py-16 font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Top Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20 relative z-10">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedPlanIndex(selectedPlanIndex === i ? null : i)}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative cursor-pointer group ${
                plan.isPopular 
                  ? "bg-gradient-to-b from-[#0a1128] to-[#1a2342] text-white ring-2 ring-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)] lg:-mt-6 lg:mb-6" 
                  : "bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1"
              } ${selectedPlanIndex === i ? "ring-4 ring-blue-400" : ""}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg whitespace-nowrap">
                  Most Popular
                </div>
              )}
              
              <div className="flex-grow">
                <div className="mb-4 min-h-[80px]">
                  <h3 className={`text-lg font-black tracking-tight leading-tight ${plan.isPopular ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs mt-2 font-medium leading-relaxed ${plan.isPopular ? "text-blue-200" : "text-gray-500"}`}>
                    {plan.description}
                  </p>
                </div>
                
                {plan.freeGMS && (
                  <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 ${plan.isPopular ? "bg-blue-900/50 text-blue-300" : "bg-blue-50 text-blue-600"}`}>
                    Includes Free GMS
                  </div>
                )}
                
                <div className="space-y-4">
                  {/* Setup Cost */}
                  <div className={`p-4 rounded-2xl ${plan.isPopular ? "bg-white/10" : "bg-gray-50 group-hover:bg-blue-50/50 transition-colors"}`}>
                    <div className="text-[10px] uppercase font-bold tracking-widest mb-1 opacity-70">Setup Cost</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black">£{plan.setupPrice}</span>
                      <span className="text-xs font-bold opacity-60">+VAT</span>
                    </div>
                    <div className="text-[10px] mt-2 opacity-75 leading-tight">{plan.setupSubtitle}</div>
                  </div>

                  {/* Monthly Cost */}
                  <div className={`p-4 rounded-2xl ${plan.isPopular ? "bg-blue-600" : "bg-blue-50 group-hover:bg-blue-100 transition-colors"}`}>
                    <div className="text-[10px] uppercase font-bold tracking-widest mb-1 opacity-70">Monthly Fee</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black">£{plan.monthlyPrice}</span>
                      <span className="text-xs font-bold opacity-60">+VAT</span>
                    </div>
                    <div className="text-[10px] mt-2 opacity-75 leading-tight">{plan.monthlySubtitle}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200/20">
                <button className={`w-full py-3 rounded-xl font-bold text-[13px] transition-all duration-300 ${
                  plan.isPopular 
                    ? "bg-white text-blue-900 hover:bg-gray-100" 
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}>
                  {selectedPlanIndex === i ? "Viewing Details" : "View Details"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Feature Comparison Table */}
        <div className="mt-24">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900">
              {selectedPlanIndex !== null ? `${plans[selectedPlanIndex].name} Features` : "Compare All Features"}
            </h3>
            {selectedPlanIndex !== null && (
              <button 
                onClick={() => setSelectedPlanIndex(null)}
                className="text-sm font-bold text-blue-600 bg-blue-50 px-5 py-2.5 rounded-full hover:bg-blue-100 transition-colors shadow-sm"
              >
                Show All Plans
              </button>
            )}
          </div>
          
          <div className="overflow-x-auto pb-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr>
                  <th className="py-6 px-6 border-b border-gray-200 bg-gray-50/80 sticky left-0 z-20 w-[25%] backdrop-blur-md">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Feature Overview</span>
                  </th>
                  {displayedPlans.map((plan, i) => (
                    <th key={i} className={`py-6 px-4 border-b border-gray-200 bg-gray-50/80 text-center ${selectedPlanIndex !== null ? "w-[75%]" : "w-[15%]"} ${plan.isPopular ? "bg-blue-50" : ""}`}>
                      <span className={`text-sm font-black uppercase tracking-wide ${plan.isPopular ? "text-blue-700" : "text-gray-900"}`}>
                        {plan.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {features.map((feature, idx) => (
                  <tr key={idx} className="group hover:bg-blue-50/30 transition-colors duration-200">
                    <td className="py-4 px-6 text-[13px] font-bold text-gray-700 bg-white group-hover:bg-blue-50/30 sticky left-0 z-10 transition-colors duration-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none">
                      {feature.label}
                    </td>
                    {displayedPlans.map((plan, vIdx) => (
                      <td key={vIdx} className={`py-4 px-4 text-center align-middle ${plan.isPopular ? "bg-blue-50/10 group-hover:bg-transparent" : ""}`}>
                        {renderValue(feature.values[plan.originalIndex])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </section>
  );
}
