"use client";

import Image from "next/image";
import { FaLaptopCode, FaChartLine, FaCheckCircle, FaUsers, FaTools } from "react-icons/fa";

export default function WebsiteContent() {
  const offerings = [
    {
      title: "Customer-Oriented Design",
      description: "Intuitive, responsive user interfaces that make it easy for customers to access your services with just a few clicks."
    },
    {
      title: "Increased Traffic & Sales",
      description: "Unique designs, social media integration, and multi-browser compatibility to drive customer engagement and conversions."
    },
    {
      title: "Flexible & Customised Solutions",
      description: "Tailored to your garage's unique needs, offering services like MOT booking, car servicing, diagnostics, and tyre purchases."
    },
    {
      title: "Enhanced User Experience",
      description: "A smooth and satisfying browsing experience that keeps customers coming back."
    }
  ];

  return (
    <section id="details" className="py-24 bg-slate-50 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Intro Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">We at Auto Garage Network</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            At Auto Garage Network, we specialise in developing personalised e-commerce websites tailored to meet the unique needs of garages. With years of experience and a deep understanding of the automotive market, our team creates solutions that help your business thrive online.
          </p>
        </div>

        {/* Main Content & Image Split */}
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Text Content */}
          <div className="flex-1 space-y-16">
            
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <FaLaptopCode className="text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Why Go Online?</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Managing the diverse aspects of a garage—servicing, diagnostics, tyre sales, alignment services, and more—can quickly become complex. That's why we're here to simplify it all.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our digital transformation solutions equip you with a complete, centralised database system to synchronise all your operations. From inventory management and service records to product pricing and revenue tracking, everything is owner-controlled, ensuring data security and seamless operations.
              </p>
              <p className="text-slate-600 leading-relaxed">
                With our help, your garage can become more efficient, secure, and hassle-free, giving you the freedom to focus on growing your business.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <FaChartLine className="text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Why Choose Us?</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                At Auto Garage Network, your website isn't just another URL—it's a powerful marketing tool that shapes your brand reputation. Our dedicated team of developers, analysts, designers, and writers uses cutting-edge methods to deliver a garage website that exceeds your expectations with a quick turnaround.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                  <FaTools className="text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">What We Offer</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offerings.map((offer, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-blue-200 transition-colors">
                    <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                      <FaCheckCircle className="text-blue-500 mt-1 shrink-0" />
                      {offer.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed pl-6">{offer.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-600 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                <FaUsers className="text-blue-200" /> Our Commitment
              </h3>
              <p className="text-blue-50 leading-relaxed mb-4 text-[15px] md:text-base">
                We craft impactful, tailored websites designed to elevate your garage's digital presence. Our solutions empower you to scale your operations, build a formidable brand reputation, and foster long-term customer loyalty.
              </p>
              <p className="text-blue-100 font-medium mb-6 text-[15px] md:text-base">
                Benefit from industry-leading web design at cost-effective rates—tailored exactly to your unique requirements.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <p className="font-bold mb-1">Get Started</p>
                <p className="text-sm text-blue-100 leading-relaxed">
                  Reach out to us at <a href="mailto:info@autogaragenetwork.com" className="text-white font-semibold underline hover:text-blue-200 transition-colors">info@autogaragenetwork.com</a> to discuss your vision. Our team will promptly provide a customized, competitive quote tailored to your goals.
                </p>
              </div>
            </div>

          </div>

          {/* Right Image Content - Sticky */}
          <div className="w-full lg:w-[600px] shrink-0 lg:sticky lg:top-32">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2.5rem] opacity-20 group-hover:opacity-30 blur-lg transition duration-500"></div>
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <div className="h-12 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="mx-auto w-1/2 h-6 bg-white rounded-md border border-slate-200"></div>
                </div>
                <div className="relative h-auto w-full group-hover:scale-[1.02] transition-transform duration-500">
                  <Image 
                    src="/images/website-for-garages.png" 
                    alt="Garage Website Interface Mockup"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce hover:animate-none">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black text-xl">
                  1#
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rated</p>
                  <p className="font-bold text-slate-800">Garage Websites</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
