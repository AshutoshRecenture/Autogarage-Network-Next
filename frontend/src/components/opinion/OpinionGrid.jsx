"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaUserCircle, FaTimes } from "react-icons/fa";

export default function OpinionGrid() {
  const [selectedOpinion, setSelectedOpinion] = useState(null);

  const opinions = [
    {
      id: 1,
      image: "/images/images (1).jpg",
      title: "Wallsend Garage Ditches Outdated Systems for Modern Diagnostics",
      excerpt: "In my view, clinging to legacy diagnostic methods is the fastest way to lose market share. Here is why the modern mechanic must become a data analyst first.",
      author: "Industry Analyst",
      date: "Nov 12, 2026"
    },
    {
      id: 2,
      image: "/images/images (2).jpg",
      title: "The race to the bottom: Why underpricing your labor hour is toxic",
      excerpt: "Independent garages are notoriously bad at pricing their expertise. It's time we stop apologizing for our rates and start commanding the respect our technical skills deserve.",
      author: "Senior Editor",
      date: "Nov 05, 2026"
    },
    {
      id: 3,
      image: "/images/images (3).jpg",
      title: "Generic websites are killing your brand's credibility. Here's why.",
      excerpt: "If your garage's website looks like it was built in 2010 using a cookie-cutter template, you are actively driving high-value customers straight into the arms of the main dealers.",
      author: "Digital Strategist",
      date: "Oct 28, 2026"
    },
    {
      id: 4,
      image: "/images/workshop-management-software-1000x436.jpg",
      title: "Paper diaries belong in a museum, not your front desk",
      excerpt: "The romanticism of the grease-stained paper diary is over. Relying on pen and paper in 2026 isn't 'old school cool'—it's gross negligence of your business's potential.",
      author: "Tech Columnist",
      date: "Oct 20, 2026"
    },
    {
      id: 5,
      image: "/images/international-enters-into-tyre-software-600x300.jpg",
      title: "Stop blaming the customer for 'no-shows'",
      excerpt: "If a customer forgets their MOT appointment, it's not their fault—it's your flawed communication strategy. Automated reminders are the only acceptable standard.",
      author: "Customer Success Lead",
      date: "Oct 15, 2026"
    },
    {
      id: 6,
      image: "/images/images.jpg",
      title: "The EV revolution is a goldmine, but only if you drop the skepticism",
      excerpt: "Too many mechanics are burying their heads in the sand regarding electric vehicles. The transition isn't a threat; it's the biggest profit opportunity of this decade.",
      author: "EV Specialist",
      date: "Oct 08, 2026"
    },
    {
      id: 7,
      image: "/images/auto_garage_network_ltd_cover.jpg",
      title: "Why fragmentation is the independent sector's greatest weakness",
      excerpt: "Until independent garages standardize their operational software, they will never truly compete with the logistical efficiency of corporate dealer networks.",
      author: "Guest Contributor",
      date: "Oct 01, 2026"
    },
    {
      id: 8,
      image: "/images/event05.webp",
      title: "Are trade shows becoming obsolete echo chambers?",
      excerpt: "After attending yet another tech symposium, I'm left wondering if we are actually innovating, or just selling the same software dressed up in different UI.",
      author: "Industry Critic",
      date: "Sep 25, 2026"
    },
    {
      id: 9,
      image: "/images/lee.png",
      title: "The myth of 'customer loyalty' in the digital age",
      excerpt: "Customer loyalty doesn't exist anymore. Convenience has replaced loyalty. If your booking process isn't frictionless, they will go to the garage down the street.",
      author: "Lee, Strategy Director",
      date: "Sep 18, 2026"
    },
    {
      id: 10,
      image: "/images/mark.png",
      title: "Stop focusing on car counts and start focusing on profit per bay",
      excerpt: "The obsession with getting as many cars through the door as possible is a flawed metric. Efficiency and high-margin work trump sheer volume every single time.",
      author: "Mark, Operations Expert",
      date: "Sep 11, 2026"
    },
    {
      id: 11,
      image: "/images/portfolio-1.png",
      title: "Your homepage is your digital reception desk—treat it like one",
      excerpt: "You wouldn't let your physical reception area look dirty and unorganized. Why do you let your website's homepage look exactly like that?",
      author: "Design Lead",
      date: "Sep 04, 2026"
    }
  ];

  return (
    <section className="bg-slate-50 py-20 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opinions.map((opinion) => (
            <div 
              key={opinion.id} 
              className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => setSelectedOpinion(opinion)}
            >
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-200">
                <img 
                  src={opinion.image} 
                  alt={opinion.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow relative">
                
                <h3 className="text-[22px] font-bold text-slate-900 leading-tight mb-4 group-hover:text-[#1EA1F1] transition-colors">
                  {opinion.title}
                </h3>
                
                <p className="text-slate-600 text-[15px] leading-relaxed mb-8 flex-grow">
                  {opinion.excerpt}
                </p>
                
                {/* Footer divider */}
                <div className="w-full h-[1px] bg-slate-100 mb-5"></div>

                {/* Author & Date */}
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <FaUserCircle className="text-slate-300 text-xl" />
                    <span className="font-medium">by {opinion.author}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-16 flex justify-center">
          <button className="bg-white border-2 border-[#1EA1F1] text-[#1EA1F1] hover:bg-[#1EA1F1] hover:text-white font-bold py-3 px-10 rounded-full transition-colors shadow-sm">
            Load More Opinions
          </button>
        </div>

      </div>

      {/* Opinion Modal */}
      {selectedOpinion && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedOpinion(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center transition-colors z-10"
              onClick={() => setSelectedOpinion(null)}
            >
              <FaTimes className="text-white text-lg" />
            </button>
            
            {/* Header Image */}
            <div className="w-full h-[40vh] md:h-[50vh] relative bg-slate-900 flex items-center justify-center overflow-hidden">
              <img 
                src={selectedOpinion.image} 
                alt={selectedOpinion.title} 
                className="w-full h-full object-contain" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Modal Content */}
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 text-slate-500 mb-6 font-medium">
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-xl text-[#1EA1F1]" />
                  <span>by {selectedOpinion.author}</span>
                </div>
                <span className="text-slate-300">•</span>
                <span>{selectedOpinion.date}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                {selectedOpinion.title}
              </h2>
              
              <div className="prose prose-lg max-w-none text-slate-600">
                <p className="text-xl text-slate-700 font-medium leading-relaxed mb-6">
                  {selectedOpinion.excerpt}
                </p>
                <p>
                  As the automotive landscape rapidly evolves, the opinions expressed here reflect a necessary paradigm shift. The days of operating on pure intuition are gone; the data tells the real story.
                </p>
                <p className="mt-4">
                  We invite our readers to challenge these perspectives and join the conversation. Are we pushing the boundaries of what's possible, or are we missing the fundamental principles that built this industry? The debate continues.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
