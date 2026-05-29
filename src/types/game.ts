export interface Fish {
  id: string;
  x: number;
  y: number;
  speed: number;
  size: number;
  direction: number;
  svgPath: string;
  swimDirection: "normal" | "vertical" | "horizontal";
}

export interface FishModel {
  id: string;
  name: string;
  path: string;
  swimDirection: "normal" | "vertical" | "horizontal";
  maxSpeed: number;
  sizeRatio: number; // 0.5 = small, 1.0 = medium, 1.5 = large
}

export interface GameState {
  fish: Fish[];
  isRunning: boolean;
  fishingNetMode: boolean;
  moveMode: boolean;
  aquariumWidth: number;
  aquariumHeight: number;
  wallpaper: string;
  addFish: (svgPath: string) => void;
  removeFish: (id: string) => void;
  updateFish: (id: string, updates: Partial<Fish>) => void;
  toggleRunning: () => void;
  toggleFishingNet: () => void;
  toggleMoveMode: () => void;
  setAquariumSize: (width: number, height: number) => void;
  setWallpaper: (wallpaper: string) => void;
}

export const WALLPAPERS = [
  "/wallpaper/8297855.jpg",
  "/wallpaper/7070.jpg",
  "/wallpaper/265125.jpg",
  "/wallpaper/9300739.jpg",
  // Add more wallpapers here as they are added to the public/wallpaper folder
];

export const FISH_MODELS: FishModel[] = [
  {
    id: "yellowfish",
    name: "Yellow Fish",
    path: "/fish/yellowish.svg",
    swimDirection: "normal",
    maxSpeed: 2.5,
    sizeRatio: 1.0,
  },
  {
    id: "clownfish",
    name: "Clownfish",
    path: "/fish/clown-fish.svg",
    swimDirection: "normal",
    maxSpeed: 1.5,
    sizeRatio: 0.8,
  },
  {
    id: "clown-fish-2",
    name: "Clown Fish 2",
    path: "/fish/clown-fish-2.svg",
    swimDirection: "normal",
    maxSpeed: 1.5,
    sizeRatio: 0.8,
  },
  {
    id: "tiger-fish",
    name: "Tiger Fish",
    path: "/fish/tiger-fish.svg",
    swimDirection: "normal",
    maxSpeed: 2.0,
    sizeRatio: 1.2,
  },
  {
    id: "ami-fish",
    name: "Ami Fish",
    path: "/fish/ami-fish.svg",
    swimDirection: "normal",
    maxSpeed: 1.8,
    sizeRatio: 0.9,
  },
  {
    id: "starfish",
    name: "Starfish",
    path: "/fish/starfish.svg",
    swimDirection: "normal",
    maxSpeed: 0.5,
    sizeRatio: 0.6,
  },
  {
    id: "jelly-fish",
    name: "Jellyfish",
    path: "/fish/jelly-fish.svg",
    swimDirection: "vertical",
    maxSpeed: 0.2,
    sizeRatio: 1.3,
  },
  {
    id: "gold-fish",
    name: "Goldfish",
    path: "/fish/gold-fish.svg",
    swimDirection: "normal",
    maxSpeed: 2.0,
    sizeRatio: 0.9,
  },
  {
    id: "fresh-fish",
    name: "Fresh Fish",
    path: "/fish/fresh-fish.svg",
    swimDirection: "normal",
    maxSpeed: 1.2,
    sizeRatio: 0.7,
  },
  {
    id: "colorful-fish",
    name: "Colorful Fish",
    path: "/fish/colorful-fish.png",
    swimDirection: "normal",
    maxSpeed: 1.7,
    sizeRatio: 1.1,
  },
  {
    id: "marine-fish",
    name: "Marine Fish",
    path: "/fish/marine-fish.svg",
    swimDirection: "normal",
    maxSpeed: 1.5,
    sizeRatio: 1.0,
  },
  {
    id: "green-fish",
    name: "Green Fish",
    path: "/fish/green-fish.png",
    swimDirection: "normal",
    maxSpeed: 1.5,
    sizeRatio: 0.85,
  },
  {
    id: "exotic-fish",
    name: "Exotic Fish",
    path: "/fish/exotic-fish.svg",
    swimDirection: "normal",
    maxSpeed: 2.0,
    sizeRatio: 1.4,
  },
  {
    id: "ornamental-fish",
    name: "Ornamental Fish",
    path: "/fish/ornamental-fish.svg",
    swimDirection: "normal",
    maxSpeed: 1.8,
    sizeRatio: 1.0,
  },
  {
    id: "whale",
    name: "Whale",
    path: "/fish/whale.svg",
    swimDirection: "normal",
    maxSpeed: 0.6,
    sizeRatio: 6.0,
  },
  {
    id: "horse-fish",
    name: "Horse Fish",
    path: "/fish/horse-fish.svg",
    swimDirection: "vertical",
    maxSpeed: 1.5,
    sizeRatio: 1.0,
  },
  {
    id: "turtle",
    name: "Turtle",
    path: "/fish/turtle.png",
    swimDirection: "horizontal",
    maxSpeed: 0.5,
    sizeRatio: 2.0,
  },
  {
    id: "orange-blue-fish",
    name: "Orange Blue Fish",
    path: "/fish/orange-blue-fish.svg",
    swimDirection: "normal",
    maxSpeed: 1.5,
    sizeRatio: 0.9,
  },
];
