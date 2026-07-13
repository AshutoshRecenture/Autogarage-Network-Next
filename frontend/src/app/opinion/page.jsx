import OpinionHero from "@/components/opinion/OpinionHero";
import OpinionGrid from "@/components/opinion/OpinionGrid";

export const metadata = {
  title: "Opinion | Auto Garage Network",
  description: "Read expert opinions, industry critiques, and thought leadership from automotive professionals.",
};

export default function OpinionPage() {
  return (
    <main>
      <OpinionHero />
      <OpinionGrid />
    </main>
  );
}
