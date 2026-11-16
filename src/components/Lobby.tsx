"use client";

import { useState } from "react";
import CharacterSelection from "@/components/CharacterSelection";

const menuItems = [
  { id: "characters", icon: "🛡️", name: "Character Hall" },
  { id: "quests", icon: "📜", name: "Quest Board" },
  { id: "blacksmith", icon: "⚒️", name: "Blacksmith" },
  { id: "adventure", icon: "🚪", name: "Adventure Gate" },
];

export default function Lobby() {
  const [activeMenu, setActiveMenu] = useState("lobby");

    if (activeMenu === "characters") {
  return (
    <CharacterSelection
      onBack={() => setActiveMenu("lobby")}
    />
  );
}

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-[#172536] text-white">

      {/* WORLD MAP */}
      <img
        src="/assets/fantasy-village/art/scenes/village-square.png"
        alt="Fantasy Village"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ imageRendering: "pixelated" }}
      />

      {/* ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="wind-leaf leaf-one">🍃</span>
        <span className="wind-leaf leaf-two">🍂</span>
        <span className="wind-leaf leaf-three">🍃</span>
        <span className="wind-leaf leaf-four">🍂</span>
      </div>

      {/* TOP HUD */}
      <header className="absolute left-3 right-3 top-3 z-20 flex items-center justify-between rounded-xl border border-yellow-300/30 bg-[#171629]/90 p-3 shadow-xl backdrop-blur-sm md:left-6 md:right-6">
        <div>
          <h1 className="font-black tracking-widest text-yellow-300">
            LIFEQUEST
          </h1>
          <p className="text-[10px] text-gray-300">
            ADVENTURER'S TOWN
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold md:gap-5">
          <span>❤️ 100</span>
          <span>⭐ LV. 01</span>
          <span className="text-yellow-300">💎 500</span>
        </div>
      </header>

      {/* LEFT GAME MENU */}
      <aside className="absolute left-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 rounded-xl border border-yellow-300/30 bg-[#171629]/90 p-2 shadow-xl backdrop-blur-sm">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className="flex w-12 flex-col items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-2 transition hover:border-yellow-300 hover:bg-yellow-300/15 md:w-20"
            title={item.name}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="hidden text-center text-[9px] font-bold md:block">
              {item.name}
            </span>
          </button>
        ))}
      </aside>

      {/* SAFE ZONE LABEL */}
      <div className="absolute bottom-4 right-4 z-20 rounded-lg border border-yellow-300/30 bg-[#171629]/85 px-3 py-2 text-right shadow-lg">
        <p className="text-xs font-bold text-yellow-300">
          SAFE ZONE
        </p>
        <p className="text-[10px] text-gray-300">
          WASD / Arrow Keys
        </p>
      </div>

      {/* AMBIENT LIGHT */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

    </main>
  );
}
