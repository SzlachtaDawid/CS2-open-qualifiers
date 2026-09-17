"use client";

import type { CSSProperties } from "react";
import dynamic from "next/dynamic";
import type { ModelViewProps } from "./ModelViewScene";
import { modelPlacementCss, NARROW_BREAKPOINT_PX } from "./placement";
import { ModelLoadingLabel } from "./ModelLoadingLabel";
import { useMediaQuery } from "@/app/lib/useMediaQuery";
import { SceneErrorBoundary } from "./SceneErrorBoundary";

// The scene chunk carries three, drei and R3F, so on a slow line this shows for a while
// before the scene exists to render its own Suspense fallback.
const ModelViewScene = dynamic(() => import("./ModelViewScene"), {
  ssr: false,
  loading: () => (
    <ModelLoadingLabel
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: "var(--model-x)", top: "var(--model-y)" }}
    />
  ),
});

const WIDE_ENOUGH = `(min-width: ${NARROW_BREAKPOINT_PX}px)`;

export function ModelView(props: ModelViewProps) {
  const isWideEnough = useMediaQuery(WIDE_ENOUGH);

  // Must run before the next/dynamic component renders: ScrollScrubbedModel calls
  // useGLTF.preload at module scope, so importing it at all fetches cs2.glb (2.4 MB).
  if (!isWideEnough) return null;

  const { left, top } = modelPlacementCss(props.side, props.sideOffset);

  return (
    <SceneErrorBoundary>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ "--model-x": left, "--model-y": top } as CSSProperties}
      >
        <ModelViewScene {...props} />
      </div>
    </SceneErrorBoundary>
  );
}
