import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const SeoCTA = () => {
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background styling elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

      <div className="max-w-[1000px] mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          Ready to dominate your <br className="hidden md:block" /> local area?
        </h2>
        <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Get in touch with Auto Garage Network today for a free SEO audit. We'll show you exactly where your garage currently stands and how we can get you to the top.
        </p>
        <Link 
          href="/contact-us"
          className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors duration-300 shadow-lg shadow-blue-600/30"
        >
          Request Your Free SEO Audit
          <FaArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default SeoCTA;
