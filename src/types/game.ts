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
}

export interface GameState {
  fish: Fish[];
  isRunning: boolean;
  aquariumWidth: number;
  aquariumHeight: number;
  addFish: (svgPath: string) => void;
  removeFish: (id: string) => void;
  updateFish: (id: string, updates: Partial<Fish>) => void;
  toggleRunning: () => void;
  setAquariumSize: (width: number, height: number) => void;
}

export const FISH_MODELS: FishModel[] = [
  {
    id: "yellowfish",
    name: "Yellow Fish",
    path: "/fish/yellowish.svg",
    swimDirection: "normal",
    maxSpeed: 2.5,
  },
  {
    id: "clownfish",
    name: "Clownfish",
    path: "/fish/clown-fish.svg",
    swimDirection: "normal",
    maxSpeed: 1.5,
  },
  {
    id: "clown-fish-2",
    name: "Clown Fish 2",
    path: "/fish/clown-fish-2.svg",
    swimDirection: "normal",
    maxSpeed: 1.5,
  },
  {
    id: "tiger-fish",
    name: "Tiger Fish",
    path: "/fish/tiger-fish.svg",
    swimDirection: "normal",
    maxSpeed: 2.0,
  },
  {
    id: "ami-fish",
    name: "Ami Fish",
    path: "/fish/ami-fish.svg",
    swimDirection: "normal",
    maxSpeed: 1.8,
  },
  {
    id: "starfish",
    name: "Starfish",
    path: "/fish/starfish.svg",
    swimDirection: "normal",
    maxSpeed: 0.5,
  },
  {
    id: "jelly-fish",
    name: "Jellyfish",
    path: "/fish/jelly-fish.svg",
    swimDirection: "vertical",
    maxSpeed: 0.2,
  },
  {
    id: "gold-fish",
    name: "Goldfish",
    path: "/fish/gold-fish.svg",
    swimDirection: "normal",
    maxSpeed: 2.0,
  },
  {
    id: "fresh-fish",
    name: "Fresh Fish",
    path: "/fish/fresh-fish.svg",
    swimDirection: "normal",
    maxSpeed: 1.2,
  },
  {
    id: "colorful-fish",
    name: "Colorful Fish",
    path: "/fish/colorful-fish.png",
    swimDirection: "normal",
    maxSpeed: 1.7,
  },
  {
    id: "marine-fish",
    name: "Marine Fish",
    path: "/fish/marine-fish.svg",
    swimDirection: "normal",
    maxSpeed: 1.5,
  },
  {
    id: "green-fish",
    name: "Green Fish",
    path: "/fish/green-fish.png",
    swimDirection: "normal",
    maxSpeed: 1.5,
  },
  {
    id: "exotic-fish",
    name: "Exotic Fish",
    path: "/fish/exotic-fish.svg",
    swimDirection: "normal",
    maxSpeed: 2.0,
  },
  {
    id: "ornamental-fish",
    name: "Ornamental Fish",
    path: "/fish/ornamental-fish.svg",
    swimDirection: "normal",
    maxSpeed: 1.8,
  },
];
