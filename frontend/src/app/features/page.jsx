import FeaturesHero from "@/components/features/FeaturesHero";
import FeaturesGrid from "@/components/features/FeaturesGrid";

export const metadata = {
  title: "Features | Auto Garage Network",
  description: "Explore the comprehensive suite of high-tech features and integrations designed to give your auto garage a professional outlook.",
};

export default function FeaturesPage() {
  return (
    <main>
      <FeaturesHero />
      <FeaturesGrid />
    </main>
  );
}
