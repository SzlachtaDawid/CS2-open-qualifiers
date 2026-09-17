"use client";

import type { RefObject } from "react";
import { ScrollTrigger, useGSAP } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/lib/useReducedMotion";
import { setScrollProgress, type SectionKey } from "./scrollStore";

type Options = {
  start?: string;
  end?: string;
};

// Mid-sweep pose for visitors who asked for no animation: mid-stride, mid-jump,
// mid-celebration — all read better than the first frame of a clip.
const STATIC_PROGRESS = 0.5;

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
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        setScrollProgress(sectionKey, STATIC_PROGRESS);
        return;
      }

      ScrollTrigger.create({
        trigger: section.current,
        start,
        end,
        onUpdate: (self) => setScrollProgress(sectionKey, self.progress),
      });
    },
    { scope: section, dependencies: [sectionKey, start, end, reducedMotion] }
  );
}
