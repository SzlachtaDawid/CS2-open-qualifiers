"use client";

import { useMediaQuery } from "./useMediaQuery";

/** Whether the visitor asked the OS to cut down on animation. */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
