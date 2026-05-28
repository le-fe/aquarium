export interface Fish {
  id: string;
  x: number;
  y: number;
  speed: number;
  color: string;
  size: number;
  direction: number;
}

export interface GameState {
  fish: Fish[];
  isRunning: boolean;
  aquariumWidth: number;
  aquariumHeight: number;
  addFish: () => void;
  removeFish: (id: string) => void;
  updateFish: (id: string, updates: Partial<Fish>) => void;
  toggleRunning: () => void;
  setAquariumSize: (width: number, height: number) => void;
}
