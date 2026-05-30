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
  sizeRatio: number; // Maximum size ratio (0.5 = small max, 1.0 = medium max, 1.5 = large max). Actual fish size will be 50-100% of this.
}

export interface Decorator {
  id: string;
  imagePath: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DecoratorModel {
  id: string;
  name: string;
  path: string;
  defaultWidth: number;
}

export interface GameState {
  fish: Fish[];
  decorators: Decorator[];
  isRunning: boolean;
  moveMode: boolean;
  lightsMode: "off" | "medium" | "bright";
  aquariumWidth: number;
  aquariumHeight: number;
  wallpaper: string;
  selectedItem: { type: "fish" | "decorator"; id: string } | null;
  addFish: (svgPath: string) => void;
  removeFish: (id: string) => void;
  updateFish: (id: string, updates: Partial<Fish>) => void;
  addDecorator: (imagePath: string) => void;
  removeDecorator: (id: string) => void;
  updateDecorator: (id: string, updates: Partial<Decorator>) => void;
  toggleRunning: () => void;
  toggleMoveMode: () => void;
  cycleLightsMode: () => void;
  setAquariumSize: (width: number, height: number) => void;
  setWallpaper: (wallpaper: string) => void;
  setSelectedItem: (
    item: { type: "fish" | "decorator"; id: string } | null,
  ) => void;
}

export const WALLPAPERS = [
  "/wallpaper/8297855.jpg",
  "/wallpaper/7070.jpg",
  "/wallpaper/265125.jpg",
  "/wallpaper/9300739.jpg",
  // Add more wallpapers here as they are added to the public/wallpaper folder
];

export const DECORATORS: DecoratorModel[] = [
  {
    id: "rocky-garden",
    name: "Rocky Garden",
    path: "/decorators/rocky-garden.png",
    defaultWidth: 200,
  },
  {
    id: "green-moss-surrounded-by-lush-foliage",
    name: "Green Moss Surrounded by Lush Foliage",
    path: "/decorators/green-moss-surrounded-by-lush-foliage.png",
    defaultWidth: 200,
  },
  {
    id: "rocky-heap",
    name: "Rocky Heap",
    path: "/decorators/rocky-heap.png",
    defaultWidth: 100,
  },
  {
    id: "large-rocks-covered-in-vibrant-green-moss-surrounded",
    name: "Large Rocks Covered in Vibrant Green Moss Surrounded",
    path: "/decorators/large-rocks-covered-in-vibrant-green-moss-surrounded.png",
    defaultWidth: 250,
  },
  {
    id: "buddha-statue-representing-peace-and-wisdom",
    name: "Buddha Statue Representing Peace and Wisdom",
    path: "/decorators/buddha-statue-representing-peace-and-wisdom.png",
    defaultWidth: 150,
  },
  {
    id: "buddha-statue-representing-peace-and-wisdom-isolated_57447268",
    name: "Buddha Statue Representing Peace and Wisdom Isolated",
    path: "/decorators/buddha-statue-representing-peace-and-wisdom-isolated_57447268.png",
    defaultWidth: 150,
  },
];

export const FISH_MODELS: FishModel[] = [
  {
    id: "yellow-fish",
    name: "Yellow Fish",
    path: "/fish/yellow-fish.png",
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
    id: "red-fish",
    name: "Red Fish",
    path: "/fish/red-fish.svg",
    swimDirection: "normal",
    maxSpeed: 1.5,
    sizeRatio: 0.9,
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
    id: "red-sea-clown-tang-fish",
    name: "Red Sea Clown Tang Fish",
    path: "/fish/red-sea-clown-tang-fish.png",
    swimDirection: "normal",
    maxSpeed: 1.5,
    sizeRatio: 0.6,
  },
  {
    id: "red-sea-clown-tang-fish-2",
    name: "Red Sea Clown Tang Fish 2",
    path: "/fish/red-sea-clown-tang-fish-2.png",
    swimDirection: "normal",
    maxSpeed: 1.5,
    sizeRatio: 0.6,
  },
  {
    id: "tropical-fish",
    name: "Tropical Fish",
    path: "/fish/tropical-fish.png",
    swimDirection: "normal",
    maxSpeed: 1.5,
    sizeRatio: 0.9,
  },
  {
    id: "angelfish-vibrant-yellow-and-blue-tropical-fish",
    name: "Angelfish - Vibrant Yellow and Blue Tropical Fish",
    path: "/fish/angelfish-vibrant-yellow-and-blue-tropical-fish.png",
    swimDirection: "normal",
    maxSpeed: 1.5,
    sizeRatio: 1.2,
  },
  {
    id: "blue-chromis",
    name: "Blue Chromis",
    path: "/fish/blue-chromis.png",
    swimDirection: "normal",
    maxSpeed: 1.5,
    sizeRatio: 0.5,
  },
  {
    id: "golden-fish",
    name: "Golden Fish",
    path: "/fish/golden-fish.png",
    swimDirection: "normal",
    maxSpeed: 1.5,
    sizeRatio: 1.0,
  },
  {
    id: "siamese-fish",
    name: "Siamese Fish",
    path: "/fish/siamese-fish.png",
    swimDirection: "normal",
    maxSpeed: 1.5,
    sizeRatio: 0.8,
  },
];
