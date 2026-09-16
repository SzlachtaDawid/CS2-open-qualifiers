import AboutUs from "./_components/mainPage/aboutUs/AboutUs";
import { Hero } from "./_components/mainPage/hero/Hero";
import Prizes from "./_components/mainPage/prizes/Prizes";
import Venue from "./_components/mainPage/venue/Venue";
import Gallery from "./_components/mainPage/gallery/Gallery";
import Join from "./_components/mainPage/join/Join";
import { ScrollButton } from "./_components/buttons/ScrollButton";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <AboutUs />
      <Prizes />
      <Venue />
      <Gallery />
      <Join />
      <ScrollButton />
    </main>
  );
}
