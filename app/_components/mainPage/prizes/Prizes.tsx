"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ModelSceneCanvas } from "../../three/ModelSceneCanvas";
import { TapeBorders } from "../../tape/TapeBorders";
import { setScrollProgress } from "../../three/lib/scrollStore";
import { FACING } from "../../three/lib/scrollAnim";
import Title from "../../copy/Title";
import Describe from "../../copy/Describe";
import Image from "next/image";
import Text from "./Text";

const Prizes = () => {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const trigger = ScrollTrigger.create({
        trigger: section.current,
        start: "-5% center",
        end: "bottom center",
        onUpdate: (self) => setScrollProgress("prizes", self.progress),
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom bottom", scrub: true },
      });

      tl.from("#scene-text", { y: 60, opacity: 0, ease: "none", duration: 0.5 })
        .to("#scene-text", { y: -200, opacity: 0, ease: "none", duration: 0.5 }, "+=3")
        .from("#scene-prizes", { y: 200, opacity: 0, ease: "none", duration: 0.5 })
        .to({}, { duration: 1.5 });

      return () => trigger.kill();
    },
    { scope: section }
  );

  return (
    <section ref={section} className="relative z-3 h-[240vh]">
      <div className="sticky top-0 grid h-dvh place-items-center">
        <div className="absolute inset-0">
          <ModelSceneCanvas
            sectionKey="prizes"
            clip="win1"
            side="right"
            rotationOffset={FACING.sideRight}
            sideNumber={0.2}
          />
        </div>
        <TapeBorders />
        <Text />

        <div className="col-start-1 row-start-1 max-w-[900px] px-8 text-center" id="scene-prizes">
          <h3 className="mb-6 text-center text-2xl">Rewards</h3>
          <div className="flex flex-col flex-wrap items-center justify-center gap-8">
            <div>
              <Image src="/images/skins.webp" width={500} height={400} alt="" className="h-auto w-[min(38vw,360px)]" />
              <Describe copy="Expensive skines" />
            </div>
            <div>
              <Image src="/images/money.webp" width={500} height={400} alt="" className="h-auto w-[min(38vw,360px)]" />
              <Describe copy="Real money" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prizes;
