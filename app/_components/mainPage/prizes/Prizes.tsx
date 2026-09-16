"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { StickyScene } from "../../stickyScene/StickyScene";
import { useSectionScrub } from "../../three/useSectionScrub";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Describe } from "../../copy/Describe";
import { PrizesCopy } from "./PrizesCopy";

export const Prizes = () => {
  const section = useRef<HTMLElement>(null);

  const reducedMotion = useReducedMotion();

  useSectionScrub("prizes", section);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom bottom", scrub: true },
      });

      tl.from("#prizes-scene-text", { y: 60, opacity: 0, ease: "none", duration: 0.5 }, "+=1")
        .from("#prizes-title", { x: -200, opacity: 0, ease: "none", duration: 1 })
        .from("#prize-pool", { x: 200, opacity: 0, ease: "none", duration: 1 }, "-=0.25")
        .from("#prize-skins", { x: -200, opacity: 0, ease: "none", duration: 1 }, "-=0.25")
        .to("#prizes-scene-text", { y: -200, opacity: 0, ease: "none", duration: 0.5 }, "+=3")
        .from("#prizes-scene-rewards", { y: 200, opacity: 0, ease: "none", duration: 0.5 })
        .to({}, { duration: 1.5 });
    },
    { scope: section, dependencies: [reducedMotion] }
  );

  return (
    <StickyScene
      ref={section}
      heightVh={240}
      scene={{ sectionKey: "prizes", clip: "win1", side: "right", sideOffset: 0.2, facing: "sideRight" }}
    >
      <div className="relative col-start-1 row-start-1 max-w-[600px] px-8 text-center" id="prizes-scene-text">
        <PrizesCopy />
      </div>
      <div className="relative col-start-1 row-start-1 max-w-[900px] px-8 text-center" id="prizes-scene-rewards">
        <h3 className="mb-6 text-center text-xl md:text-2xl">Rewards</h3>
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
    </StickyScene>
  );
};
