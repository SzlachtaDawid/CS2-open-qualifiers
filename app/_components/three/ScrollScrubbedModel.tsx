"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { AnimationClip, AnimationMixer, type Group } from "three";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
import { getScrollProgress, type SectionKey } from "./lib/scrollStore";
import { clipTime, FACING, modelOffsetY, modelRotationY, type Facing } from "./lib/scrollAnim";

const MODEL_URL = "/models/cs2.glb";

/** The clips that exist in cs2.glb. */
export type ClipName = "Jump" | "win1" | "stand" | "ak_walk";

// Stops short of the full sweep so the model is still turning when the section ends,
// rather than sitting parked at the last pose.
const ROTATION_SPAN = 0.8;

type Props = {
  sectionKey: SectionKey;
  clip?: ClipName;
  facing?: Facing;
  rotateOnScroll?: boolean;
  /** How much of the animation the section's full scroll covers. 1 = all of it. */
  progressScale?: number;
};

export function ScrollScrubbedModel({
  sectionKey,
  clip = "ak_walk",
  facing = "front",
  rotateOnScroll = true,
  progressScale = 1,
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
    const progress = getScrollProgress(sectionKey) * progressScale;
    mixer.setTime(clipTime(progress, duration.current, 1));

    const g = group.current;
    if (!g) return;

    const base = FACING[facing];
    g.rotation.y = rotateOnScroll ? modelRotationY(progress * ROTATION_SPAN, base) : base;

    if (rotateOnScroll) {
      g.position.y = modelOffsetY(progress * ROTATION_SPAN);
    }
  });

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
