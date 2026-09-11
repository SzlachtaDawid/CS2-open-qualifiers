"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { ModelSceneCanvas } from "../../three/ModelSceneCanvas";
import { TapeBorders } from "../../tape/TapeBorders";
import { setScrollProgress } from "../../three/lib/scrollStore";
import Title from "../../copy/Title";
import Describe from "../../copy/Describe";
import style from "./styles.module.css";
import Text from "./Text";

const Venue = () => {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Jedyne zadanie tego ScrollTriggera: przepisać postęp sekcji do store'a.
      // Sama animacja dzieje się w useFrame wewnątrz canvasu.
      const trigger = ScrollTrigger.create({
        trigger: section.current,
        start: "-5% center",
        end: "bottom center",
        onUpdate: (self) => setScrollProgress("venue", self.progress),
      });

      // Kierunki x znów odwrócone — model wraca na lewą stronę, więc tekst wjeżdża z niej.

      // Zdjęcie wchodzi inaczej niż tekst: unosi się i dojeżdża ze zbliżenia.
      // Wjazd z boku wyglądałby jak przesuwana karta, a ma się wywołać z tła.
      // gsap.from("#venue-photo", {
      //   y: 80,
      //   scale: 1.08,
      //   opacity: 0,
      //   ease: "none",
      //   scrollTrigger: {
      //     trigger: section.current,
      //     start: "18% bottom",
      //     end: "26% top",
      //     scrub: true,
      //   },
      // });

      return () => trigger.kill();
    },
    { scope: section }
  );

  return (
    <section ref={section} className="relative z-3 h-[240vh]">
      <div className="sticky top-0 flex h-dvh items-center justify-center">
        <div className="absolute inset-0">
          <ModelSceneCanvas sectionKey="venue" clip="stand" side="left" sideNumber={0.32} />
        </div>
        <TapeBorders />
        <div className="relative flex max-w-[600px] flex-col items-center px-8 text-center">
          <Text />
          {/* <div className="relative mt-10 w-full" id="venue-photo">
            <Image
              src="/images/gaminghouse.webp"
              alt="The gaming house where the tournament is played"
              width={700}
              height={467}
              className={cn(style.venue_photo, "h-[220px] w-full object-cover")}
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Venue;
