"use client";

import dynamic from "next/dynamic";
import type { ModelViewProps } from "./ModelViewScene";
import { NARROW_BREAKPOINT_PX } from "./lib/placement";
import { useMediaQuery } from "@/lib/useMediaQuery";

const ModelViewScene = dynamic(() => import("./ModelViewScene"), { ssr: false });

const WIDE_ENOUGH = `(min-width: ${NARROW_BREAKPOINT_PX}px)`;

export function ModelView(props: ModelViewProps) {
  const isWideEnough = useMediaQuery(WIDE_ENOUGH);

  // Must run before the next/dynamic component renders: ScrollScrubbedModel calls
  // useGLTF.preload at module scope, so importing it at all fetches cs2.glb (2.4 MB).
  if (!isWideEnough) return null;

  return <ModelViewScene {...props} />;
}
