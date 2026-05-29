"use client";

import { useGameStore } from "@/stores/gameStore";
import { FISH_MODELS, DECORATORS } from "@/types/game";
import { X, Trash2, Move, Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";

export default function ItemSidebar() {
  const {
    selectedItem,
    fish,
    decorators,
    removeFish,
    removeDecorator,
    updateDecorator,
    setSelectedItem,
    toggleMoveMode,
    moveMode,
  } = useGameStore();

  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  // Get item details
  let itemDetails: any = null;
  let modelInfo: any = null;

  if (selectedItem) {
    if (selectedItem.type === "fish") {
      itemDetails = fish.find((f) => f.id === selectedItem.id);
      if (itemDetails) {
        modelInfo = FISH_MODELS.find((m) => m.path === itemDetails.svgPath);
      }
    } else {
      itemDetails = decorators.find((d) => d.id === selectedItem.id);
      if (itemDetails) {
        modelInfo = DECORATORS.find((m) => m.path === itemDetails.imagePath);
      }
    }
  }

  // Load image to get aspect ratio for decorators
  useEffect(() => {
    if (selectedItem?.type === "decorator" && itemDetails?.imagePath) {
      const img = new Image();
      img.src = itemDetails.imagePath;
      img.onload = () => {
        setAspectRatio(img.naturalHeight / img.naturalWidth);
      };
    } else {
      setAspectRatio(null);
    }
  }, [selectedItem, itemDetails?.imagePath]);

  // Handle keyboard shortcuts for decorator width adjustment
  useEffect(() => {
    if (selectedItem?.type !== "decorator" || !aspectRatio) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Check if user is typing in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const decorator = decorators.find((d) => d.id === selectedItem.id);
      if (!decorator) return;

      let newWidth = decorator.width;
      const step = 10; // Adjust by 10px at a time

      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        newWidth = Math.min(decorator.width + step, 500); // Max width 500px
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        newWidth = Math.max(decorator.width - step, 50); // Min width 50px
      } else {
        return;
      }

      // Calculate new height based on aspect ratio
      const newHeight = newWidth * aspectRatio;

      updateDecorator(selectedItem.id, {
        width: newWidth,
        height: newHeight,
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedItem, decorators, aspectRatio, updateDecorator]);

  // Early returns after all hooks
  if (!selectedItem) return null;
  if (!itemDetails) return null;

  const handleClose = () => {
    setSelectedItem(null);
  };

  const handleRemove = () => {
    if (selectedItem.type === "fish") {
      removeFish(selectedItem.id);
    } else {
      removeDecorator(selectedItem.id);
    }
    setSelectedItem(null);
  };

  const handleMove = () => {
    if (!moveMode) {
      toggleMoveMode();
    }
  };

  const handleDecoratorWidthAdjust = (increase: boolean) => {
    if (selectedItem?.type !== "decorator" || !aspectRatio) return;

    const decorator = decorators.find((d) => d.id === selectedItem.id);
    if (!decorator) return;

    const step = 10;
    let newWidth = increase
      ? Math.min(decorator.width + step, 500)
      : Math.max(decorator.width - step, 50);

    const newHeight = newWidth * aspectRatio;

    updateDecorator(selectedItem.id, {
      width: newWidth,
      height: newHeight,
    });
  };

  return (
    <div
      className="fixed top-20 right-4 w-80 rounded-xl shadow-2xl border border-white/30 z-50 backdrop-blur-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)",
        maxHeight: "calc(100vh - 100px)",
      }}
    >
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between border-b border-gray-200"
        style={{
          background:
            "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)",
        }}
      >
        <h3 className="text-lg font-bold text-gray-800">
          {selectedItem.type === "fish" ? "Fish Details" : "Decorator Details"}
        </h3>
        <button
          onClick={handleClose}
          className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div
        className="p-4 space-y-4 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 240px)" }}
      >
        {/* Preview Image */}
        <div className="flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
          <img
            src={
              selectedItem.type === "fish"
                ? itemDetails.svgPath
                : itemDetails.imagePath
            }
            alt={modelInfo?.name || "Item"}
            className="max-w-full max-h-32 object-contain"
          />
        </div>

        {/* Name */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Name
          </label>
          <p className="text-sm font-semibold text-gray-800 mt-1">
            {modelInfo?.name || "Unknown"}
          </p>
        </div>

        {/* Type-specific details */}
        {selectedItem.type === "fish" ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Size
                </label>
                <p className="text-sm text-gray-800 mt-1">
                  {itemDetails.size.toFixed(0)}px
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Speed
                </label>
                <p className="text-sm text-gray-800 mt-1">
                  {itemDetails.speed.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Position X
                </label>
                <p className="text-sm text-gray-800 mt-1">
                  {itemDetails.x.toFixed(0)}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Position Y
                </label>
                <p className="text-sm text-gray-800 mt-1">
                  {itemDetails.y.toFixed(0)}
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Swim Direction
              </label>
              <p className="text-sm text-gray-800 mt-1 capitalize">
                {itemDetails.swimDirection}
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Width Adjustment Controls */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                Size (Width)
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecoratorWidthAdjust(false)}
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                  title="Decrease width (or press -)"
                >
                  <Minus className="w-4 h-4 text-gray-700" />
                </button>
                <div className="flex-1 text-center">
                  <p className="text-lg font-bold text-gray-800">
                    {itemDetails.width}px
                  </p>
                  <p className="text-xs text-gray-500">
                    Height: {itemDetails.height.toFixed(0)}px (auto)
                  </p>
                </div>
                <button
                  onClick={() => handleDecoratorWidthAdjust(true)}
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                  title="Increase width (or press +)"
                >
                  <Plus className="w-4 h-4 text-gray-700" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press{" "}
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs">
                  +
                </kbd>{" "}
                or{" "}
                <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs">
                  -
                </kbd>{" "}
                to adjust
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Position X
                </label>
                <p className="text-sm text-gray-800 mt-1">
                  {itemDetails.x.toFixed(0)}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Position Y
                </label>
                <p className="text-sm text-gray-800 mt-1">
                  {itemDetails.y.toFixed(0)}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={handleMove}
          className="w-full px-4 py-2.5 rounded-lg font-semibold text-white transition-all hover:scale-105 transform shadow-lg flex items-center justify-center gap-2"
          style={{
            background: moveMode
              ? "linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(22, 163, 74, 0.8) 100%)"
              : "linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.8) 100%)",
          }}
        >
          <Move className="w-4 h-4" />
          {moveMode ? "Move Mode Active" : "Move"}
        </button>

        <button
          onClick={handleRemove}
          className="w-full px-4 py-2.5 rounded-lg font-semibold text-white transition-all hover:scale-105 transform shadow-lg flex items-center justify-center gap-2"
          style={{
            background:
              "linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(220, 38, 38, 0.8) 100%)",
          }}
        >
          <Trash2 className="w-4 h-4" />
          Remove
        </button>
      </div>
    </div>
  );
}
