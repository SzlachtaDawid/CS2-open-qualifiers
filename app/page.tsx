import { AboutUs } from "@/app/components/mainPage/AboutUs/AboutUs";
import { Hero } from "@/app/components/mainPage/Hero/Hero";
import { Prizes } from "@/app/components/mainPage/Prizes/Prizes";
import { Venue } from "@/app/components/mainPage/Venue/Venue";
import { Gallery } from "@/app/components/mainPage/Gallery/Gallery";
import { Join } from "@/app/components/mainPage/Join/Join";
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
