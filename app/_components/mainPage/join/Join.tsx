"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ModelView } from "../../three/ModelView";
import { TapeBorders } from "../../tape/TapeBorders";
import { setScrollProgress } from "../../three/lib/scrollStore";
import Title from "../../copy/Title";
import Describe from "../../copy/Describe";
import Button from "../../buttons/Button";
import { FACING } from "../../three/lib/scrollAnim";

const SIGN_UP_ROUTE = "/register";

const Join = () => {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const trigger = ScrollTrigger.create({
        trigger: section.current,
        start: "10% bottom",
        end: "bottom bottom",
        onUpdate: (self) => setScrollProgress("join", self.progress * 0.7),
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom bottom", scrub: true },
      });

      tl.from("#join-heading", { x: -200, opacity: 0, ease: "none", duration: 0.5 })
        .from("#join-roster", { x: 200, opacity: 0, ease: "none", duration: 0.5 }, "-=0.25")
        .from("#join-slots", { x: -200, opacity: 0, ease: "none", duration: 0.5 }, "-=0.25")
        .from("#join-cta", { y: 200, opacity: 0, ease: "none", duration: 0.2 }, "-=0.25")
        .to({}, { duration: 1.5 });

      return () => trigger.kill();
    },
    { scope: section }
  );

  return (
    <section ref={section} className="relative z-3 h-[460vh]">
      <div className="sticky top-0 flex h-dvh items-center justify-center">
        <ModelView sectionKey="join" clip="Jump" side="right" rotationOffset={FACING.sideLeft} />

        <TapeBorders />
        <div className="relative flex max-w-[600px] flex-col items-center px-8 text-center">
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
      </div>
    </section>
  );
};

export default Join;
