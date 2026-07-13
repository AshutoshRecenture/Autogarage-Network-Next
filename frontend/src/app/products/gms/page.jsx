import GmsHero from "@/components/products/gms/GmsHero";
import GmsFeatures from "@/components/products/gms/GmsFeatures";

export const metadata = {
  title: "Garage Management System | Auto Garage Network",
  description: "Explore the Features of AGN’s Garage Management System for Excellent Tyre Fitting, MOT & Repair Garages.",
};

export default function GmsPage() {
  return (
    <main>
      <GmsHero />
      <GmsFeatures />
    </main>
  );
}
