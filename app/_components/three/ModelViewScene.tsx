"use client";

import { Suspense } from "react";
import { useThree } from "@react-three/fiber";
import { Center, ContactShadows, View } from "@react-three/drei";
import { ScrubbedPhoenixModel } from "./ScrubbedPhoenixModel";
import { modelPlacement, type Side } from "./lib/placement";
import { type SectionKey } from "./lib/scrollStore";

const GROUND_Y = -0.9;

export type ModelViewProps = {
  sectionKey: SectionKey;
  clip?: "Jump" | "win1" | "stand" | "ak_walk";
  side?: Side;
  rotationOffset?: number;
  turnOnModelRotation?: boolean;
  sideNumber?: number;
};

function PlacedModel({ sectionKey, clip, side, rotationOffset, turnOnModelRotation, sideNumber }: ModelViewProps) {
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

/**
 * Each View portals into its own scene, so the lights have to be repeated per section —
 * they are not inherited from the canvas.
 */
export default function ModelViewScene(props: ModelViewProps) {
  return (
    <View className="absolute inset-0">
      <Suspense fallback={null}>
        <PlacedModel {...props} />
      </Suspense>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2.5} />
      <directionalLight position={[-5, 3, -5]} intensity={0.8} />
    </View>
  );
}
