import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Fish,
  Decorator,
  GameState,
  FISH_MODELS,
  DECORATORS,
} from "@/types/game";

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

  // Base size 60px, scaled by sizeRatio as maximum with 50-100% variation
  const baseSize = 60;
  const size = baseSize * sizeRatio * (0.5 + Math.random() * 0.5);

  // Keep fish below water surface (50px)
  const surfaceHeight = 50;
  const minY = surfaceHeight + size / 2;
  const maxY = height - size / 2;
  const y = minY + Math.random() * (maxY - minY);

  return {
    id: Math.random().toString(36).substr(2, 9),
    x: Math.random() * width,
    y: y,
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
      decorators: [], // Start with no decorators
      isRunning: true,
      moveMode: false,
      lightsMode: "bright",
      aquariumWidth: 800,
      aquariumHeight: 600,
      wallpaper: "/wallpaper/8297855.jpg",
      selectedItem: null,

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
          selectedItem:
            state.selectedItem?.id === id ? null : state.selectedItem,
        })),

      updateFish: (id: string, updates: Partial<Fish>) =>
        set((state) => ({
          fish: state.fish.map((f) => (f.id === id ? { ...f, ...updates } : f)),
        })),

      toggleRunning: () =>
        set((state) => ({
          isRunning: !state.isRunning,
        })),

      toggleMoveMode: () =>
        set((state) => ({
          moveMode: !state.moveMode,
        })),

      cycleLightsMode: () =>
        set((state) => ({
          lightsMode:
            state.lightsMode === "bright"
              ? "medium"
              : state.lightsMode === "medium"
                ? "off"
                : "bright",
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

      addDecorator: (imagePath: string) =>
        set((state) => {
          // Find decorator model
          const model = DECORATORS.find((d) => d.path === imagePath);
          const width = model?.defaultWidth ?? 200;

          // Load image to get natural dimensions and calculate height
          const img = new Image();
          img.src = imagePath;

          const decoratorId = Math.random().toString(36).substr(2, 9);

          // Use temporary height until image loads
          const tempHeight = width; // Square as placeholder
          const x = Math.random() * (state.aquariumWidth - width);
          const y = state.aquariumHeight - tempHeight - 40; // 40px above ground

          // Add decorator with temporary dimensions
          const newDecorators = [
            ...state.decorators,
            {
              id: decoratorId,
              imagePath,
              x,
              y,
              width,
              height: tempHeight,
            },
          ];

          // Update height when image loads
          img.onload = () => {
            const aspectRatio = img.naturalHeight / img.naturalWidth;
            const calculatedHeight = width * aspectRatio;
            const currentState = useGameStore.getState();
            const decorator = currentState.decorators.find(
              (d) => d.id === decoratorId,
            );
            if (decorator) {
              currentState.updateDecorator(decoratorId, {
                height: calculatedHeight,
                y: currentState.aquariumHeight - calculatedHeight - 40,
              });
            }
          };

          return {
            decorators: newDecorators,
          };
        }),

      removeDecorator: (id: string) =>
        set((state) => ({
          decorators: state.decorators.filter((d) => d.id !== id),
          selectedItem:
            state.selectedItem?.id === id ? null : state.selectedItem,
        })),

      updateDecorator: (id: string, updates: Partial<Decorator>) =>
        set((state) => ({
          decorators: state.decorators.map((d) =>
            d.id === id ? { ...d, ...updates } : d,
          ),
        })),

      setSelectedItem: (
        item: { type: "fish" | "decorator"; id: string } | null,
      ) =>
        set({
          selectedItem: item,
        }),
    }),
    {
      name: "aquarium-storage", // localStorage key
      partialize: (state) => ({
        fish: state.fish,
        decorators: state.decorators,
        isRunning: state.isRunning,
      }),
    },
  ),
);
