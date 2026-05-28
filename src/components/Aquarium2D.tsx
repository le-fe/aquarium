"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/stores/gameStore";

export default function Aquarium2D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const fishStateRef = useRef<Map<string, any>>(new Map());

  const { fish, isRunning, setAquariumSize, updateFish } = useGameStore();

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setAquariumSize(width, height);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [setAquariumSize]);

  useEffect(() => {
    if (!isRunning) return;

    const animate = () => {
      const aquariumWidth = useGameStore.getState().aquariumWidth;
      const aquariumHeight = useGameStore.getState().aquariumHeight;

      fish.forEach((fishData) => {
        let state = fishStateRef.current.get(fishData.id);
        if (!state) {
          // Fix for existing fish with old low speeds - ensure minimum viable speed
          let actualSpeed = fishData.speed;
          if (fishData.swimDirection === "vertical" && actualSpeed < 0.3) {
            actualSpeed = 0.5 + Math.random() * 0.5; // 0.5-1.0 for vertical swimmers
          }

          state = {
            x: fishData.x,
            y: fishData.y,
            direction: fishData.direction,
            speed: actualSpeed,
            swimDirection: fishData.swimDirection,
            verticalDirection: Math.random() < 0.5 ? 1 : -1, // Random start direction
            swayOffset: Math.random() * Math.PI * 2, // For gentle swaying
          };
          fishStateRef.current.set(fishData.id, state);
        }

        // Calculate movement based on swim direction
        let velocityX = 0;
        let velocityY = 0;

        if (state.swimDirection === "vertical") {
          // Vertical swimmers: smooth up/down movement with gentle swaying
          velocityY = state.verticalDirection * state.speed;
          // Add gentle horizontal swaying using sine wave
          state.swayOffset += 0.02;
          velocityX = Math.sin(state.swayOffset) * state.speed * 0.3;
        } else if (state.swimDirection === "horizontal") {
          // Primarily horizontal movement (left and right)
          velocityX = Math.cos(state.direction) * state.speed;
          velocityY = Math.sin(state.direction) * state.speed * 0.1; // 10% vertical drift
        } else {
          // Normal swimmers: prioritize horizontal movement (70% horizontal, 30% vertical)
          velocityX = Math.cos(state.direction) * state.speed;
          velocityY = Math.sin(state.direction) * state.speed * 0.3; // Reduced vertical component
        }

        // Update position
        let newX = state.x + velocityX;
        let newY = state.y + velocityY;
        let newDirection = state.direction;

        // Bounce off walls
        const margin = fishData.size / 2;
        if (newX < margin || newX > aquariumWidth - margin) {
          if (state.swimDirection === "vertical") {
            // For vertical swimmers, don't change vertical direction, just contain X
            newX = Math.max(margin, Math.min(aquariumWidth - margin, newX));
          } else {
            // For normal and horizontal swimmers, bounce normally
            newDirection = Math.PI - newDirection + (Math.random() - 0.5) * 0.3;
            newX = Math.max(margin, Math.min(aquariumWidth - margin, newX));
          }
        }
        if (newY < margin || newY > aquariumHeight - margin) {
          if (state.swimDirection === "vertical") {
            // For vertical swimmers, reverse vertical direction
            state.verticalDirection *= -1;
            newY = Math.max(margin, Math.min(aquariumHeight - margin, newY));
          } else if (state.swimDirection === "horizontal") {
            // For horizontal swimmers, just reverse the small vertical drift
            newDirection = -newDirection;
            newY = Math.max(margin, Math.min(aquariumHeight - margin, newY));
          } else {
            // For normal swimmers, bounce normally
            newDirection = -newDirection + (Math.random() - 0.5) * 0.3;
            newY = Math.max(margin, Math.min(aquariumHeight - margin, newY));
          }
        }

        // Add natural movement variation
        if (state.swimDirection === "vertical") {
          // Vertical swimmers: occasional direction change
          if (Math.random() < 0.001) {
            state.verticalDirection *= -1;
          }
        } else if (state.swimDirection === "horizontal") {
          // Horizontal swimmers: small variation in horizontal direction
          newDirection += (Math.random() - 0.5) * 0.03;
          // Keep direction primarily horizontal (left or right)
          if (
            Math.abs(newDirection - Math.PI) > Math.PI / 4 &&
            Math.abs(newDirection) > Math.PI / 4
          ) {
            newDirection =
              newDirection > Math.PI / 2 && newDirection < (3 * Math.PI) / 2
                ? Math.PI
                : 0;
          }
        } else {
          // Normal swimmers: natural variation
          newDirection += (Math.random() - 0.5) * 0.05;

          // Bias towards horizontal swimming (avoid steep vertical angles)
          const normalizedDir =
            ((newDirection % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
          // If angle is too vertical (between 60° and 120°, or 240° and 300°), gently push towards horizontal
          if (
            (normalizedDir > Math.PI / 3 &&
              normalizedDir < (2 * Math.PI) / 3) ||
            (normalizedDir > (4 * Math.PI) / 3 &&
              normalizedDir < (5 * Math.PI) / 3)
          ) {
            // Gently nudge towards horizontal
            if (normalizedDir < Math.PI) {
              newDirection -= 0.03; // Push towards 0 (right)
            } else {
              newDirection += 0.03; // Push towards π (left)
            }
          }
        }

        // Random direction change (less frequent for directional swimmers)
        const changeFrequency = state.swimDirection === "normal" ? 0.02 : 0.005;
        if (Math.random() < changeFrequency) {
          if (state.swimDirection === "vertical") {
            // Flip between up and down
            state.verticalDirection *= -1;
          } else if (state.swimDirection === "horizontal") {
            // Flip between left and right
            newDirection =
              newDirection < Math.PI / 2 || newDirection > (3 * Math.PI) / 2
                ? Math.PI
                : 0;
          } else {
            // Normal swimmers: favor horizontal angles when changing direction
            // 70% chance for mostly horizontal, 30% chance for any direction
            if (Math.random() < 0.7) {
              // Mostly horizontal direction (within ±30° of horizontal)
              const baseAngle = Math.random() < 0.5 ? 0 : Math.PI;
              newDirection = baseAngle + (Math.random() - 0.5) * (Math.PI / 3);
            } else {
              newDirection += (Math.random() - 0.5) * 1.0;
            }
          }
        }

        state.x = newX;
        state.y = newY;
        state.direction = newDirection;

        // Determine rotation and scaling
        let rotationAngle = 0;
        let scaleX = 1;
        let scaleY = 1;

        if (state.swimDirection === "vertical") {
          // Vertical swimmers: keep original orientation, no rotation
          rotationAngle = 0;
        } else {
          // Horizontal and normal swimmers: flip horizontally when facing left
          const normalizedDir =
            ((newDirection % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
          const isFacingLeft =
            normalizedDir > Math.PI / 2 && normalizedDir < (3 * Math.PI) / 2;

          if (isFacingLeft) {
            // Flip horizontally and adjust rotation for left-facing
            scaleX = -1;
            rotationAngle = Math.PI - normalizedDir;
          } else {
            rotationAngle = normalizedDir;
          }
        }

        // Update DOM element
        const element = document.getElementById(`fish-${fishData.id}`);
        if (element) {
          element.style.transform = `translate(${newX}px, ${newY}px) scaleX(${scaleX}) scaleY(${scaleY}) rotate(${rotationAngle}rad)`;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [fish, isRunning]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      {fish.map((fishData) => {
        // Calculate initial orientation based on swim direction
        let scaleX = 1;
        let scaleY = 1;
        let rotationAngle = 0;

        if (fishData.swimDirection === "vertical") {
          // Vertical swimmers: keep original orientation
          rotationAngle = 0;
        } else {
          // Horizontal and normal swimmers: use their initial direction
          const normalizedDir =
            ((fishData.direction % (Math.PI * 2)) + Math.PI * 2) %
            (Math.PI * 2);
          const isFacingLeft =
            normalizedDir > Math.PI / 2 && normalizedDir < (3 * Math.PI) / 2;
          scaleX = isFacingLeft ? -1 : 1;
          rotationAngle = isFacingLeft
            ? Math.PI - normalizedDir
            : normalizedDir;
        }

        return (
          <div
            key={fishData.id}
            id={`fish-${fishData.id}`}
            className="absolute"
            style={{
              width: `${fishData.size}px`,
              height: `${fishData.size}px`,
              transform: `translate(${fishData.x}px, ${fishData.y}px) scaleX(${scaleX}) scaleY(${scaleY}) rotate(${rotationAngle}rad)`,
              transformOrigin: "center center",
              transition: "none",
            }}
          >
            <img
              src={fishData.svgPath}
              alt="fish"
              className="w-full h-full"
              style={{ pointerEvents: "none" }}
            />
          </div>
        );
      })}
    </div>
  );
}
