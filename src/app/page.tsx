"use client";

import Aquarium2D from "@/components/Aquarium2D";
import GameControls from "@/components/GameControls";
import OceanBackground from "@/components/OceanBackground";
import { useGameStore } from "@/stores/gameStore";

export default function Home() {
  const { wallpaper } = useGameStore();

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
                <Aquarium2D />
              </div>
            </div>
          </div>

          {/* Tank Stand */}
          <div className="fish-tank-stand"></div>
        </div>
      </div>
    </div>
  );
}
