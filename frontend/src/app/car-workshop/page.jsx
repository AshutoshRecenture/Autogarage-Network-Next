"use client";

import React from "react";
import Image from "next/image";

export default function CarWorkshopPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Top Banner with Background Image */}
      <section className="relative h-[200px] md:h-[250px] lg:h-[300px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/car_workshop_banner_new.png"
            alt="Garages Background"
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
            Car WorkShop
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-[1300px] mx-auto px-6 py-16 md:py-20">
        
        {/* Intro */}
        <p className="text-[15px] md:text-[16px] leading-[1.8] text-slate-600 mb-12">
          Auto Garage Network brings garage owners the opportunity of owning a
          powerful, high-functionality website that fully digitalises car
          servicing and streamlines garage management. The website we offer is
          modern and yet boasts of a user-friendly interface, rendering it
          absolutely easy to learn for anyone, be it technically-sound
          individuals or laymen. Its highly-customisable feature further adds to
          its ease-of-use.
        </p>

        {/* Characteristics */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-5">
            Characteristics That Are Unbeatable Together
          </h2>
          <p className="text-[15px] md:text-[16px] leading-[1.8] text-slate-600">
            Auto Garage Network has its major characteristics comprising of easy
            sign-up, user-friendly console that is highly customisable, customer
            data and easy contact, registration look-up for vehicles, ramp
            configuration and workshop management, smooth sales management, daily
            work analysis, precision inventory control and stock management,
            accurate accounts management and depreciation management, evaluating
            VAT returns and a lot more.
          </p>
        </div>

        {/* Performance & Promise */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">
            Our Performance, Our Promise
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Column (Text) */}
            <div className="space-y-6 text-[15px] md:text-[16px] leading-[1.8] text-slate-600">
              <p>
                Using Auto Garage Network guarantees you performance like no other
                garage management tool. We know we deliver and hence we
                confidently give our word for it. For this reason, we have earned
                the trust of a wide clientele, and the number is still on the
                rise.
              </p>

              <p>
                Listed below are the perks of incorporating the Auto Garage
                Network
              </p>

              <div className="space-y-5">
                <p>
                  <strong className="text-slate-800 font-bold">
                    Simplified garage management
                  </strong>{" "}
                  – Since everything is accessible and modifiable through a master
                  console, managing every process from vehicle record to accounts
                  management is a piece of cake!
                </p>

                <p>
                  <strong className="text-slate-800 font-bold">
                    Saved time
                  </strong>{" "}
                  – Simplified management consequentially saves you time like you
                  could have never imagined.
                </p>

                <p>
                  <strong className="text-slate-800 font-bold">
                    Increased efficiency
                  </strong>{" "}
                  – Streamlined processes of garage activities as well as data
                  management.
                </p>

                <p>
                  <strong className="text-slate-800 font-bold">
                    Increased visibility
                  </strong>{" "}
                  – A website, for any business, is a doorway to the present
                  itself to the rest of the world. And nobody does it better than
                  us for Garages. Our function focused content aptly positions you
                  in the market so that you are visible to a wider, more relevant
                  audience, appearing high on search engines such as Google.
                </p>
              </div>
            </div>

            {/* Right Column (Image) */}
            <div className="relative w-full rounded-lg overflow-hidden shadow-xl shadow-slate-200/50 bg-white group">
              <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[600px]">
                <Image
                  src="/images/garage_image.jpg"
                  alt="Garage Management Software Interface"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
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
