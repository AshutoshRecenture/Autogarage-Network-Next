import LatestWorkHero from "@/components/latest-work/LatestWorkHero";
import LatestWorkGrid from "@/components/latest-work/LatestWorkGrid";

export const metadata = {
  title: "Latest Work | Auto Garage Network",
  description: "View our latest portfolio of high-performing, professionally designed websites for independent garages.",
};

export default function LatestWorkPage() {
  return (
    <main>
      <LatestWorkHero />
      <LatestWorkGrid />
    </main>
  );
}
