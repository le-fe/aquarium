"use client";

import Aquarium2D from "@/components/Aquarium2D";
import GameControls from "@/components/GameControls";
import OceanBackground from "@/components/OceanBackground";

export default function Home() {
  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #022244, #58c8da)" }}
    >
      <OceanBackground />

      {/* Canvas - Full screen */}
      <div className="absolute inset-0 z-10">
        <Aquarium2D />
      </div>

      {/* Right Side Panel - Header and Controls */}
      <div className="absolute top-0 right-0 h-full w-96 z-20 flex flex-col p-6 gap-6">
        {/* Header with Glass Effect */}
        <div
          className="backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
          }}
        >
          <h1 className="text-4xl font-bold text-white mb-3 text-center">
            🐠 Aquarium 🐠
          </h1>
        </div>

        {/* Game Controls with Glass Effect - Scrollable */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <GameControls />
        </div>

        {/* Footer with Glass Effect */}
        <div
          className="backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
          }}
        >
          <p className="text-white/80 text-xs text-center leading-relaxed">
            Built with Next.js, TypeScript, Tailwind CSS, and Zustand
          </p>
        </div>
      </div>
    </div>
  );
}
