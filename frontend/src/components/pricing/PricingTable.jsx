"use client";

import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function PricingTable() {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);

  const plans = [
    {
      name: "Elite Workshop",
      tagline: "Essential tools for growing garages.",
      price: "135",
      isPopular: false,
    },
    {
      name: "Elite ProMax Workshop",
      tagline: "Advanced management & integration.",
      price: "235",
      isPopular: true,
    },
    {
      name: "Elite ProMax Plus Workshop",
      tagline: "Complete digital dominance.",
      price: "375",
      isPopular: false,
    }
  ];

  const features = [
    { label: "Service Visuals", values: [false, false, "Free"] },
    { label: "AGN AUTO QUOTE", values: [false, false, "Unlimited"] },
    { label: "Store Customer Data", values: [true, true, true] },
    { label: "Store Vehicle Data", values: [true, true, true] },
    { label: "Create Estimates/Quotations", values: [true, true, true] },
    { label: "Jobsheets", values: [true, true, true] },
    { label: "Invoicing", values: [true, true, true] },
    { label: "SMS/MOT Reminders (fair usage policy)", values: ["300 FOC PM", "400 FOC PM", "Unlimited*"] },
    { label: "VRMs * fair usage policy", values: ["300 PM", "Unlimited*", "Unlimited*"] },
    { label: "Advanced VRM info", values: [true, true, true] },
    { label: "Postcode Lookup fair usage policy", values: ["200pm", "300pm", "Unlimited*"] },
    { label: "Tyre Suppliers and Price Comparisons", values: ["1 Supplier", "Unlimited*", "Unlimited*"] },
    { label: "Create Custom jobs", values: [true, true, true] },
    { label: "Workshop diary", values: [true, true, true] },
    { label: "MOT diary", values: [true, true, true] },
    { label: "Multi users", values: ["3", "Unlimited*", "Unlimited*"] },
    { label: "Automated reminders", values: [true, true, true] },
    { label: "Catalogue integration*", values: [true, true, true] },
    { label: "Online ordering", values: [true, true, true] },
    { label: "Manufacturers Service/Repair Times", values: ["Optional £", true, true] },
    { label: "Stock system", values: ["Optional £", true, true] },
    { label: "Account package integration", values: ["Optional £", true, true] },
    { label: "Service Visuals (Detailed)", values: ["Optional £", true, true] },
    { label: "Vehicle sales", values: ["Optional £", "Optional £", true] },
    { label: "Full technical data", values: ["Optional £", "Optional £", true] },
    { label: "Courtesy cars", values: ["Optional £", "Optional £", true] },
    { label: "Electronic Vehicle Inspections", values: ["Optional £", "Optional £", true] },
    { label: "Customer App", values: ["Optional £", "Optional £", true] },
    { label: "Technicians app", values: ["Optional £", "Optional £", true] },
    { label: "Technicians efficiency", values: ["Optional £", "Optional £", true] },
    { label: "Advanced Analytical reports", values: ["Optional £", "Optional £", true] },
    { label: "Set up cost", values: ["£500", "£500", "£500"] },
    { label: "Data Migration", values: ["Optional £", "Optional £", "Optional £"] },
    { label: "Multi-site", values: [false, false, true] },
    { label: "Automatic updates", values: [true, true, true] },
  ];

  const renderValue = (value) => {
    if (value === true) {
      return <FaCheck className="text-green-500 mx-auto" size={16} />;
    }
    if (value === false) {
      return <span className="text-gray-300 text-2xl leading-none block text-center">-</span>;
    }
    if (value === "Optional £") {
      return <span className="text-orange-500 font-semibold text-sm bg-orange-50 px-2 py-1 rounded-md inline-block">Optional £</span>;
    }
    if (value === "Free" || value === "Unlimited*" || value === "Unlimited") {
       return <span className="text-green-600 font-bold text-[13px] bg-green-50 px-2.5 py-1 rounded-full inline-block">{value}</span>;
    }
    return <span className="text-gray-800 font-bold text-[13px]">{value}</span>;
  };

  const displayedPlans = selectedPlanIndex !== null 
    ? [{ ...plans[selectedPlanIndex], originalIndex: selectedPlanIndex }] 
    : plans.map((p, i) => ({ ...p, originalIndex: i }));

  return (
    <section className="bg-white py-16 font-sans overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Top Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20 relative z-10">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedPlanIndex(selectedPlanIndex === i ? null : i)}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative cursor-pointer hover:-translate-y-2 ${
                plan.isPopular 
                  ? "bg-[#0a1128] text-white ring-2 ring-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.3)] md:-mt-6 md:mb-6" 
                  : "bg-white border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              } ${selectedPlanIndex === i ? "ring-4 ring-blue-400" : ""}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg whitespace-nowrap">
                  Most Popular
                </div>
              )}
              
              <div>
                <div className="mb-2">
                  <h3 className={`text-xl font-black ${plan.isPopular ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mt-2 font-medium ${plan.isPopular ? "text-blue-200" : "text-gray-500"}`}>
                    {plan.tagline}
                  </p>
                </div>
                
                <div className="mt-8 mb-2 flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tight">£{plan.price}</span>
                  <span className={`font-bold ${plan.isPopular ? "text-gray-400" : "text-gray-400"}`}>+ VAT</span>
                </div>
                <div className={`text-sm ${plan.isPopular ? "text-gray-400" : "text-gray-500"}`}>per month</div>
              </div>
              
              <div className="mt-10">
                <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                  plan.isPopular 
                    ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
                    : "bg-gray-100 text-gray-900"
                }`}>
                  {selectedPlanIndex === i ? "Viewing Details" : "Click to view details"}
                </button>
                <div className="text-center mt-3">
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${plan.isPopular ? "text-blue-300" : "text-gray-400"}`}>
                    Website Not Included
                  </span>
                </div>
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
                className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
              >
                Reset / Compare All
              </button>
            )}
          </div>
          
          <div className="overflow-x-auto pb-8">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="py-5 px-6 border-b-2 border-gray-100 bg-white sticky left-0 z-20 w-[40%]">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Feature Overview</span>
                  </th>
                  {displayedPlans.map((plan, i) => (
                    <th key={i} className={`py-5 px-6 border-b-2 border-gray-100 bg-white text-center ${selectedPlanIndex !== null ? "w-[60%]" : "w-[20%]"}`}>
                      <span className={`text-sm font-bold ${plan.isPopular ? "text-blue-600" : "text-gray-900"}`}>
                        {plan.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {features.map((feature, idx) => (
                  <tr key={idx} className="group hover:bg-blue-50/40 transition-colors duration-200">
                    <td className="py-4 px-6 text-[14px] font-medium text-gray-700 bg-white group-hover:bg-blue-50/40 sticky left-0 z-10 transition-colors duration-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none">
                      {feature.label}
                    </td>
                    {displayedPlans.map((plan, vIdx) => (
                      <td key={vIdx} className="py-4 px-6 text-center align-middle">
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
