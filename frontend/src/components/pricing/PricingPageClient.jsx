"use client";

import { useState } from "react";
import PricingHero from "./PricingHero";
import PricingTabs from "./PricingTabs";
import PricingTable from "./PricingTable";
import PricingPolicy from "./PricingPolicy";
import WebsiteForGarages from "./WebsiteForGarages";

export default function PricingPageClient() {
  const [activeTab, setActiveTab] = useState("GMS Price");

  return (
    <main className="bg-white min-h-screen">
      <PricingHero />
      <PricingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === "GMS Price" && (
        <>
          <PricingTable />
          <PricingPolicy />
        </>
      )}

      {activeTab === "Website for Garages" && (
        <WebsiteForGarages />
      )}

      {activeTab !== "GMS Price" && activeTab !== "Website for Garages" && (
        <section className="py-24 text-center">
          <h3 className="text-2xl font-bold text-gray-500">
            {activeTab} content coming soon.
          </h3>
        </section>
      )}
    </main>
  );
}
