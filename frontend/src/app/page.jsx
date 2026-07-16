import Hero from "@/components/home/Hero";
import SoftwareOverview from "@/components/home/SoftwareOverview";
import WhatWeDoFeatures from "@/components/home/WhatWeDoFeatures";
import Testimonials from "@/components/home/Testimonials";
import Process from "@/components/home/Process";
import SoftwareDetails from "@/components/home/SoftwareDetails";
import Integrations from "@/components/home/Integrations";
import PremiumFeatures from "@/components/home/PremiumFeatures";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FaqSection from "@/components/home/FaqSection";
import Blog from "@/components/home/Blog";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeDoFeatures />
      <Process />
      <SoftwareOverview />
      <SoftwareDetails />
      <Testimonials />
      <Integrations />
      <PremiumFeatures />
      <WhyChooseUs />
      <FaqSection />
    </main>
  );
}