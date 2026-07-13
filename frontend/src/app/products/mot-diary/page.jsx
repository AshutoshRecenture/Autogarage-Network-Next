import MotHero from "@/components/products/mot-diary/MotHero";
import MotFeatures from "@/components/products/mot-diary/MotFeatures";

export const metadata = {
  title: "MOT Diary | Auto Garage Network",
  description: "Avail Your Free Version Of MOT Diary Today. Benefit from our state-of-the-art MOT Diary system.",
};

export default function MotDiaryPage() {
  return (
    <main>
      <MotHero />
      <MotFeatures />
    </main>
  );
}
