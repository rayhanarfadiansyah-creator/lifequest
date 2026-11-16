"use client";

import { useEffect, useState } from "react";
const tiles = Array.from({ length: 25 }, (_, index) => index);

export default function GameWorld() {
const [position, setPosition] = useState({
  x: 2,
  y: 2,
});

useEffect(() => {
function handleKeyDown(event: KeyboardEvent) {
    setPosition((current) => {
        switch (event.key) {
        case "ArrowRight":
        return { ...current, x: Math.min(current.x + 1, 4) };
        case "ArrowLeft":
        return { ...current, x: Math.max(current.x - 1, 0) };
        case "ArrowDown":
        return { ...current, y: Math.min(current.y + 1, 4) };
        case "ArrowUp":
            return { ...current, y: Math.max(current.y - 1, 0) };
            default:
            return current;
        }
    });
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
    window.removeEventListener("keydown", handleKeyDown);
};
}, []);

return (
    <main className="min-h-screen bg-[#11111f] p-4 text-white md:p-8">
        {/* GAME HEADER */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-black tracking-wider text-purple-400">
                    LIFEQUEST
                </h1>
                <p className="text-sm text-gray-400">
                    Your Life, Your Adventure.
                </p>
            </div>
            <div className="rounded-xl border border-purple-500/30 bg-gray-900 px-5 py-3">
                <p className="font-bold">Adventurer</p>
                <p className="text-sm text-purple-300">Level 1 · Novice</p>
            </div>
        </header>
        {/* CHARACTER STATUS */}
        <section className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-gray-900 p-4">
                <p className="text-sm text-gray-400">HP</p>
                <p className="font-bold text-red-400">100 / 100</p>
                <div className="mt-2 h-2 rounded-full bg-gray-700">
                <div className="h-2 w-full rounded-full bg-red-500" />
                </div>
            </div>
            <div className="rounded-xl bg-gray-900 p-4">
                <p className="text-sm text-gray-400">XP</p>
                <p className="font-bold text-purple-400">0 / 100</p>
                <div className="mt-2 h-2 rounded-full bg-gray-700">
                    <div className="h-2 w-0 rounded-full bg-purple-500" />
                </div>
            </div>
            <div className="col-span-2 rounded-xl bg-gray-900 p-4 md:col-span-1">
                <p className="text-sm text-gray-400">Location</p>
                <p className="font-bold text-green-400">New Adventurer Village</p>
            </div>
        </section>
        {/* GAME WORLD */}
        <section className="relative min-h-[460px] overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-b from-[#242d52] via-[#334d58] to-[#243b35]">
            <div className="absolute left-5 top-5 z-10">
                <p className="text-xs uppercase tracking-widest text-green-300">
                    Current Area
                </p>
                <h2 className="text-xl font-bold">Emerald Village</h2>
            </div>
            {/* ISOMETRIC MAP */}
            <div
                className="absolute left-1/2 top-[145px] grid grid-cols-5 gap-1"
                style={{
                width: "280px",
                transform:
                "translateX(-50%) rotateX(58deg) rotateZ(45deg)",
                }}
                >
                {tiles.map((tile) => (
            <div
                key={tile}
                className={`h-[52px] w-[52px] border border-black/20 ${
                    [6, 7, 8, 11, 12, 13, 16, 17, 18].includes(tile)
                    ? "bg-[#a18a62]"
                    : "bg-[#43845a]"
                    } shadow-md`}
                    />
                ))}
            </div>
            {/* TEMPORARY CHARACTER */}
            
<div
  className="absolute z-10 text-5xl drop-shadow-xl"
  style={{
    left: `calc(50% + ${(position.x - position.y) * 26}px)`,
    top: `${215 + (position.x + position.y - 4) * 15}px`,
    transform: "translate(-50%, -50%)",
  }}
>
  🧙
</div>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/40 px-5 py-2 text-sm">
                Welcome to Emerald Village
            </div>
        </section>
        {/* QUEST PANEL */}
        <section className="mt-6 rounded-2xl border border-purple-500/30 bg-gray-900 p-5">
            <h2 className="mb-4 text-xl font-bold">Active Quests</h2>
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="font-bold">The First Step</p>
                    <p className="text-sm text-gray-400">
                    Begin your adventure.
                    </p>
                </div>
            <span className="whitespace-nowrap text-purple-400">+50 XP</span>
        </div>
    </section>
    </main>
);
}
