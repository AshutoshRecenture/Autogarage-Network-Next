import BlogHero from "@/components/blog/BlogHero";
import BlogList from "@/components/blog/BlogList";

export const metadata = {
  title: "Blog | Auto Garage Network",
  description: "Latest insights, industry news, and software updates for independent auto garages.",
};

export default function BlogPage() {
  return (
    <main>
      <BlogHero />
      <BlogList />
    </main>
  );
}
