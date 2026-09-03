import Image from "next/image";
import Button from "../buttons/Button";
import Faces from "./components/Faces";
import Subtitle from "./components/Subtitle";
import Title from "./components/Title";

export function Hero() {
  return (
    <>
      <div className="relative z-3 flex min-h-dvh flex-col justify-center p-8">
        <Title />
        <Subtitle />
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-8">
          <Button text="Let’s do this!" variant="ct" />
          <Button text="I’m chickening out." variant="tt" />
          <div>
            <h2 className="mb-4 text-center text-2xl">Sponsors</h2>
            <div className="flex gap-4">
              <div className="flex h-[100] w-[100] flex-col items-center justify-center gap-2 border bg-white/5">
                <Image alt="falcons logo" src="/images/falcons.webp" height={50} width={50} />
                <p>Falcons</p>
              </div>
              <div className="flex h-[100] w-[100] flex-col items-center justify-center gap-2 border bg-white/5">
                <Image alt="falcons logo" src="/images/faze.webp" height={50} width={50} />
                <p>Faze</p>
              </div>
              <div className="flex h-[100] w-[100] flex-col items-center justify-center gap-2 border bg-white/5">
                <Image alt="falcons logo" src="/images/vitality.webp" height={50} width={50} />
                <p>Vitality</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <Faces />
      </div>
    </>
  );
}
