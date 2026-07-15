"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, HelpCircle, RefreshCw } from "lucide-react";

// Pre-seeded FAQs matching active database entries as a robust fallback
const FALLBACK_FAQS = [
  {
    _id: "6a43c12f0a3ee405685a0bfe",
    question: "Will I receive a cost estimate before the repair begins?",
    answer:
      "Yes. After inspecting your vehicle, we provide a detailed cost estimate before starting any repair work. No additional work is done without your approval.",
    order: 0,
  },
  {
    _id: "6a43c5790a3ee405685a0bff",
    question: "Do you offer pickup and doorstep delivery?",
    answer:
      "Yes, we offer vehicle pickup and doorstep delivery services in selected areas for your convenience.",
    order: 0,
  },
  {
    _id: "6a46029a280905b16d841335",
    question: "How do I schedule a service appointment?",
    answer:
      "Booking a service is simple. Choose your preferred date and time through our website or contact our support team. We will confirm your appointment as soon as possible.",
    order: 0,
  },
  {
    _id: "6a48b903c3ab28167755c17a",
    question: "What makes your garage the right choice for my vehicle?",
    answer:
      "We provide certified technicians, genuine parts, transparent pricing, modern equipment, and reliable customer service to ensure your vehicle receives the highest quality care.",
    order: 0,
  },
];

export default function FaqSection({ className = "" }) {
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    setFaqs(FALLBACK_FAQS);
    setLoading(false);
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  return (
    <section
      className={`py-12 relative overflow-hidden bg-slate-50 border-t border-slate-100 ${className}`}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-50/70 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-50/70 blur-3xl"></div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1.5 bg-[#1EA1F1] mx-auto mt-4 rounded-full"></div>
        </div>



        {/* Accordions */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <RefreshCw
                className="animate-spin mb-3 text-[#1EA1F1]"
                size={32}
              />
              <p className="text-sm">Loading FAQs...</p>
            </div>
          ) : faqs.length > 0 ? (
            faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={faq._id || index}
                  className={`bg-white rounded-2xl border transition-all duration-300 shadow-sm ${
                    isOpen
                      ? "border-[#1EA1F1]/30 shadow-md shadow-blue-50/50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-slate-800 hover:text-[#1EA1F1] focus:outline-none transition-colors group"
                  >
                    <span className="text-base sm:text-lg pr-4 font-bold">
                      {faq.question}
                    </span>
                    <span
                      className={`p-1.5 rounded-lg transition-all duration-300 ${
                        isOpen
                          ? "bg-blue-50 text-[#1EA1F1] rotate-180"
                          : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                      }`}
                    >
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-1 text-slate-600 border-t border-slate-50 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
              <p className="text-slate-400 text-lg">No FAQs available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
