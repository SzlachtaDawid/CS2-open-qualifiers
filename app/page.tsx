import { AboutUs } from "@/app/components/mainPage/aboutUs/AboutUs";
import { Hero } from "@/app/components/mainPage/hero/Hero";
import { Prizes } from "@/app/components/mainPage/prizes/Prizes";
import { Venue } from "@/app/components/mainPage/venue/Venue";
import { Gallery } from "@/app/components/mainPage/gallery/Gallery";
import { Join } from "@/app/components/mainPage/join/Join";
import { ScrollButton } from "@/app/components/buttons/ScrollButton";

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
