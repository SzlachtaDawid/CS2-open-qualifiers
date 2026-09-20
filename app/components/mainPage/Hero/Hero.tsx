import { Button } from "@/app/components/buttons/Button";
import { Faces } from "./Faces";
import { Describe } from "@/app/components/copy/Describe";
import { SectionFade } from "@/app/components/SectionFade/SectionFade";
import { Header } from "./Header";
import { ImageCell } from "@/app/components/ImageCell/ImageCell";

const ABOUT_ANCHOR = "#about";
const BAIL_OUT_URL = "https://www.youtube.com";

export function Hero() {
  return (
    <div className="relative">
      <div className="relative z-3 flex min-h-dvh flex-col justify-center p-8">
        <Header />
        <Describe copy="128 teams, one bracket. Thirteen rounds take the map, two maps take the series. Win seven times and the trophy is yours." />
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-8">
          <Button text="Let’s do this!" variant="ct" href={ABOUT_ANCHOR} />
          <Button text="I’m chickening out." variant="tt" href={BAIL_OUT_URL} />
          <div>
            <h2 className="mb-4 text-center text-xl md:text-2xl">Sponsors</h2>
            <div className="flex gap-4">
              <ImageCell alt="Falcons logo" src="/images/falcons.webp" copy="Falcons" />
              <ImageCell alt="Faze logo" src="/images/faze.webp" copy="Faze" />
              <ImageCell alt="Vitality logo" src="/images/vitality.webp" copy="Vitality" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <Faces />
      </div>

      {/* Readability layer: above the faces (z-2), below the content (z-3) */}
      <div className="pointer-events-none absolute inset-0 z-2 bg-black/55 md:bg-black/20" aria-hidden />

      <SectionFade height={150} />
    </div>
  );
}
