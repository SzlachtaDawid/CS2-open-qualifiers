"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { AnimationClip, AnimationMixer, type Group } from "three";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
import { getScrollProgress, type SectionKey } from "./lib/scrollStore";
import { clipTime, modelOffsetY, modelRotationY } from "./lib/scrollAnim";

const MODEL_URL = "/models/cs2.glb";

type Props = {
  sectionKey: SectionKey;
  clip?: string;
  rotationOffset?: number;
  turnOnModelRotation?: boolean;
};

export function ScrubbedPhoenixModel({
  sectionKey,
  clip = "ak_walk",
  rotationOffset = 0,
  turnOnModelRotation = true,
}: Props) {
  const { scene, animations } = useGLTF(MODEL_URL);
  const group = useRef<Group>(null);
  const duration = useRef(0);

  const model = useMemo(() => {
    const cloned = cloneSkinned(scene);

    // SkinnedMesh liczy bryłę otaczającą z pozy spoczynkowej, nie z animowanej.
    // Przy pozie mocno odchodzącej od bind pose — a skok jest właśnie taka —
    // three.js uznaje mesh za będący poza kadrem i wycina go, choć na ekranie
    // powinien być widoczny. Na jednym modelu culling i tak nic nie oszczędza.
    cloned.traverse((o) => {
      o.frustumCulled = false;
    });

    return cloned;
  }, [scene]);
  const mixer = useMemo(() => new AnimationMixer(model), [model]);

  useEffect(() => {
    const found = AnimationClip.findByName(animations, clip) ?? animations[0];
    if (!found) return;

    const action = mixer.clipAction(found);
    action.play();
    duration.current = found.duration;

    return () => {
      action.stop();
      mixer.uncacheAction(found);
    };
  }, [animations, clip, mixer]);

  useFrame(() => {
    const progress = getScrollProgress(sectionKey);
    mixer.setTime(clipTime(progress, duration.current, 1));

    const g = group.current;
    if (!g) return;

    // Orientacja działa niezależnie od przemiatania: z wyłączonym obrotem model
    // po prostu stoi w zadanej pozie, zamiast wracać do orientacji z pliku .glb.
    g.rotation.y = turnOnModelRotation ? modelRotationY(progress * 0.8, rotationOffset) : rotationOffset;

    if (turnOnModelRotation) {
      g.position.y = modelOffsetY(progress * 0.8);
    }
  });

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
