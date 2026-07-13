import AboutHero from "@/components/about/AboutHero";
import AboutStatsAndStory from "@/components/about/AboutStatsAndStory";
import AboutFounderVideo from "@/components/about/AboutFounderVideo";
import AboutOfferings from "@/components/about/AboutOfferings";

export const metadata = {
  title: "About Us | Auto Garage Network",
  description: "Learn more about Auto Garage Network, our story, and our offerings.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStatsAndStory />
      <AboutFounderVideo />
      <AboutOfferings />
    </main>
  );
}
