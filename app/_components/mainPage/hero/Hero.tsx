import Button from "../../buttons/Button";
import Faces from "./components/Faces";
import Describe from "../../copy/Describe";
import { SectionFade } from "../../sectionFade/SectionFade";
import Header from "./components/Header";
import ImageCell from "../../imageCell/ImageCell";

export function Hero() {
  return (
    <div className="relative overflow-x-clip">
      <div className="relative z-3 flex min-h-dvh flex-col justify-center p-8">
        <Header />
        <Describe copy="128 teams, one bracket. Thirteen rounds take the map, two maps take the series. Win seven times and the trophy is yours." />
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-8">
          <Button text="Let’s do this!" variant="ct" />
          <Button text="I’m chickening out." variant="tt" />
          <div>
            <h2 className="mb-4 text-center text-2xl">Sponsors</h2>
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
      <SectionFade height={150} />
    </div>
  );
}
