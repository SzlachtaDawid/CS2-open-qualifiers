"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { PhoenixModel } from "./PhoenixModel";

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
      {/* environment={null} celowo: domyślny preset Stage pobiera HDR z raw.githack.com */}
      <Suspense fallback={null}>
        <Stage environment={null} adjustCamera={1.1} intensity={0.4} shadows="contact">
          <PhoenixModel />
        </Stage>
      </Suspense>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2.5} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.8} />
      <OrbitControls makeDefault enablePan={false} minDistance={1} maxDistance={20} />
    </Canvas>
  );
}
