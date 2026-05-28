"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useGameStore } from "@/stores/gameStore";
import Fish3D from "./Fish3D";

function Aquarium() {
  const { aquariumWidth, aquariumHeight } = useGameStore();

  return (
    <mesh position={[0, -aquariumHeight / 2 - 0.5, -2]}>
      {/* Ocean floor as backdrop */}
      <planeGeometry args={[aquariumWidth * 1.5, 5]} />
      <meshStandardMaterial color="#1e3a5f" transparent opacity={0.3} />
    </mesh>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#4ECDC4" />
    </>
  );
}

export default function AquariumCanvas3D() {
  const { fish, isRunning, updateFish, setAquariumSize } = useGameStore();

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth / 70; // Better ratio for viewing all fish types
      const height = window.innerHeight / 70;
      const depth = 2; // Shallow depth for 2D layer
      setAquariumSize(width, height, depth);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [setAquariumSize]);

  return (
    <Canvas
      camera={{ position: [0, 0, 30], fov: 60 }}
      style={{ background: "transparent" }}
    >
      <Lighting />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <Aquarium />
        {fish.map((fishData) => (
          <Fish3D
            key={fishData.id}
            fishData={fishData}
            isRunning={isRunning}
            aquariumWidth={useGameStore.getState().aquariumWidth}
            aquariumHeight={useGameStore.getState().aquariumHeight}
            aquariumDepth={useGameStore.getState().aquariumDepth}
            onUpdate={updateFish}
          />
        ))}
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enableRotate={false}
        enablePan={false}
      />
    </Canvas>
  );
}
