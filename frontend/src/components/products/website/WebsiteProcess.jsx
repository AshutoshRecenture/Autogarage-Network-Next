"use client";

import {
  FaComments,
  FaFileSignature,
  FaPhoneAlt,
  FaPaintBrush,
  FaRocket,
} from "react-icons/fa";

export default function WebsiteProcess() {
  const steps = [
    {
      id: 1,
      title: "Initial Strategy Session",
      description:
        "We begin with a deep dive into your business. Together, we evaluate your current in-house resources, customer engagement strategies, core service offerings, and target local markets to ensure we understand your vision completely.",
      icon: <FaComments className="text-xl" />,
      image: "/images/process-step-1.png",
    },
    {
      id: 2,
      title: "Detailed Proposal & Agreement",
      description:
        "Based on our strategic discussion, we craft a comprehensive, transparent proposal that clearly outlines our deliverables and commitments to your success. Once approved, we schedule your personalized onboarding call.",
      icon: <FaFileSignature className="text-xl" />,
      image: "/images/process-step-2.png",
    },
    {
      id: 3,
      title: "45-Minute Discovery Workshop",
      description:
        "Our highly efficient discovery process allows us to gather the precise technical and design requirements needed. This streamlined workshop ensures your bespoke website is perfectly aligned with your operational priorities.",
      icon: <FaPhoneAlt className="text-xl" />,
      image: "/images/process-step-3.png",
    },
    {
      id: 4,
      title: "Design Review & Refinement",
      description:
        "We present a high-fidelity mockup—including a stunning homepage and key internal pages—giving you a realistic preview of your new digital storefront. We collaborate with you through flexible revisions until the design is absolutely perfect.",
      icon: <FaPaintBrush className="text-xl" />,
      image: "/images/process-step-4.png",
    },
    {
      id: 5,
      title: "Launch & Ongoing Support",
      description:
        "Within 8-9 weeks of our discovery session, your custom-built website goes live. Beyond launch, we empower your team with comprehensive training, a rich knowledge base, and dedicated ongoing support to guarantee your long-term success.",
      icon: <FaRocket className="text-xl" />,
      image: "/images/process-step-5.png",
    },
  ];

  return (
    <section className="py-24 bg-white relative border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            It's so simple with our <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              5 step, 5 star process
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From our initial chat to launching your bespoke website, we make the
            entire journey effortless and transparent.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 md:-translate-x-1/2 hidden sm:block"></div>

          <div className="space-y-12">
            {steps.map((step, index) => {
              const isEven = index % 2 !== 0;
              return (
                <div key={step.id} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-blue-50 text-blue-600 shadow-xl z-10 hidden sm:flex">
                    {step.icon}
                  </div>

                  {/* Content Card */}
                  <div className={`w-full sm:pl-24 md:pl-0 md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                    <div className="bg-slate-50 rounded-3xl p-8 hover:bg-white hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-300 border border-slate-100 group">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black sm:hidden">
                          {step.id}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {step.id}. {step.title}
                        </h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Image Card */}
                  <div className={`hidden md:flex items-center w-full md:w-1/2 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
                    <div className="relative group overflow-hidden rounded-3xl shadow-lg border border-slate-100 w-full bg-white flex items-center justify-center aspect-[4/3] md:aspect-video">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
