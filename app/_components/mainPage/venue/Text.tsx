import { useGSAP } from "@gsap/react";
import Describe from "../../copy/Describe";
import Title from "../../copy/Title";
import gsap from "gsap";
import { useRef } from "react";

const Text = () => {
  const section = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("#title", {
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

      gsap.to("#title", {
        zoom: 100,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "40% top",
          end: "90% top",
          scrub: true,
        },
      });

      gsap.from("#venue-house", {
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

      gsap.from("#venue-doors", {
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
    },
    { scope: section }
  );

  return (
    <div ref={section} className="col-start-1 row-start-1 max-w-[600px] px-8 text-center" id="scene-text">
      <Title copy="Where we" coloredCopy="play" component="h2" id="title" />
      <div className="max-w-[400px]">
        <Describe
          copy="The whole tournament runs out of one gaming house. Same rigs, same 240 Hz panels, same room — nobody plays the final from their bedroom."
          id="venue-house"
        />
        <Describe
          copy="Doors open on the morning of the first map. Spectator seats are limited, so everything goes out on stream as well."
          id="venue-doors"
        />
      </div>
    </div>
  );
};

export default Text;
