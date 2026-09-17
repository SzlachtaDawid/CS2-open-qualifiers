"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/app/lib/gsap";
import { cn } from "@/app/lib/utils";
import { useReducedMotion } from "@/app/lib/useReducedMotion";

const SLIDES = [
  { src: "/images/mainStage.webp", caption: "Main stage" },
  { src: "/images/chillSpace.webp", caption: "Chill space" },
  { src: "/images/foodCourt.webp", caption: "Food court" },
];

const SLIDE_H_VH = 78;
const GAP_VW = 4;
const FALLBACK_ASPECT = 700 / 467;
const FALLBACK_VH = 100 + SLIDES.length * SLIDE_H_VH * FALLBACK_ASPECT;

export const Gallery = () => {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        // fitHeight writes the height imperatively, so drop it when the pin is off
        section.current!.style.height = "";
        return;
      }

      const fitHeight = () => {
        const distance = Math.max(track.current!.scrollWidth - window.innerWidth, 0);
        section.current!.style.height = `${window.innerHeight + distance}px`;
      };

      fitHeight();
      ScrollTrigger.addEventListener("refreshInit", fitHeight);

      gsap.to(track.current, {
        x: () => -(track.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      return () => ScrollTrigger.removeEventListener("refreshInit", fitHeight);
    },
    { scope: section, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={section}
      className="relative z-3 bg-white"
      style={reducedMotion ? undefined : { height: `${FALLBACK_VH}vh` }}
    >
      {/* Without the scroll-driven pan the strip becomes an ordinary scroll region,
          which is also what makes it reachable from the keyboard. */}
      <div
        className={cn("top-0 flex h-dvh items-center", reducedMotion ? "overflow-x-auto" : "sticky overflow-hidden")}
        {...(reducedMotion && { tabIndex: 0, role: "region", "aria-label": "Venue photos" })}
      >
        <div ref={track} className="flex will-change-transform" style={{ gap: `${GAP_VW}vw` }}>
          {SLIDES.map((slide) => (
            <figure key={slide.src} className="shrink-0">
              {/* alt is empty on purpose — the figcaption already says this out loud */}
              <Image src={slide.src} alt="" width={700} height={467} className="h-[78vh] w-auto max-w-none" />
              <figcaption className="mt-4 text-sm text-neutral-900 uppercase">{slide.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
