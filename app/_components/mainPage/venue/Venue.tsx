"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ModelView } from "../../three/ModelView";
import { TapeBorders } from "../../tape/TapeBorders";
import { setScrollProgress } from "../../three/lib/scrollStore";
import Text from "./Text";

const LETTER_ZOOM = 170;
const ZOOM_ORIGIN = "18% 25%";

const Venue = () => {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const trigger = ScrollTrigger.create({
        trigger: section.current,
        start: "-5% center",
        end: "bottom center",
        onUpdate: (self) => setScrollProgress("venue", self.progress),
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom bottom", scrub: true },
      });

      tl.from("#venue-title", { x: -200, opacity: 0, ease: "none", duration: 1 })
        .from("#venue-house", { x: 200, opacity: 0, ease: "none", duration: 1 }, "-=0.25")
        .from("#venue-doors", { x: -200, opacity: 0, ease: "none", duration: 1 }, "-=0.25")
        .to({}, { duration: 1 }, "+=1")
        .to("#venue-zoom-letter", { scale: LETTER_ZOOM, transformOrigin: ZOOM_ORIGIN, ease: "none", duration: 3 }, "<")
        .to("#venue-whiteout", { opacity: 1, ease: "none", duration: 0.8 }, "-=1");

      return () => trigger.kill();
    },
    { scope: section }
  );

  return (
    <section ref={section} className="relative z-3 h-[240vh]">
      <div className="sticky top-0 grid h-dvh place-items-center overflow-hidden">
        <ModelView sectionKey="venue" clip="stand" side="left" sideNumber={0.32} />
        <TapeBorders />
        <Text />
        <div className="pointer-events-none absolute inset-0 bg-white opacity-0" id="venue-whiteout" aria-hidden />
      </div>
    </section>
  );
};

export default Venue;
