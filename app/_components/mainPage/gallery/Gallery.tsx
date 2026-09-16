"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const SLIDES = [
  { src: "/images/mainStage.webp", caption: "Main stage" },
  { src: "/images/chillSpace.webp", caption: "Chill space" },
  { src: "/images/foodCourt.webp", caption: "Food court" },
];

const SLIDE_H_VH = 78;
const GAP_VW = 4;
const FALLBACK_ASPECT = 700 / 467;
const FALLBACK_VH = 100 + SLIDES.length * SLIDE_H_VH * FALLBACK_ASPECT;

const Gallery = () => {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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
    { scope: section }
  );

  return (
    <section ref={section} className="relative z-3 bg-white" style={{ height: `${FALLBACK_VH}vh` }}>
      <div className="sticky top-0 flex h-dvh items-center overflow-hidden">
        <div ref={track} className="flex will-change-transform" style={{ gap: `${GAP_VW}vw` }}>
          {SLIDES.map((slide, i) => (
            <figure key={i} className="shrink-0">
              <Image
                src={slide.src}
                alt={slide.caption}
                width={700}
                height={467}
                className="h-[78vh] w-auto max-w-none"
              />
              <figcaption className="mt-4 text-sm text-neutral-900 uppercase">{slide.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
