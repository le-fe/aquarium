"use client";

import dynamic from "next/dynamic";
import GameControls from "@/components/GameControls";

// Import AquariumCanvas dynamically to avoid SSR issues with PixiJS
const AquariumCanvas = dynamic(() => import("@/components/AquariumCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-slate-800 rounded-lg">
      <p className="text-white text-xl">Loading Aquarium...</p>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-cyan-400 mb-2">
            🐠 Aquarium Game 🐠
          </h1>
          <p className="text-cyan-200 text-lg">
            Watch your fish swim around in their virtual habitat!
          </p>
        </header>

        <main className="flex flex-col gap-6">
          <GameControls />

          <div className="w-full h-[600px]">
            <AquariumCanvas />
          </div>
        </main>

        <footer className="text-center mt-8 text-cyan-300 text-sm">
          <p>
            Built with Next.js, TypeScript, Tailwind CSS, Zustand, and PixiJS
          </p>
        </footer>
      </div>
    </div>
  );
}
