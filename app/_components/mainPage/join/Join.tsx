"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { StickyScene } from "../../stickyScene/StickyScene";
import { useSectionScrub } from "../../three/useSectionScrub";
import Title from "../../copy/Title";
import Describe from "../../copy/Describe";
import Button from "../../buttons/Button";

const SIGN_UP_ROUTE = "/register";

// The section is tall enough that a full sweep would finish long before it ends.
const JOIN_PROGRESS_SCALE = 0.7;

const Join = () => {
  const section = useRef<HTMLElement>(null);

  useSectionScrub("join", section, { start: "10% bottom", end: "bottom bottom" });

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom bottom", scrub: true },
      });

      tl.from("#join-heading", { x: -200, opacity: 0, ease: "none", duration: 0.5 })
        .from("#join-roster", { x: 200, opacity: 0, ease: "none", duration: 0.5 }, "-=0.25")
        .from("#join-slots", { x: -200, opacity: 0, ease: "none", duration: 0.5 }, "-=0.25")
        .from("#join-cta", { y: 200, opacity: 0, ease: "none", duration: 0.2 }, "-=0.25")
        .to({}, { duration: 1.5 });
    },
    { scope: section }
  );

  return (
    <StickyScene
      ref={section}
      heightVh={460}
      scene={{
        sectionKey: "join",
        clip: "Jump",
        side: "right",
        facing: "sideLeft",
        progressScale: JOIN_PROGRESS_SCALE,
      }}
    >
      <div className="relative col-start-1 row-start-1 flex max-w-[600px] flex-col items-center px-8 text-center">
        <Title copy="Jump" coloredCopy="on board" component="h2" id="join-heading" />
        <div className="max-w-[400px]">
          <Describe
            copy="Five players, one roster, one form. Bring the team you already play with — we are not asking you to build a new one."
            id="join-roster"
          />
          <Describe
            copy="Slots close once the bracket is full, and the bracket fills in the order teams sign up."
            id="join-slots"
          />
        </div>
        <div className="mt-10" id="join-cta">
          <Button text="Sign up your team" variant="ct" href={SIGN_UP_ROUTE} />
        </div>
      </div>
    </StickyScene>
  );
};

export default Join;
