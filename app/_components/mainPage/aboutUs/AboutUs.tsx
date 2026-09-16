"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { StickyScene } from "../../stickyScene/StickyScene";
import { useSectionScrub } from "../../three/useSectionScrub";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Title } from "../../copy/Title";
import { Describe } from "../../copy/Describe";
import { ImageCell } from "../../imageCell/ImageCell";

export const AboutUs = () => {
  const section = useRef<HTMLElement>(null);

  const reducedMotion = useReducedMotion();

  useSectionScrub("about", section);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "15% bottom", end: "bottom bottom", scrub: true },
      });

      tl.from("#about-heading", { x: -200, opacity: 0, ease: "none", duration: 0.5 })
        .from("#about-organization", { x: 200, opacity: 0, ease: "none", duration: 0.5 }, "-=0.25")
        .from("#about-sponsors", { x: -200, opacity: 0, ease: "none", duration: 0.5 }, "-=0.25")
        .from("#team1", { x: 200, y: 200, opacity: 0, ease: "none", duration: 0.5 }, "-=0.25")
        .from("#team2", { y: 200, opacity: 0, ease: "none", duration: 0.5 }, "-=0.25")
        .from("#team3", { x: -200, y: 200, opacity: 0, ease: "none", duration: 0.5 }, "-=0.25")
        .to({}, { duration: 1 });
    },
    { scope: section, dependencies: [reducedMotion] }
  );

  return (
    <StickyScene
      ref={section}
      id="about"
      heightVh={200}
      topFade
      scene={{ sectionKey: "about", clip: "ak_walk", side: "left", sideOffset: 0.3 }}
    >
      <div className="relative col-start-1 row-start-1 flex max-w-[600px] flex-col items-center px-8 text-center">
        <Title copy="Something" coloredCopy="about Us" component="h2" id="about-heading" />
        <div className="max-w-[400px]">
          <Describe
            copy="We are a young organization built around one thing — running Counter-Strike events that players actually want to show up for."
            id="about-organization"
          />
          <Describe
            copy="We are still growing, and we are looking for sponsors to grow with us. Every partner on board goes straight back into the prize pool, the production and the experience on the server."
            id="about-sponsors"
          />
        </div>
        <div className="mt-10">
          <h3 className="mb-4 text-center text-xl md:text-2xl">Team</h3>
          <div className="flex gap-4">
            <ImageCell src="/images/team1.webp" copy="Qoqu" alt="" id="team1" />
            <ImageCell src="/images/team2.webp" copy="PLaYson" alt="" id="team2" />
            <ImageCell src="/images/team3.webp" copy="P7Q" alt="" id="team3" />
          </div>
        </div>
      </div>
    </StickyScene>
  );
};
