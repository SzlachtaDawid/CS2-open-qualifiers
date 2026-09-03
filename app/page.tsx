import AboutUs from "./_components/aboutUs/AboutUs";
import { Hero } from "./_components/hero/Hero";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <AboutUs />
    </main>
  );
}
