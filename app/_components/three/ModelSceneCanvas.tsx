"use client";

import dynamic from "next/dynamic";
import type { ModelSceneProps } from "./ModelScene";
import { NARROW_BREAKPOINT_PX } from "./lib/placement";
import { useMediaQuery } from "@/lib/useMediaQuery";

const ModelScene = dynamic(() => import("./ModelScene"), {
  ssr: false,
  loading: () => <div>LOADING</div>,
});

const WIDE_ENOUGH = `(min-width: ${NARROW_BREAKPOINT_PX}px)`;

export function ModelSceneCanvas(props: ModelSceneProps) {
  const isWideEnough = useMediaQuery(WIDE_ENOUGH);

  // Must run before the next/dynamic component renders, or the browser fetches the
  // scene chunk and cs2.glb (2.4 MB). Hiding with CSS would not be enough.
  if (!isWideEnough) return null;

  return <ModelScene {...props} />;
}
