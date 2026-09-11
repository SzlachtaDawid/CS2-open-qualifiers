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

      gsap.from("#prize-pool", {
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

      gsap.from("#prize-skins", {
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
      <Title copy="What you" coloredCopy="can win" component="h2" id="title" />
      <div className="mx-auto max-w-[400px]">
        <Describe
          copy="The prize pool grows with every sponsor we bring on board, and it is split across the podium — second and third place walk away with something too."
          id="prize-pool"
        />
        <Describe
          copy="On top of the cash, every player who finishes on the podium picks a CS2 skin from the tournament case."
          id="prize-skins"
        />
      </div>
    </div>
  );
};

export default Text;
