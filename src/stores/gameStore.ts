import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Fish, GameState, FISH_MODELS } from "@/types/game";

const createRandomFish = (
  width: number,
  height: number,
  svgPath: string,
  maxSpeed: number,
  swimDirection: "normal" | "vertical" | "horizontal",
): Fish => {
  // Initialize direction based on swim direction type
  let initialDirection: number;

  if (swimDirection === "normal") {
    // Normal swimmers: 70% chance for mostly horizontal (within ±30° of horizontal)
    if (Math.random() < 0.7) {
      const baseAngle = Math.random() < 0.5 ? 0 : Math.PI;
      initialDirection = baseAngle + (Math.random() - 0.5) * (Math.PI / 3);
    } else {
      initialDirection = Math.random() * Math.PI * 2;
    }
  } else {
    // Vertical and horizontal swimmers: random direction (will be constrained in animation)
    initialDirection = Math.random() * Math.PI * 2;
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    x: Math.random() * width,
    y: Math.random() * height,
    speed: maxSpeed * (0.5 + Math.random() * 0.5), // Random speed: 50% to 100% of maxSpeed
  };
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      fish: [], // Start with empty aquarium
      isRunning: true,
      aquariumWidth: 800,
      aquariumHeight: 600,

      addFish: (svgPath: string) =>
        set((state) => {
          // Find the fish model to get its max speed and swim direction
          const model = FISH_MODELS.find((m) => m.path === svgPath);
          const maxSpeed = model?.maxSpeed ?? 2; // Default max speed if not found
          const swimDirection = model?.swimDirection ?? "normal"; // Default direction

          return {
            fish: [
              ...state.fish,
              createRandomFish(
                state.aquariumWidth,
                state.aquariumHeight,
                svgPath,
                maxSpeed,
                swimDirection,
              ),
            ],
          };
        }),

      removeFish: (id: string) =>
        set((state) => ({
          fish: state.fish.filter((f) => f.id !== id),
        })),

      updateFish: (id: string, updates: Partial<Fish>) =>
        set((state) => ({
          fish: state.fish.map((f) => (f.id === id ? { ...f, ...updates } : f)),
        })),

      toggleRunning: () =>
        set((state) => ({
          isRunning: !state.isRunning,
        })),

      setAquariumSize: (width: number, height: number) =>
        set({
          aquariumWidth: width,
          aquariumHeight: height,
        }),
    }),
    {
      name: "aquarium-storage", // localStorage key
      partialize: (state) => ({
        fish: state.fish,
        isRunning: state.isRunning,
      }),
    },
  ),
);
