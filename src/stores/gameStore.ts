import { create } from "zustand";
import { Fish, GameState } from "@/types/game";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
];

const createRandomFish = (width: number, height: number): Fish => ({
  id: Math.random().toString(36).substr(2, 9),
  x: Math.random() * width,
  y: Math.random() * height,
  speed: 0.3 + Math.random() * 0.5,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  size: 20 + Math.random() * 30,
  direction: Math.random() * Math.PI * 2,
});

export const useGameStore = create<GameState>((set) => {
  // Initialize with 5 random fish
  const initialFish = Array.from({ length: 5 }, () =>
    createRandomFish(800, 600),
  );

  return {
    fish: initialFish,
    isRunning: true,
    aquariumWidth: 800,
    aquariumHeight: 600,

    addFish: () =>
      set((state) => ({
        fish: [
          ...state.fish,
          createRandomFish(state.aquariumWidth, state.aquariumHeight),
        ],
      })),

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
  };
});
