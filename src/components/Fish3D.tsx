"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Fish } from "@/types/game";

interface Fish3DProps {
  fishData: Fish;
  isRunning: boolean;
  aquariumWidth: number;
  aquariumHeight: number;
  aquariumDepth: number;
  onUpdate: (id: string, updates: Partial<Fish>) => void;
}

export default function Fish3D({
  fishData,
  isRunning,
  aquariumWidth,
  aquariumHeight,
  aquariumDepth,
  onUpdate,
}: Fish3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const positionRef = useRef({ x: fishData.x, y: fishData.y, z: 0 });
  const velocityRef = useRef({
    x: Math.cos(fishData.direction) * fishData.speed * 0.05,
    y: Math.sin(fishData.direction) * fishData.speed * 0.05,
    z: 0, // Keep fish in 2D plane
  });

  // Load the GLB model
  const { scene } = useGLTF(fishData.modelPath);

  useEffect(() => {
    if (groupRef.current && scene) {
      // Clone the scene to allow multiple instances
      const clonedScene = scene.clone();
      groupRef.current.add(clonedScene);

      // Scale the model with aggressive base scaling for GLB models
      clonedScene.scale.setScalar(fishData.size * 0.01);

      // Apply base rotation correction for model orientation
      // Most GLB models need to be rotated to face the correct direction
      clonedScene.rotation.y = Math.PI / 2; // Rotate model to face forward
      clonedScene.rotation.x = 0;

      // Set initial group rotation for swimming direction
      groupRef.current.rotation.y = 0; // Face camera (front view)
      const initialAngle = Math.atan2(
        Math.sin(fishData.direction),
        Math.cos(fishData.direction),
      );
      groupRef.current.rotation.z = -initialAngle; // Orient to swimming direction

      return () => {
        groupRef.current?.remove(clonedScene);
      };
    }
  }, [scene, fishData.size, fishData.direction]);

  useFrame(() => {
    if (!isRunning || !groupRef.current) return;

    const velocity = velocityRef.current;
    const position = positionRef.current;
    let newX = position.x + velocity.x;
    let newY = position.y + velocity.y;
    const newZ = 0; // Keep in 2D plane

    // Bounce off walls with some randomness
    const halfWidth = aquariumWidth / 2;
    const halfHeight = aquariumHeight / 2;

    if (Math.abs(newX) > halfWidth) {
      velocity.x = -velocity.x + (Math.random() - 0.5) * 0.002;
      newX = Math.sign(newX) * halfWidth;
    }
    if (Math.abs(newY) > halfHeight) {
      velocity.y = -velocity.y + (Math.random() - 0.5) * 0.002;
      newY = Math.sign(newY) * halfHeight;
    }

    // Add slight continuous direction variation for natural swimming
    velocity.x += (Math.random() - 0.5) * 0.0005;
    velocity.y += (Math.random() - 0.5) * 0.0005;

    // Limit speed
    const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
    const maxSpeed = fishData.speed * 0.05;
    if (speed > maxSpeed) {
      velocity.x = (velocity.x / speed) * maxSpeed;
      velocity.y = (velocity.y / speed) * maxSpeed;
    }

    // Update local position tracking
    position.x = newX;
    position.y = newY;
    position.z = 0;

    // Update 3D position
    groupRef.current.position.set(newX, newY, newZ);

    // Update rotation to face movement direction (2D) - only Z rotation for 2D plane
    const angle = Math.atan2(velocity.y, velocity.x);
    groupRef.current.rotation.z = -angle;
  });

  return <group ref={groupRef} position={[fishData.x, fishData.y, 0]} />;
}

// Preload all fish models
useGLTF.preload("/fish/goldfish.glb");
useGLTF.preload("/fish/orange-fish.glb");
useGLTF.preload("/fish/crab.glb");
useGLTF.preload("/fish/seahorse.glb");
useGLTF.preload("/fish/octopus.glb");
