import React from 'react';
import { FaChartLine, FaCarSide, FaMapMarkedAlt, FaWrench } from 'react-icons/fa';

const SeoBenefits = () => {
  const benefits = [
    {
      icon: <FaMapMarkedAlt size={28} />,
      title: "Dominate Local Search",
      desc: "When a driver searches 'garage near me' or 'tyres [your town]', your garage needs to be the first one they see. We optimize your Google Business Profile to capture local traffic."
    },
    {
      icon: <FaCarSide size={28} />,
      title: "Outrank National Chains",
      desc: "Stop losing customers to Kwik Fit and Halfords. We level the playing field by targeting highly specific keywords that bring local drivers directly to your door."
    },
    {
      icon: <FaWrench size={28} />,
      title: "Drive High-Margin Bookings",
      desc: "We don't just drive traffic; we drive the right kind of traffic. By focusing on MOTs, Servicing, and Tyres, we ensure the visitors you get actually convert into paying customers."
    },
    {
      icon: <FaChartLine size={28} />,
      title: "Measurable ROI",
      desc: "No smoke and mirrors. We provide clear, transparent reporting so you can see exactly how many calls, clicks, and bookings our SEO campaign is generating for your business."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div>
          <span className="text-blue-600 font-bold uppercase tracking-wider text-xs bg-blue-50 px-3 py-1 rounded-full mb-6 inline-block">
            Why Automotive SEO?
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
            Stop Relying on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Passing Trade</span>
          </h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            The automotive industry has changed. Today, <strong>over 80% of drivers</strong> search online when their check engine light comes on, or when they need a quick tyre replacement. 
          </p>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            If your garage isn't ranking on the first page of Google, you are handing those high-intent customers directly to your competitors. Auto Garage Network specializes exclusively in the automotive sector, meaning we already know exactly what your customers are searching for.
          </p>

          <div className="flex gap-4">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex-1 text-center">
              <h4 className="text-4xl font-extrabold text-blue-600 mb-2">80%</h4>
              <p className="text-sm font-semibold text-slate-700">Drivers Search Online</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex-1 text-center">
              <h4 className="text-4xl font-extrabold text-blue-600 mb-2">#1</h4>
              <p className="text-sm font-semibold text-slate-700">Automotive SEO Agency</p>
            </div>
          </div>
        </div>

        {/* Right Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(30,161,241,0.1)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SeoBenefits;
