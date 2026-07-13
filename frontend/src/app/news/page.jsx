import NewsHero from "@/components/news/NewsHero";
import NewsGrid from "@/components/news/NewsGrid";

export const metadata = {
  title: "News & Insights | Auto Garage Network",
  description: "Read the latest news and insights from Auto Garage Network. Discover how independent garages are transforming their digital strategies.",
};

export default function NewsPage() {
  return (
    <main>
      <NewsHero />
      <NewsGrid />
    </main>
  );
}
