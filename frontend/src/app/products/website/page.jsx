import WebsiteHero from "@/components/products/website/WebsiteHero";
import WebsiteContent from "@/components/products/website/WebsiteContent";
import WebsiteProcess from "@/components/products/website/WebsiteProcess";

export const metadata = {
  title: "Website for Garages | Auto Garage Network",
  description: "Get Your Free Garage Website Today. Take advantage of our state-of-the-art website design technology to establish your brand online.",
};

export default function WebsitePage() {
  return (
    <main>
      <WebsiteHero />
      <WebsiteProcess />
      <WebsiteContent />
    </main>
  );
}
