"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ModelSceneCanvas } from "../../three/ModelSceneCanvas";
import { TapeBorders } from "../../tape/TapeBorders";
import { setScrollProgress } from "../../three/lib/scrollStore";
import Title from "../../copy/Title";
import Describe from "../../copy/Describe";
import Button from "../../buttons/Button";
import { FACING } from "../../three/lib/scrollAnim";

/** Trasa formularza zgłoszeniowego. Do podmiany, gdy powstanie właściwy route. */
const SIGN_UP_ROUTE = "/register";

const Join = () => {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Jedyne zadanie tego ScrollTriggera: przepisać postęp sekcji do store'a.
      // Sama animacja dzieje się w useFrame wewnątrz canvasu.
      const trigger = ScrollTrigger.create({
        trigger: section.current,
        start: "10% bottom",
        end: "bottom bottom",
        onUpdate: (self) => setScrollProgress("join", self.progress),
      });

      // Model wraca na prawą stronę, więc tekst znów wjeżdża z prawej.
      gsap.from("#join-heading", {
        x: 200,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top bottom",
          end: "15% top",
          scrub: true,
        },
      });

      gsap.from("#join-roster", {
        x: -200,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "5% bottom",
          end: "7% top",
          scrub: true,
        },
      });

      gsap.from("#join-slots", {
        x: 200,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "7% bottom",
          end: "10% top",
          scrub: true,
        },
      });

      // CTA nie wjeżdża z boku — to ostatni element strony, ma się pojawić
      // pod tekstem i urosnąć w miejscu, żeby nie wyglądał jak kolejny slajd.
      gsap.from("#join-cta", {
        y: 60,
        scale: 0.92,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "10% bottom",
          end: "13% top",
          scrub: true,
        },
      });

      return () => trigger.kill();
    },
    { scope: section }
  );

  return (
    <section ref={section} className="relative z-3 h-[460vh]">
      <div className="sticky top-0 flex h-dvh items-center justify-center">
        <div className="absolute inset-0">
          <ModelSceneCanvas sectionKey="join" clip="Jump" side="right" rotationOffset={FACING.sideLeft} />
        </div>

        {/* Taśmy po canvasie, a przed treścią — o warstwach decyduje kolejność w DOM */}
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
