import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Fish, GameState, FISH_MODELS } from "@/types/game";

const createRandomFish = (
  width: number,
  height: number,
  svgPath: string,
  maxSpeed: number,
  swimDirection: "normal" | "vertical" | "horizontal",
  sizeRatio: number,
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

  // Base size 60px, scaled by sizeRatio with ±20% variation
  const baseSize = 60;
  const size = baseSize * sizeRatio * (0.8 + Math.random() * 0.4);

  return {
    id: Math.random().toString(36).substr(2, 9),
    x: Math.random() * width,
    y: Math.random() * height,
    speed: maxSpeed * (0.5 + Math.random() * 0.5), // Random speed: 50% to 100% of maxSpeed
    size: size,
    direction: initialDirection,
    svgPath,
    swimDirection,
  };
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      fish: [], // Start with empty aquarium
      isRunning: true,
      fishingNetMode: false,
      moveMode: false,
      aquariumWidth: 800,
      aquariumHeight: 600,
      wallpaper: "/wallpaper/8297855.jpg",

      addFish: (svgPath: string) =>
        set((state) => {
          // Find the fish model to get its properties
          const model = FISH_MODELS.find((m) => m.path === svgPath);
          const maxSpeed = model?.maxSpeed ?? 2; // Default max speed if not found
          const swimDirection = model?.swimDirection ?? "normal"; // Default direction
          const sizeRatio = model?.sizeRatio ?? 1.0; // Default size ratio

          return {
            fish: [
              ...state.fish,
              createRandomFish(
                state.aquariumWidth,
                state.aquariumHeight,
                svgPath,
                maxSpeed,
                swimDirection,
                sizeRatio,
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

      toggleFishingNet: () =>
        set((state) => ({
          fishingNetMode: !state.fishingNetMode,
          moveMode: false, // Disable move mode when fishing net is enabled
        })),

      toggleMoveMode: () =>
        set((state) => ({
          moveMode: !state.moveMode,
          fishingNetMode: false, // Disable fishing net when move mode is enabled
        })),

      setAquariumSize: (width: number, height: number) =>
        set({
          aquariumWidth: width,
          aquariumHeight: height,
        }),

      setWallpaper: (wallpaper: string) =>
        set({
          wallpaper,
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
