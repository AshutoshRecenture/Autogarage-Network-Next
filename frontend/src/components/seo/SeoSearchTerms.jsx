import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

const SeoSearchTerms = () => {
  const searchTerms = [
    { query: "Mobile Tyre Fitting near me", location: "Local Area" },
    { query: "MOT Test Centre [City Name]", location: "City/Town" },
    { query: "Car Servicing Specialists", location: "Regional" },
    { query: "Cheap Tyres [City Name]", location: "City/Town" },
    { query: "Clutch Repair Garage", location: "Local Area" },
    { query: "Brake Pad Replacement near me", location: "Local Area" }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-xs bg-blue-50 px-3 py-1 rounded-full mb-4 inline-block">
            Test Our Results
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            See the Proof on Page 1
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            We don't just promise results; we deliver them. Try searching these highly competitive terms on Google and see our clients dominating the top 3 spots.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {searchTerms.map((term, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <FaSearch size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-[15px]">{term.query}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <FaMapMarkerAlt size={10} className="text-red-400" />
                    <span>{term.location}</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded flex items-center gap-1.5">
                  <FaCheckCircle size={10} /> Top 3 Ranking
                </span>
                <span className="text-xs text-slate-400">Try it now</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SeoSearchTerms;
