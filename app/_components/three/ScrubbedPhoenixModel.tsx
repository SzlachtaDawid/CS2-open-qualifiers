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

    // SkinnedMesh derives its bounding box from the bind pose, so three.js culls the
    // model mid-jump even though it is on screen.
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
