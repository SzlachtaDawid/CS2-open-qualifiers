"use client";

import dynamic from "next/dynamic";
import { NARROW_BREAKPOINT_PX } from "./placement";
import { useMediaQuery } from "@/app/lib/useMediaQuery";

const CanvasRoot = dynamic(() => import("./CanvasRoot"), { ssr: false });

const WIDE_ENOUGH = `(min-width: ${NARROW_BREAKPOINT_PX}px)`;

/** The one WebGL context on the page. Every section draws into it through a `<View>`. */
export function SceneCanvas() {
  const isWideEnough = useMediaQuery(WIDE_ENOUGH);

  if (!isWideEnough) return null;

  return <CanvasRoot />;
}
