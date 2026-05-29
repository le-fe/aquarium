"use client";

import { useGameStore } from "@/stores/gameStore";
import { FISH_MODELS, WALLPAPERS } from "@/types/game";
import { useState, useEffect, useRef } from "react";
import {
  Fish,
  Plus,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Hand,
  Image,
} from "lucide-react";

export default function GameControls() {
  const {
    fish,
    isRunning,
    fishingNetMode,
    moveMode,
    wallpaper,
    addFish,
    toggleRunning,
    toggleFishingNet,
    toggleMoveMode,
    setWallpaper,
  } = useGameStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWallpaperDropdownOpen, setIsWallpaperDropdownOpen] = useState(false);
  const [isFishListOpen, setIsFishListOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const wallpaperDropdownRef = useRef<HTMLDivElement>(null);
  const fishListRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        wallpaperDropdownRef.current &&
        !wallpaperDropdownRef.current.contains(event.target as Node)
      ) {
        setIsWallpaperDropdownOpen(false);
      }
      if (
        fishListRef.current &&
        !fishListRef.current.contains(event.target as Node)
      ) {
        setIsFishListOpen(false);
      }
    };

    if (isDropdownOpen || isWallpaperDropdownOpen || isFishListOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isWallpaperDropdownOpen, isFishListOpen]);

  // Cancel Move or Fishing mode when pressing Esc
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (fishingNetMode) {
          toggleFishingNet();
        } else if (moveMode) {
          toggleMoveMode();
        }
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [fishingNetMode, moveMode, toggleFishingNet, toggleMoveMode]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Header */}
      <div className="text-lg font-bold text-white flex items-center gap-1.5">
        <Fish className="w-4 h-4" />
        <span>Aquarium</span>
        <Fish className="w-4 h-4" />
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-white/30"></div>

      {/* Add Fish Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="px-3 py-1.5 text-sm font-semibold rounded-lg transition-all shadow-lg hover:scale-105 transform border border-white/30 flex items-center gap-1.5"
          style={{
            background:
              "linear-gradient(135deg, rgba(16, 185, 129, 0.6) 0%, rgba(5, 150, 105, 0.6) 100%)",
            color: "white",
          }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Fish</span>
          {isDropdownOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {/* Dropdown Panel */}
        {isDropdownOpen && (
          <div
            className="absolute top-full left-0 mt-2 p-4 rounded-xl shadow-2xl border border-white/30 z-50 backdrop-blur-xl overflow-x-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)",
              minWidth: "1200px",
              maxWidth: "90vw",
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            <h3 className="text-gray-800 font-semibold text-sm mb-3">
              Select a Fish
            </h3>
            <div className="grid grid-cols-8 md:grid-cols-16 gap-2">
              {FISH_MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    addFish(model.path);
                    setIsDropdownOpen(false);
                  }}
                  className="group relative aspect-square p-1.5 rounded-lg transition-all hover:scale-110 transform hover:bg-gray-100 flex items-center justify-center border border-gray-200"
                >
                  <img
                    src={model.path}
                    alt={model.name}
                    className="w-full h-full object-contain"
                  />
                  {/* Size Ratio Badge */}
                  <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-semibold">
                    {model.sizeRatio.toFixed(1)}x
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {model.name} (Size: {model.sizeRatio.toFixed(1)}x)
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <button
        onClick={toggleRunning}
        className="group relative px-2.5 py-1.5 font-semibold rounded-lg transition-all shadow-lg hover:scale-105 transform border border-white/30 flex items-center gap-2"
        style={{
          background: isRunning
            ? "linear-gradient(135deg, rgba(245, 158, 11, 0.6) 0%, rgba(217, 119, 6, 0.6) 100%)"
            : "linear-gradient(135deg, rgba(59, 130, 246, 0.6) 0%, rgba(37, 99, 235, 0.6) 100%)",
          color: "white",
        }}
      >
        {isRunning ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          {isRunning ? "Pause" : "Play"}
        </div>
      </button>

      <button
        onClick={toggleFishingNet}
        className="group relative px-2.5 py-1.5 font-semibold rounded-lg transition-all shadow-lg hover:scale-105 transform border border-white/30 flex items-center gap-2"
        style={{
          background: fishingNetMode
            ? "linear-gradient(135deg, rgba(139, 92, 246, 0.6) 0%, rgba(109, 40, 217, 0.6) 100%)"
            : "linear-gradient(135deg, rgba(107, 114, 128, 0.6) 0%, rgba(75, 85, 99, 0.6) 100%)",
          color: "white",
        }}
      >
        <img
          src="/icons/fishing-net.svg"
          alt="fishing net"
          className="w-4 h-4"
          style={{ filter: "brightness(0) invert(1)" }}
        />
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          {fishingNetMode ? "Fishing..." : "Fishing Net"}
        </div>
      </button>

      <button
        onClick={toggleMoveMode}
        className="group relative px-2.5 py-1.5 font-semibold rounded-lg transition-all shadow-lg hover:scale-105 transform border border-white/30 flex items-center gap-2"
        style={{
          background: moveMode
            ? "linear-gradient(135deg, rgba(34, 197, 94, 0.6) 0%, rgba(22, 163, 74, 0.6) 100%)"
            : "linear-gradient(135deg, rgba(107, 114, 128, 0.6) 0%, rgba(75, 85, 99, 0.6) 100%)",
          color: "white",
        }}
      >
        <Hand className="w-4 h-4" />
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          {moveMode ? "Moving..." : "Move"}
        </div>
      </button>

      {/* Wallpaper Selector */}
      <div className="relative" ref={wallpaperDropdownRef}>
        <button
          onClick={() => setIsWallpaperDropdownOpen(!isWallpaperDropdownOpen)}
          className="group relative px-2.5 py-1.5 font-semibold rounded-lg transition-all shadow-lg hover:scale-105 transform border border-white/30 flex items-center gap-2"
          style={{
            background:
              "linear-gradient(135deg, rgba(168, 85, 247, 0.6) 0%, rgba(147, 51, 234, 0.6) 100%)",
            color: "white",
          }}
        >
          <Image className="w-4 h-4" />
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            Wallpaper
          </div>
        </button>

        {/* Wallpaper Dropdown Panel */}
        {isWallpaperDropdownOpen && (
          <div
            className="absolute top-full left-0 mt-2 p-4 rounded-xl shadow-2xl border border-white/30 z-50 backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)",
              minWidth: "300px",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            <h3 className="text-gray-800 font-semibold text-sm mb-3">
              Select Wallpaper
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {WALLPAPERS.map((wp) => (
                <button
                  key={wp}
                  onClick={() => {
                    setWallpaper(wp);
                    setIsWallpaperDropdownOpen(false);
                  }}
                  className={`group relative aspect-video rounded-lg overflow-hidden transition-all hover:scale-105 transform border-2 ${
                    wallpaper === wp
                      ? "border-blue-500 ring-2 ring-blue-300"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={wp}
                    alt="wallpaper"
                    className="w-full h-full object-cover"
                  />
                  {wallpaper === wp && (
                    <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                      <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Selected
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-white/30"></div>

      {/* Fish Count */}
      <div className="relative" ref={fishListRef}>
        <button
          onClick={() => setIsFishListOpen(!isFishListOpen)}
          className="px-3 py-1.5 text-white text-sm font-semibold rounded-lg shadow-lg border border-white/30 hover:scale-105 transition-all transform cursor-pointer"
          style={{
            background:
              "linear-gradient(135deg, rgba(14, 165, 233, 0.4) 0%, rgba(8, 145, 178, 0.4) 100%)",
          }}
        >
          Fish: {fish.length}
        </button>

        {/* Fish List Dropdown */}
        {isFishListOpen && (
          <div
            className="absolute top-full right-0 mt-2 p-4 rounded-xl shadow-2xl border border-white/30 z-50 backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)",
              minWidth: "300px",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            <h3 className="text-gray-800 font-semibold text-sm mb-3">
              Current Fish ({fish.length})
            </h3>
            {fish.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">
                No fish in the aquarium yet.
              </p>
            ) : (
              <div className="space-y-2">
                {[...fish].reverse().map((f) => {
                  const model = FISH_MODELS.find((m) => m.path === f.svgPath);
                  return (
                    <div
                      key={f.id}
                      className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 bg-white/50 hover:bg-white/80 transition-colors"
                    >
                      <img
                        src={f.svgPath}
                        alt="fish"
                        className="w-10 h-10 object-contain"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {model?.name || "Unknown Fish"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Size: {f.size.toFixed(0)}px
                        </p>
                      </div>
                      <button
                        onClick={() => removeFish(f.id)}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Spacer for footer */}
      <div className="flex-1"></div>

      {/* Footer Info */}
      <div className="text-white/70 text-xs">
        Made by{" "}
        <a
          className="underline font-medium"
          href="https://timle.me/"
          target="_blank"
        >
          Tim Le
        </a>
      </div>
    </div>
  );
}
