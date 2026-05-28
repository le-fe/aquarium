"use client";

import { useGameStore } from "@/stores/gameStore";

export default function GameControls() {
  const { fish, isRunning, addFish, removeFish, toggleRunning } =
    useGameStore();

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center p-6 bg-linear-to-r from-cyan-900 to-blue-900 rounded-lg shadow-lg">
      <button
        onClick={addFish}
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors shadow-md"
      >
        🐠 Add Fish
      </button>

      <button
        onClick={toggleRunning}
        className={`px-6 py-3 font-semibold rounded-lg transition-colors shadow-md ${
          isRunning
            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {isRunning ? "⏸️ Pause" : "▶️ Play"}
      </button>

      {fish.length > 0 && (
        <button
          onClick={() =>
            fish[fish.length - 1] && removeFish(fish[fish.length - 1].id)
          }
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors shadow-md"
        >
          🗑️ Remove Fish
        </button>
      )}

      <div className="px-6 py-3 bg-cyan-800 text-cyan-100 font-semibold rounded-lg shadow-md">
        Fish Count: {fish.length}
      </div>
    </div>
  );
}
