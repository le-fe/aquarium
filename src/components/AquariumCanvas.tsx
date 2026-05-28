"use client";

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { useGameStore } from "@/stores/gameStore";

export default function AquariumCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const fishSpritesRef = useRef<Map<string, PIXI.Graphics>>(new Map());
  const fishStateRef = useRef<Map<string, any>>(new Map());
  const isInitializedRef = useRef(false);

  const { fish, isRunning, aquariumWidth, aquariumHeight, setAquariumSize } =
    useGameStore();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Prevent double initialization in StrictMode
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    // Initialize PixiJS Application
    const app = new PIXI.Application();

    const initApp = async () => {
      // Get viewport dimensions for full screen
      const width = window.innerWidth;
      const height = window.innerHeight;

      await app.init({
        width,
        height,
        backgroundColor: 0x3a7ca5,
        backgroundAlpha: 0.3,
        antialias: true,
      });

      if (canvasRef.current) {
        canvasRef.current.appendChild(app.canvas as HTMLCanvasElement);
      }

      appRef.current = app;
      setAquariumSize(width, height);

      // Initialize fish sprites for existing fish
      fish.forEach((fishData) => {
        const graphics = new PIXI.Graphics();
        const colorNum = parseInt(fishData.color.replace("#", ""), 16);

        // Draw fish body
        graphics
          .ellipse(0, 0, fishData.size, fishData.size * 0.6)
          .fill(colorNum);

        // Draw tail
        graphics
          .poly([
            { x: -fishData.size, y: 0 },
            { x: -fishData.size * 1.4, y: -fishData.size * 0.3 },
            { x: -fishData.size * 1.4, y: fishData.size * 0.3 },
          ])
          .fill(colorNum);

        // Draw eye
        graphics
          .circle(
            fishData.size * 0.5,
            -fishData.size * 0.2,
            fishData.size * 0.1,
          )
          .fill(0x000000);

        graphics.position.set(fishData.x, fishData.y);
        graphics.rotation = fishData.direction;

        app.stage.addChild(graphics);
        fishSpritesRef.current.set(fishData.id, graphics);
        fishStateRef.current.set(fishData.id, { ...fishData });
      });

      // Animation loop
      app.ticker.add(() => {
        if (!isRunning) return;

        fishStateRef.current.forEach((fishData, fishId) => {
          const sprite = fishSpritesRef.current.get(fishId);
          if (!sprite) return;

          // Update position
          let newX = fishData.x + Math.cos(fishData.direction) * fishData.speed;
          let newY = fishData.y + Math.sin(fishData.direction) * fishData.speed;
          let newDirection = fishData.direction;
          let newSpeed = fishData.speed;

          // Add slight continuous direction variation for natural swimming
          newDirection += (Math.random() - 0.5) * 0.05;

          // Bounce off walls with some randomness
          const margin = fishData.size;
          if (newX < margin || newX > aquariumWidth - margin) {
            newDirection = Math.PI - newDirection + (Math.random() - 0.5) * 0.3;
            newX = Math.max(margin, Math.min(aquariumWidth - margin, newX));
          }
          if (newY < margin || newY > aquariumHeight - margin) {
            newDirection = -newDirection + (Math.random() - 0.5) * 0.3;
            newY = Math.max(margin, Math.min(aquariumHeight - margin, newY));
          }

          // Random direction change (more frequent)
          if (Math.random() < 0.02) {
            newDirection += (Math.random() - 0.5) * 1.0;
          }

          // Vary speed slightly for more natural movement
          if (Math.random() < 0.05) {
            newSpeed = Math.max(
              0.2,
              Math.min(1.2, newSpeed + (Math.random() - 0.5) * 0.1),
            );
          }

          // Update local state
          fishData.x = newX;
          fishData.y = newY;
          fishData.direction = newDirection;
          fishData.speed = newSpeed;

          // Update sprite
          sprite.position.set(newX, newY);
          sprite.rotation = newDirection;
        });
      });
    };

    initApp();

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setAquariumSize(width, height);
      if (appRef.current) {
        appRef.current.renderer.resize(width, height);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (appRef.current) {
        appRef.current.destroy();
        appRef.current = null;
      }
      // Clean up any canvas elements
      if (canvasRef.current) {
        canvasRef.current.innerHTML = "";
      }
    };
  }, []);

  // Update fish sprites when fish array changes
  useEffect(() => {
    if (!appRef.current) return;

    const currentFishIds = new Set(fish.map((f) => f.id));
    const spriteIds = new Set(fishSpritesRef.current.keys());

    // Remove sprites for fish that no longer exist
    spriteIds.forEach((id) => {
      if (!currentFishIds.has(id)) {
        const sprite = fishSpritesRef.current.get(id);
        if (sprite) {
          appRef.current?.stage.removeChild(sprite);
          fishSpritesRef.current.delete(id);
          fishStateRef.current.delete(id);
        }
      }
    });

    // Add sprites for new fish
    fish.forEach((fishData) => {
      if (!fishSpritesRef.current.has(fishData.id)) {
        const graphics = new PIXI.Graphics();

        // Convert hex color string to number
        const colorNum = parseInt(fishData.color.replace("#", ""), 16);

        // Draw fish body
        graphics
          .ellipse(0, 0, fishData.size, fishData.size * 0.6)
          .fill(colorNum);

        // Draw tail
        graphics
          .poly([
            { x: -fishData.size, y: 0 },
            { x: -fishData.size * 1.4, y: -fishData.size * 0.3 },
            { x: -fishData.size * 1.4, y: fishData.size * 0.3 },
          ])
          .fill(colorNum);

        // Draw eye
        graphics
          .circle(
            fishData.size * 0.5,
            -fishData.size * 0.2,
            fishData.size * 0.1,
          )
          .fill(0x000000);

        graphics.position.set(fishData.x, fishData.y);
        graphics.rotation = fishData.direction;

        appRef.current?.stage.addChild(graphics);
        fishSpritesRef.current.set(fishData.id, graphics);

        // Store fish state in local ref for animation
        fishStateRef.current.set(fishData.id, { ...fishData });
      }
    });
  }, [fish]);

  return <div ref={canvasRef} className="w-full h-full" />;
}
