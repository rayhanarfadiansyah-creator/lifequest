"use client";

import { useEffect, useRef, useState } from "react";
import PlayerSprite from "@/components/PlayerSprite";
import CharacterSelection from "@/components/CharacterSelection";
import NPC from "@/components/NPC";
import type { CharacterId } from "@/types/character";

const menuItems = [
    { id: "characters", icon: "🛡️", name: "Character Hall" },
    { id: "quests", icon: "📜", name: "Quest Board" },
    { id: "blacksmith", icon: "⚒️", name: "Blacksmith" },
    { id: "adventure", icon: "🚪", name: "Adventure Gate" },
];

export default function Lobby() {
    const [activeMenu, setActiveMenu] = useState("lobby");
    const [activeCharacter, setActiveCharacter] =
    useState<CharacterId>("knight");
    const [characterLoaded, setCharacterLoaded] = useState(false);
    const [playerX, setPlayerX] = useState(50);
    const [playerY, setPlayerY] = useState(78);
    const [direction, setDirection] = useState<
    "north" | "south" | "east" | "west"
        >("south");
    const [isMoving, setIsMoving] = useState(false);
    const keysPressed = useRef(new Set<string>());
    const playerSpriteCharacter =
    activeCharacter === "assassin" ? "rogue" : activeCharacter;
useEffect(() => {
    const savedCharacter = localStorage.getItem("lifequest-character");
    const validCharacters: CharacterId[] = [
        "knight",
        "mage",
        "ranger",
        "assassin",
        "cleric",
        ];
    if (
        savedCharacter &&
        validCharacters.includes(savedCharacter as CharacterId)
    ) {
    setActiveCharacter(savedCharacter as CharacterId);
    }
    setCharacterLoaded(true);
}, []);


useEffect(() => {
    if (characterLoaded) {
        localStorage.setItem("lifequest-character", activeCharacter);
    }
    }, [activeCharacter, characterLoaded]);

useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
        const key = event.key.toLowerCase();
        if (
            ["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)
        ) {
        event.preventDefault();
        keysPressed.current.add(key);
        setIsMoving(true);
    }
}

    function handleKeyUp(event: KeyboardEvent) {
      keysPressed.current.delete(event.key.toLowerCase());

      if (keysPressed.current.size === 0) {
        setIsMoving(false);
      }
    }

    function handleBlur() {
      keysPressed.current.clear();
      setIsMoving(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    const movement = setInterval(() => {
      const keys = keysPressed.current;
      const speed = 0.35;

      if (keys.has("w") || keys.has("arrowup")) {
        setDirection("north");
        setPlayerY((y) => Math.max(15, y - speed));
      }

      if (keys.has("s") || keys.has("arrowdown")) {
        setDirection("south");
        setPlayerY((y) => Math.min(85, y + speed));
      }

      if (keys.has("a") || keys.has("arrowleft")) {
        setDirection("west");
        setPlayerX((x) => Math.max(12, x - speed));
      }

      if (keys.has("d") || keys.has("arrowright")) {
        setDirection("east");
        setPlayerX((x) => Math.min(90, x + speed));
      }
    }, 16);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
      clearInterval(movement);
    };
  }, []);

  // 4. Character Hall
  if (activeMenu === "characters") {
    return (
      <CharacterSelection
        activeCharacterId={activeCharacter}
        onBack={() => setActiveMenu("lobby")}
        onSelect={(characterId) => {
          setActiveCharacter(characterId);
          setActiveMenu("lobby");
        }}
      />
    );
  }

  // 5. Lobby
  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-[#172536] text-white">

      {/* WORLD MAP */}
      <img
        src="/assets/fantasy-village/art/scenes/village-square.png"
        alt="Fantasy Village"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ imageRendering: "pixelated" }}
      />

      {/* PLAYER CHARACTER */}
      <div
        className="absolute z-[5]"
        style={{
          left: `${playerX}%`,
          top: `${playerY}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <PlayerSprite
  character={activeCharacter}
  action={isMoving ? "walk" : "idle"}
  direction={direction}
  size={130}
  variant="player"
/>
      </div>

      {/* VILLAGE NPCs */}
<NPC
  character="mage"
  playerCharacter={playerSpriteCharacter}
  startX={35}
  startY={45}
  size={250}
/>

<NPC
  character="ranger"
  playerCharacter={playerSpriteCharacter}
  startX={70}
  startY={40}
  size={250}
/>

<NPC
  character="blacksmith"
  playerCharacter={playerSpriteCharacter}
  startX={65}
  startY={72}
  size={250}
/>

<NPC
  character="cleric"
  playerCharacter={playerSpriteCharacter}
  startX={25}
  startY={65}
  size={250}
/>

<NPC
  character="rogue"
  playerCharacter={playerSpriteCharacter}
  startX={80}
  startY={60}
  size={250}
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
