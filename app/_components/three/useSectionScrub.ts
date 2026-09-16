"use client";

import type { RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { setScrollProgress, type SectionKey } from "./lib/scrollStore";

type Options = {
  start?: string;
  end?: string;
};

/**
 * Feeds a section's 0-1 scroll progress into the store for the 3D layer to read.
 *
 * No manual cleanup: the trigger registers itself with the gsap.context that useGSAP
 * opens for the scope, and that context kills it on unmount.
 */
export function useSectionScrub(
  sectionKey: SectionKey,
  section: RefObject<HTMLElement | null>,
  { start = "-5% center", end = "bottom center" }: Options = {}
) {
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: section.current,
        start,
        end,
        onUpdate: (self) => setScrollProgress(sectionKey, self.progress),
      });
    },
    { scope: section, dependencies: [sectionKey, start, end] }
  );
}
