"use client";

import { useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { LoopRepeat } from "three";
import { DEFAULT_CLIP, pickClip } from "./lib/clips";

const MODEL_URL = "/models/cs2.glb";

export function PhoenixModel({ clip = DEFAULT_CLIP }: { clip?: string }) {
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, names } = useAnimations(animations, scene);

  useEffect(() => {
    const name = pickClip(names, clip);
    const action = name ? actions[name] : null;
    if (!action) return;

    action.reset().setLoop(LoopRepeat, Infinity).fadeIn(0.3).play();
    return () => {
      action.fadeOut(0.3);
    };
  }, [actions, names, clip]);

  return <primitive object={scene} />;
}

useGLTF.preload(MODEL_URL);
