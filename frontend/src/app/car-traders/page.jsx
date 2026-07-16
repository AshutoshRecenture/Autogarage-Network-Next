"use client";

import React from "react";
import Image from "next/image";

export default function CarTradersPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Top Banner with Background Image */}
      <section className="relative h-[200px] md:h-[250px] lg:h-[300px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/car_traders_banner.png"
            alt="Car Traders Background"
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
            Car Traders
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-[1300px] mx-auto px-6 py-16 md:py-20">
        {/* Intro */}
        <p className="text-[15px] md:text-[16px] leading-[1.8] text-slate-600 mb-12">
          Auto Garage Network is an all-in-one garage management system and a
          dream tool for car traders that find it difficult to manage their
          multi-locational businesses.
        </p>

        {/* Boons */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-5">
            Car Traders&#39; Boons
          </h2>
          <p className="text-[15px] md:text-[16px] leading-[1.8] text-slate-600">
            The boom in the automotive industry has escalated the car trading
            business and Auto Garage Network is thoroughly indulged in making
            the involved workflow seamless. We bring all you car tradesmen the
            following boons:
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
                    Integrated system with an analytics dashboard
                  </strong>{" "}
                  - An integrated scheduling system allows you to easily track
                  all appointments. With an impressive analytics dashboard, Auto
                  Garage Network lets you create metrics such as daily purchase
                  interests, tickets issued for trades in process, trades
                  completed, print executive invoices, and more, specific to
                  your car trading needs.
                </p>

                <p>
                  <strong className="text-slate-800 font-bold">
                    Easy to use intuitive interface
                  </strong>{" "}
                  - An intuitive interface helps streamline technician workflow
                  which boosts overall efficiency. Automated online car/tyre
                  booking attracts more clients for the ease of accessing and
                  the services.
                </p>

                <p>
                  <strong className="text-slate-800 font-bold">
                    Quick look at the progress status
                  </strong>{" "}
                  - All trade activities are updated in real time which lets you
                  take a glance at the progress status at any given time. When a
                  car/car part is ready, the dashboard notifies all concerning
                  technicians such that everyone in the trade shop is on the
                  same page. The status feature can be customised to be visible
                  even to the customers, if you desire, to prompt transparency
                  and thus trust with clients.
                </p>

                <p>
                  <strong className="text-slate-800 font-bold">
                    Track car/user history
                  </strong>{" "}
                  - We lend you the ease of tracking the users&#39; service
                  history and also the vehicles&#39; particulars from its
                  manufacture to know the exact status of the vehicle to be
                  traded or serviced.
                </p>

                <p>
                  <strong className="text-slate-800 font-bold">
                    Custom enabled features
                  </strong>{" "}
                  - All the above-stated features are custom-enabled at your
                  disposal. Meaning, you may opt to omit the online booking
                  feature, or, on the contrary, may choose to activate the
                  feature to filter specific tyre selection while also allowing
                  the online booking.
                </p>
              </div>

              <p className="pt-4 border-t border-slate-100">
                Auto Garage Network is an all-in-one garage management system
                and a dream tool for car traders that find it difficult to
                manage their multi-locational businesses.
              </p>
            </div>

            {/* Right Column (Image) */}
            <div className="relative w-full rounded-lg overflow-hidden shadow-xl shadow-slate-200/50 bg-white group">
              <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[600px]">
                <Image
                  src="/images/car_traders.png"
                  alt="Car Traders Boons"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
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
