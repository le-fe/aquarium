"use client";

import { useGameStore } from "@/stores/gameStore";
import { FISH_MODELS } from "@/types/game";

export default function GameControls() {
  const { fish, isRunning, addFish, removeFish, toggleRunning } =
    useGameStore();

  return (
    <div
      className="backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
      }}
    >
      <div className="flex flex-col gap-3">
        {/* Fish Selection Section */}
        <div>
          <h3 className="text-white font-semibold text-sm text-center mb-2">
            Add Fish to Ocean
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {FISH_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => addFish(model.path)}
                className="group relative aspect-square p-1.5 rounded-lg transition-all hover:scale-110 transform hover:bg-white/10 flex items-center justify-center"
              >
                <img
                  src={model.path}
                  alt={model.name}
                  className="w-full h-full object-contain"
                />
                {/* Tooltip */}
                <div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-xl border border-white/30 shadow-2xl z-50"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)",
                  }}
                >
                  <div className="text-gray-800 font-semibold text-sm">
                    {model.name}
                  </div>
                  <div className="text-gray-600 text-xs">
                    Max Speed: {model.maxSpeed} |{" "}
                    {model.swimDirection === "vertical"
                      ? "Swims Vertically ↕"
                      : model.swimDirection === "horizontal"
                        ? "Swims Horizontally ↔"
                        : "Swims Freely ↗"}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/20"></div>

        {/* Control Buttons */}
        <button
          onClick={toggleRunning}
          className="w-full px-6 py-3 font-semibold rounded-xl transition-all shadow-lg hover:scale-105 transform border border-white/30"
          style={{
            background: isRunning
              ? "linear-gradient(135deg, rgba(245, 158, 11, 0.6) 0%, rgba(217, 119, 6, 0.6) 100%)"
              : "linear-gradient(135deg, rgba(59, 130, 246, 0.6) 0%, rgba(37, 99, 235, 0.6) 100%)",
            color: "white",
          }}
        >
          {isRunning ? "⏸️ Pause" : "▶️ Play"}
        </button>

        {fish.length > 0 && (
          <button
            onClick={() =>
              fish[fish.length - 1] && removeFish(fish[fish.length - 1].id)
            }
            className="w-full px-6 py-3 text-white font-semibold rounded-xl transition-all shadow-lg hover:scale-105 transform border border-white/30"
            style={{
              background:
                "linear-gradient(135deg, rgba(239, 68, 68, 0.6) 0%, rgba(220, 38, 38, 0.6) 100%)",
            }}
          >
            🗑️ Remove Last Fish
          </button>
        )}

        <div
          className="w-full px-6 py-3 text-white font-semibold rounded-xl shadow-lg text-center border border-white/30"
          style={{
            background:
              "linear-gradient(135deg, rgba(14, 165, 233, 0.4) 0%, rgba(8, 145, 178, 0.4) 100%)",
          }}
        >
          Fish Count: {fish.length}
        </div>

        {fish.length === 0 && (
          <div className="text-white/70 text-xs text-center px-2 py-3 rounded-lg bg-white/5">
            🌊 Your aquarium is empty. Add some fish to get started!
          </div>
        )}
      </div>
    </div>
  );
}
