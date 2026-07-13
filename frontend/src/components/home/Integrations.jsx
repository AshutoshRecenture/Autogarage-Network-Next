import React from 'react';

const integrations = [
  { name: 'TecRMI Inside', src: '/images/tecrml.webp' },
  { name: 'Automated Reminders', src: '/images/automated-reminders.webp' },
  { name: 'Courtesy Vehicles', src: '/images/courtesy-vehicles.webp' },
  { name: 'Calendar', src: '/images/calendar.webp' },
  { name: 'Customer Management', src: '/images/customer-management.webp' },
  { name: 'Customer Portal', src: '/images/customer-portal.webp' },
  { name: 'Autodata Integration', src: '/images/solera-autodata.webp' },
  { name: 'GSF Integration', src: '/images/gsf-car-parts.webp' },
  { name: 'Partslink24 Integration', src: '/images/partslink24.webp' },
  { name: 'MOT Expiry Lookup', src: '/images/mot.webp' },
  { name: 'Multi-Site Garage Management System', src: '/images/multi-site-garage-management-system.webp' },
  { name: 'Parts Sales', src: '/images/parts-sale.webp' },
  { name: 'Personnel Management', src: '/images/personnel-management.webp' },
  { name: 'Purchase Orders', src: '/images/purchase-orders.webp' },
  { name: 'Quickbooks Integration', src: '/images/quickbooks.webp' },
  { name: 'Sage Integration', src: '/images/sage.webp' },
];

const row1 = integrations.slice(0, 8);
const row2 = integrations.slice(8, 16);

// Duplicate 4 times to ensure it covers even ultra-wide screens seamlessly
const row1Track = [...row1, ...row1, ...row1, ...row1];
const row2Track = [...row2, ...row2, ...row2, ...row2];

export default function Integrations() {
  return (
    <section className="py-16 bg-slate-50 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        .animate-scroll-left:hover, .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Garage Management System Features
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            All the tools and features you need to run your workshop
          </p>
        </div>
      </div>
      
      {/* Gradients for smooth fading edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

      <div className="flex flex-col gap-6 relative z-0">
        {/* Row 1 - Scrolls Left */}
        <div className="w-full relative">
          <div className="flex w-max animate-scroll-left">
            {row1Track.map((item, index) => (
              <div key={index} className="flex-none w-48 sm:w-60 px-3">
                <div className="bg-white rounded-[24px] p-6 h-full flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="h-14 sm:h-16 mb-4 flex items-center justify-center w-full">
                    <img 
                      src={item.src} 
                      alt={item.name}
                      className="max-h-full max-w-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-[13px] md:text-[14px] font-bold text-slate-800 leading-tight">
                    {item.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Scrolls Right */}
        <div className="w-full relative">
          <div className="flex w-max animate-scroll-right">
            {row2Track.map((item, index) => (
              <div key={index} className="flex-none w-48 sm:w-60 px-3">
                <div className="bg-white rounded-[24px] p-6 h-full flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="h-14 sm:h-16 mb-4 flex items-center justify-center w-full">
                    <img 
                      src={item.src} 
                      alt={item.name}
                      className="max-h-full max-w-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-[13px] md:text-[14px] font-bold text-slate-800 leading-tight">
                    {item.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
