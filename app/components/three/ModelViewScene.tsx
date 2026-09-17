"use client";

import { Suspense, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Center, ContactShadows, Html, View } from "@react-three/drei";
import { ScrollScrubbedModel, type ClipName } from "./ScrollScrubbedModel";
import { ModelLoadingLabel } from "./ModelLoadingLabel";
import { modelPlacement, type Side } from "./placement";
import { type Facing } from "./scrollAnim";
import { type SectionKey } from "./scrollStore";

const GROUND_Y = -0.9;

export type ModelViewProps = {
  sectionKey: SectionKey;
  clip?: ClipName;
  side?: Side;
  /** How far off centre the model sits, as a fraction of the viewport width. */
  sideOffset?: number;
  facing?: Facing;
  rotateOnScroll?: boolean;
  progressScale?: number;
};

function ModelLoading() {
  const invalidate = useThree((state) => state.invalidate);

  // Html places itself inside useFrame, and under frameloop="demand" mounting alone
  // owes no frame — without this the label lands in the corner.
  useEffect(() => {
    invalidate();
  }, [invalidate]);

  return (
    <Html center>
      <ModelLoadingLabel />
    </Html>
  );
}

function PlacedModel({ sectionKey, clip, side, sideOffset, facing, rotateOnScroll, progressScale }: ModelViewProps) {
  const viewport = useThree((state) => state.viewport);

  return (
    <group position={modelPlacement(viewport.width, viewport.height, side, sideOffset)}>
      <Suspense fallback={<ModelLoading />}>
        <Center>
          <ScrollScrubbedModel
            sectionKey={sectionKey}
            clip={clip}
            facing={facing}
            rotateOnScroll={rotateOnScroll}
            progressScale={progressScale}
          />
        </Center>
      </Suspense>
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
      <PlacedModel {...props} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2.5} />
      <directionalLight position={[-5, 3, -5]} intensity={0.8} />
    </View>
  );
}
