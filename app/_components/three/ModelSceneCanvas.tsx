"use client";

// next/dynamic z ssr:false nie działa w Server Component (App Router),
// więc dynamiczny import musi żyć w komponencie klienckim. R3F nie renderuje się po stronie serwera.
import dynamic from "next/dynamic";
import type { ModelSceneProps } from "./ModelScene";

const ModelScene = dynamic(() => import("./ModelScene"), {
  ssr: false,
  loading: () => <div>LOADING</div>,
});

export function ModelSceneCanvas(props: ModelSceneProps) {
  return <ModelScene {...props} />;
}
