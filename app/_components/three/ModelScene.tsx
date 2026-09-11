"use client";

import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Center, ContactShadows } from "@react-three/drei";
import { ScrubbedPhoenixModel } from "./ScrubbedPhoenixModel";
import { modelPlacement, type Side } from "./lib/placement";
import { useScrollStore, type SectionKey } from "./lib/scrollStore";

/** Wysokość cienia względem wyśrodkowanego modelu — mniej więcej stopy. */
const GROUND_Y = -0.9;

export type ModelSceneProps = {
  sectionKey: SectionKey;
  clip?: "Jump" | "win1" | "stand" | "ak_walk";
  side?: Side;
  rotationOffset?: number;
  turnOnModelRotation?: boolean;
  sideNumber?: number;
};

/**
 * Most między store'em scrolla a trybem `frameloop="demand"`.
 *
 * Scena nie ma własnego zegara — cała animacja wynika z pozycji scrolla — więc klatka
 * jest potrzebna wyłącznie wtedy, gdy ta pozycja się zmieni. Porównanie po kluczu jest
 * istotne: bez niego scroll w jednej sekcji budziłby canvasy wszystkich pozostałych.
 */
function RenderOnScroll({ sectionKey }: { sectionKey: SectionKey }) {
  const invalidate = useThree((s) => s.invalidate);

  // subscribe zwraca funkcję odsubskrybowania — useEffect sam ją wywoła przy odmontowaniu
  useEffect(
    () =>
      useScrollStore.subscribe((state, prev) => {
        if (state.progress[sectionKey] !== prev.progress[sectionKey]) invalidate();
      }),
    [invalidate, sectionKey]
  );

  return null;
}

function PlacedModel({ sectionKey, clip, side, rotationOffset, turnOnModelRotation, sideNumber }: ModelSceneProps) {
  const { viewport, size } = useThree();
  const { position, scale } = modelPlacement(viewport.width, viewport.height, size.width, side, sideNumber);

  return (
    <group position={position} scale={scale}>
      <Center>
        <ScrubbedPhoenixModel
          sectionKey={sectionKey}
          clip={clip}
          rotationOffset={rotationOffset}
          turnOnModelRotation={turnOnModelRotation}
        />
      </Center>
      <ContactShadows position={[0, GROUND_Y, 0]} scale={8} blur={2.4} far={3} opacity={0.55} resolution={256} />
    </group>
  );
}

export default function ModelScene({
  sectionKey,
  clip,
  side,
  rotationOffset,
  turnOnModelRotation,
  sideNumber,
}: ModelSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      // na Retinie devicePixelRatio = 2, czyli 4x więcej pikseli do wypełnienia
      dpr={[1, 1.5]}
      frameloop="demand"
    >
      <RenderOnScroll sectionKey={sectionKey} />
      <Suspense fallback={null}>
        <PlacedModel
          sectionKey={sectionKey}
          clip={clip}
          side={side}
          rotationOffset={rotationOffset}
          turnOnModelRotation={turnOnModelRotation}
          sideNumber={sideNumber}
        />
      </Suspense>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2.5} />
      <directionalLight position={[-5, 3, -5]} intensity={0.8} />
    </Canvas>
  );
}
