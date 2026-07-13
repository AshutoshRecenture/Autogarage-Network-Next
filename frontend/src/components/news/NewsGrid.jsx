"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaUserCircle, FaTimes } from "react-icons/fa";

export default function NewsGrid() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const articles = [
    {
      id: 1,
      image: "/images/images (1).jpg",
      title: "Tudor Car Services adapts to modern booking behaviors with new digital suite",
      excerpt: "Discover how one of the region's leading independent garages completely transformed its operations to accommodate the modern driver's digital booking preferences.",
      author: "Autotech Communications",
      date: "Oct 24, 2026"
    },
    {
      id: 2,
      image: "/images/images (2).jpg",
      title: "'We only want the right work': Inside Lea Motors' strategy to filter out low-value jobs",
      excerpt: "A deep dive into how Lea Motors utilized smart data filtering and targeted digital presence to attract high-margin diagnostic work and phase out unprofitable jobs.",
      author: "Autotech Communications",
      date: "Oct 18, 2026"
    },
    {
      id: 3,
      image: "/images/images (3).jpg",
      title: "Generic websites under fire as independent garages demand tangible ROI",
      excerpt: "Industry leaders are speaking out against 'cookie-cutter' garage websites that fail to convert traffic into actual ramp bookings and verifiable revenue.",
      author: "Autotech Communications",
      date: "Oct 12, 2026"
    },
    {
      id: 4,
      image: "/images/workshop-management-software-1000x436.jpg",
      title: "The rise of cloud-based management: A paradigm shift in workshop efficiency",
      excerpt: "Paper diaries are officially a thing of the past. New data reveals that garages adopting cloud-based management systems see a 40% increase in daily throughput.",
      author: "Autotech Communications",
      date: "Oct 05, 2026"
    },
    {
      id: 5,
      image: "/images/international-enters-into-tyre-software-600x300.jpg",
      title: "How proactive MOT reminders are solving the 'no-show' epidemic",
      excerpt: "An exclusive look at how automated SMS and email reminders are practically eliminating missed appointments across the UK's busiest testing centers.",
      author: "Autotech Communications",
      date: "Sep 29, 2026"
    },
    {
      id: 6,
      image: "/images/images.jpg",
      title: "Navigating the EV transition: Is your garage's online presence ready?",
      excerpt: "As electric vehicle adoption accelerates, we explore how forward-thinking garages are repositioning their online brands to capture the lucrative EV servicing market.",
      author: "Autotech Communications",
    },
    {
      id: 7,
      image: "/images/auto_garage_network_ltd_cover.jpg",
      title: "Auto Garage Network Ltd Unveils New Cover Story on Industry Disruption",
      excerpt: "Our latest feature explores how Auto Garage Network is pushing the boundaries of what independent garages can achieve with integrated digital tooling.",
      author: "Editor in Chief",
      date: "Sep 15, 2026"
    },
    {
      id: 8,
      image: "/images/event05.webp",
      title: "Key Takeaways from the Annual Automotive Tech Symposium",
      excerpt: "We attended the largest gathering of automotive software innovators. Here are the most critical trends you need to implement in your garage before Q4.",
      author: "Event Coverage Team",
      date: "Sep 10, 2026"
    },
    {
      id: 9,
      image: "/images/lee.png",
      title: "Spotlight: Lee discusses the future of digital client retention",
      excerpt: "In an exclusive interview, Lee breaks down the psychology of the modern consumer and why automated communication is no longer just an optional luxury.",
      author: "Staff Writer",
      date: "Sep 02, 2026"
    },
    {
      id: 10,
      image: "/images/mark.png",
      title: "Expert Insights: Mark shares top 3 metrics every garage must track",
      excerpt: "Mark's latest deep dive reveals the three specific data points that separate wildly profitable garages from those struggling to keep the lights on.",
      author: "Staff Writer",
      date: "Aug 28, 2026"
    },
    {
      id: 11,
      image: "/images/portfolio-1.png",
      title: "Case Study: Achieving a 300% ROI with custom web architecture",
      excerpt: "A comprehensive look at our latest portfolio addition, showcasing how bespoke web architecture directly drove a record-breaking month in bookings.",
      author: "Autotech Communications",
      date: "Aug 15, 2026"
    }
  ];

  return (
    <section className="bg-slate-50 py-20 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-200">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow relative">
                
                <h3 className="text-[22px] font-bold text-slate-900 leading-tight mb-4 group-hover:text-[#1EA1F1] transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-slate-600 text-[15px] leading-relaxed mb-8 flex-grow">
                  {article.excerpt}
                </p>
                
                {/* Footer divider */}
                <div className="w-full h-[1px] bg-slate-100 mb-5"></div>

                {/* Author & Date */}
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <FaUserCircle className="text-slate-300 text-xl" />
                    <span className="font-medium">by {article.author}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-16 flex justify-center">
          <button className="bg-white border-2 border-[#1EA1F1] text-[#1EA1F1] hover:bg-[#1EA1F1] hover:text-white font-bold py-3 px-10 rounded-full transition-colors shadow-sm">
            Load More Articles
          </button>
        </div>

      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center transition-colors z-10"
              onClick={() => setSelectedArticle(null)}
            >
              <FaTimes className="text-white text-lg" />
            </button>
            
            {/* Header Image */}
            <div className="w-full h-[40vh] md:h-[50vh] relative bg-slate-900 flex items-center justify-center overflow-hidden">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                className="w-full h-full object-contain" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Modal Content */}
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 text-slate-500 mb-6 font-medium">
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-xl text-[#1EA1F1]" />
                  <span>by {selectedArticle.author}</span>
                </div>
                <span className="text-slate-300">•</span>
                <span>{selectedArticle.date}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                {selectedArticle.title}
              </h2>
              
              <div className="prose prose-lg max-w-none text-slate-600">
                <p className="text-xl text-slate-700 font-medium leading-relaxed mb-6">
                  {selectedArticle.excerpt}
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="mt-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
