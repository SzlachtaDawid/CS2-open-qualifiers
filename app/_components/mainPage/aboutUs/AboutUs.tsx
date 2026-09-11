"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ModelSceneCanvas } from "../../three/ModelSceneCanvas";
import { TapeBorders } from "../../tape/TapeBorders";
import { setScrollProgress } from "../../three/lib/scrollStore";
import { SectionFade } from "../../sectionFade/SectionFade";
import Title from "../../copy/Title";
import Describe from "../../copy/Describe";
import ImageCell from "../../imageCell/ImageCell";

const AboutUs = () => {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const trigger = ScrollTrigger.create({
        trigger: section.current,
        start: "-5% center",
        end: "bottom center",
        onUpdate: (self) => setScrollProgress("about", self.progress),
      });
      gsap.from("#about-heading", {
        x: -200,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top bottom",
          end: "-10% top",
          scrub: true,
        },
      });

      gsap.from("#about-organization", {
        x: 200,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "5% bottom",
          end: "-5% top",
          scrub: true,
        },
      });

      gsap.from("#about-sponsors", {
        x: -200,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "10% bottom",
          end: "top top",
          scrub: true,
        },
      });

      gsap.from("#team1", {
        x: 200,
        y: 200,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "30% bottom",
          end: "40% 50%",
          scrub: true,
        },
      });

      gsap.from("#team2", {
        y: 200,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "40% bottom",
          end: "50% 60%",
          scrub: true,
        },
      });

      gsap.from("#team3", {
        x: -200,
        y: 200,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "50% bottom",
          end: "60% 70%",
          scrub: true,
        },
      });

      return () => trigger.kill();
    },
    { scope: section }
  );

  return (
    <section ref={section} className="relative z-3 h-[200vh]">
      <SectionFade side="top" height={150} />
      <div className="sticky top-0 flex h-dvh items-center justify-center">
        <div className="absolute inset-0">
          <ModelSceneCanvas sectionKey="about" clip="ak_walk" side="left" sideNumber={0.3} />
        </div>
        <TapeBorders />
        <div className="relative flex max-w-[600px] flex-col items-center px-8 text-center">
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
            <h3 className="mb-4 text-center text-2xl">Team</h3>
            <div className="flex gap-4">
              <ImageCell src="/images/team1.webp" copy="Qoqu" alt="" id="team1" />
              <ImageCell src="/images/team2.webp" copy="PLaYson" alt="" id="team2" />
              <ImageCell src="/images/team3.webp" copy="P7Q" alt="" id="team3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
