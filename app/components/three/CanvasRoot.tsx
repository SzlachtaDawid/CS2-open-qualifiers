"use client";

import { useCallback } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { useLenis } from "lenis/react";

/**
 * `frameloop="demand"` means nothing draws until something asks for it, and every
 * View re-measures its tracked element per frame — so a frame is owed on every scroll.
 */
function RenderOnScroll() {
  const invalidate = useThree((state) => state.invalidate);
  useLenis(useCallback(() => invalidate(), [invalidate]));

  return null;
}

export default function CanvasRoot() {
  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: 3, pointerEvents: "none" }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      frameloop="demand"
    >
      <RenderOnScroll />
      <View.Port />
    </Canvas>
  );
}
