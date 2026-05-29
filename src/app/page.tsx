"use client";

import Aquarium2D from "@/components/Aquarium2D";
import GameControls from "@/components/GameControls";
import OceanBackground from "@/components/OceanBackground";
import ItemSidebar from "@/components/ItemSidebar";
import { useGameStore } from "@/stores/gameStore";
import { useEffect, useRef } from "react";

export default function Home() {
  const { wallpaper, decorators, setSelectedItem, updateDecorator, moveMode } =
    useGameStore();

  const dragStateRef = useRef<{
    isDragging: boolean;
    decoratorId: string | null;
    offsetX: number;
    offsetY: number;
  }>({ isDragging: false, decoratorId: null, offsetX: 0, offsetY: 0 });

  // Handle decorator drag functionality
  useEffect(() => {
    if (!moveMode) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStateRef.current.isDragging || !dragStateRef.current.decoratorId)
        return;

      const element = document.getElementById(
        `decorator-${dragStateRef.current.decoratorId}`,
      );
      if (element && element.parentElement) {
        const containerRect = element.parentElement.getBoundingClientRect();

        const newX =
          e.clientX - containerRect.left - dragStateRef.current.offsetX;
        const newY =
          e.clientY - containerRect.top - dragStateRef.current.offsetY;

        // Update DOM immediately for smooth dragging
        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;
      }
    };

    const handleMouseUp = () => {
      if (dragStateRef.current.isDragging && dragStateRef.current.decoratorId) {
        // Update the store with the final position
        const element = document.getElementById(
          `decorator-${dragStateRef.current.decoratorId}`,
        );

        if (element && element.parentElement) {
          const rect = element.getBoundingClientRect();
          const container = element.parentElement.getBoundingClientRect();

          const finalX = rect.left - container.left;
          const finalY = rect.top - container.top;

          updateDecorator(dragStateRef.current.decoratorId, {
            x: finalX,
            y: finalY,
          });
        }
      }
      dragStateRef.current.isDragging = false;
      dragStateRef.current.decoratorId = null;
      document.body.style.cursor = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [moveMode, updateDecorator]);

  const handleDecoratorMouseDown = (
    decoratorId: string,
    e: React.MouseEvent<HTMLImageElement>,
  ) => {
    if (!moveMode) return;

    e.preventDefault();
    e.stopPropagation();

    const decoratorElement = document.getElementById(
      `decorator-${decoratorId}`,
    );
    if (!decoratorElement || !decoratorElement.parentElement) return;

    const rect = decoratorElement.getBoundingClientRect();
    const containerRect =
      decoratorElement.parentElement.getBoundingClientRect();

    dragStateRef.current = {
      isDragging: true,
      decoratorId: decoratorId,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };

    document.body.style.cursor = "grabbing";
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none flex flex-col"
      style={{
        backgroundImage: `url('${wallpaper}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top Panel - Header and Controls */}
      <div className="z-20 p-2 flex-shrink-0">
        <div
          className="backdrop-blur-xl rounded-xl p-2 shadow-2xl border border-white/20"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
          }}
        >
          <GameControls />
        </div>
      </div>

      {/* Fish Tank Container - Takes remaining height */}
      <div className="flex-1 z-10 px-4 pt-0 min-h-0 relative">
        <div className="fish-tank-container-fullheight absolute inset-0 m-auto">
          {/* Tank Frame */}
          <div className="fish-tank-frame">
            {/* Air gap at top */}
            <div className="fish-tank-air-gap"></div>

            {/* Water level container */}
            <div className="fish-tank-water">
              {/* Glass reflections */}
              <div className="fish-tank-glass-left"></div>
              <div className="fish-tank-glass-right"></div>

              {/* Aquarium content */}
              <div className="fish-tank-inner">
                <OceanBackground />

                {/* Sand/Gravel at bottom */}
                <div className="tank-ground"></div>

                {/* Decorators */}
                {decorators.map((decorator) => (
                  <img
                    key={decorator.id}
                    id={`decorator-${decorator.id}`}
                    src={decorator.imagePath}
                    alt="decorator"
                    className="absolute cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      left: `${decorator.x}px`,
                      top: `${decorator.y}px`,
                      width: `${decorator.width}px`,
                      height: `${decorator.height}px`,
                      zIndex: 6,
                      cursor: moveMode ? "grab" : "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!moveMode) {
                        setSelectedItem({
                          type: "decorator",
                          id: decorator.id,
                        });
                      }
                    }}
                    onMouseDown={(e) =>
                      handleDecoratorMouseDown(decorator.id, e)
                    }
                  />
                ))}

                <Aquarium2D />
              </div>
            </div>
          </div>

          {/* Tank Stand */}
          <div className="fish-tank-stand"></div>
        </div>
      </div>

      {/* Item Sidebar */}
      <ItemSidebar />
    </div>
  );
}
