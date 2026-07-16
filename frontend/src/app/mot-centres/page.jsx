"use client";

import React from "react";
import Image from "next/image";

export default function MotCentresPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Top Banner with Background Image */}
      <section className="relative h-[200px] md:h-[250px] lg:h-[300px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mot_centres_banner.png"
            alt="MOT Centres Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Dark Overlay for text contrast without blue tint */}
        <div className="absolute inset-0 z-0 bg-black/50" />
        
        {/* Banner Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-widest uppercase shadow-sm">
            MOT Centres
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-[1300px] mx-auto px-6 py-16 md:py-20">
        
        {/* Intro */}
        <p className="text-[15px] md:text-[16px] leading-[1.8] text-slate-600 mb-12">
          Auto Garage Network is apparently inclined to serving the garages in the UK and therefore understand the value of MOT as being monumental. Therefore, we have a lot in store for MOT Centres to use to their advantage.
        </p>

        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-5">
            MOT services that raise the bar
          </h2>
          <p className="text-[15px] md:text-[16px] leading-[1.8] text-slate-600">
            With a thorough understanding of the varied needs coming from different clients, we bring you MOT Centres niche online MOT solutions:
          </p>
        </div>

        {/* Content Details & Image */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Column (Text) */}
            <div className="space-y-6 text-[15px] md:text-[16px] leading-[1.8] text-slate-600">
              
              <div className="space-y-6">
                <p>
                  <strong className="text-slate-800 font-bold">
                    Access to extensive MOT Data
                  </strong>{" "}
                  – Auto Garage Network serves as a unified analytic platform for any information under the sun, on MOT. It offers precise lookup of VRM (vehicle registration mark), vehicle manufactures, model, and make, previous MOT records including the issues that were found and resolved, next scheduled MOT test date, and more.
                </p>

                <p>
                  <strong className="text-slate-800 font-bold">
                    Online MOT Booking
                  </strong>{" "}
                  - Customers love the ease of online processing, and we love it when you can boast of a happy client base. Online booking not only saves them time but also makes advance booking possible. Not only this, utilising our in-house product MOT Diary, you can make the most of SMS reminder campaign and promotional SMS to offer your clients unmatched hospitality and service.
                </p>

                <p>
                  <strong className="text-slate-800 font-bold">
                    Readily available customer data and easy contact
                  </strong>{" "}
                  - Record keeping could have never been more organised than what Auto Garage Network has to offer. Other than access to DVLA data, the list of your garage visitors is also updated in real time, making customer contacting absolutely effortless. Campaigns such as SMS reminder and easy registration look-up for vehicles rely entirely on this feature.
                </p>
              </div>

              <p className="pt-4 font-semibold text-slate-800">
                Enrol your MOT Centre for a Free Demo, or simply call us with any queries. We shall be happy to help!
              </p>
            </div>

            {/* Right Column (Image) */}
            <div className="relative w-full rounded-lg overflow-hidden shadow-xl shadow-slate-200/50 bg-white group">
              <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[600px]">
                <Image
                  src="/images/mot-center.png"
                  alt="MOT Centres Storefront"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
