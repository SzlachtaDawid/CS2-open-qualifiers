"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/app/lib/gsap";
import { StickyScene } from "@/app/components/StickyScene/StickyScene";
import { useSectionScrub } from "@/app/components/three/useSectionScrub";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { VenueCopy } from "./VenueCopy";

const LETTER_ZOOM = 170;
const ZOOM_ORIGIN = "18% 25%";

export const Venue = () => {
  const section = useRef<HTMLElement>(null);

  const reducedMotion = useReducedMotion();

  useSectionScrub("venue", section);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom bottom", scrub: true },
      });

      tl.from("#venue-title", { x: -200, opacity: 0, ease: "none", duration: 1 })
        .from("#venue-house", { x: 200, opacity: 0, ease: "none", duration: 1 }, "-=0.25")
        .from("#venue-doors", { x: -200, opacity: 0, ease: "none", duration: 1 }, "-=0.25")
        .to({}, { duration: 1 }, "+=1")
        .to("#venue-zoom-letter", { scale: LETTER_ZOOM, transformOrigin: ZOOM_ORIGIN, ease: "none", duration: 3 }, "<")
        .to("#venue-whiteout", { opacity: 1, ease: "none", duration: 0.8 }, "-=1");
    },
    { scope: section, dependencies: [reducedMotion] }
  );

  return (
    <StickyScene
      ref={section}
      heightVh={240}
      panelClassName="overflow-hidden"
      scene={{ sectionKey: "venue", clip: "stand", side: "left", sideOffset: 0.32 }}
    >
      <div className="relative col-start-1 row-start-1 max-w-[600px] px-8 text-center" id="venue-scene-text">
        <VenueCopy />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-white opacity-0" id="venue-whiteout" aria-hidden />
    </StickyScene>
  );
};
