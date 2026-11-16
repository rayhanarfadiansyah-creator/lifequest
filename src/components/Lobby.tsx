"use client";

import { useEffect, useRef, useState } from "react";
import PlayerSprite from "@/components/PlayerSprite";
import CharacterSelection from "@/components/CharacterSelection";
import NPC from "@/components/NPC";
import type {
  CharacterId,
  CharacterProgress,
  CharacterStats,
  CharacterCombatState,
} from "@/types/character";
import {
    characters,
    initialCharacterProgress,
} from "@/data/characters";
import GemShop from "@/components/GemShop";


const menuItems = [
    { id: "characters", icon: "🛡️", name: "Character Hall" },
    { id: "quests", icon: "📜", name: "Quest Board" },
    { id: "blacksmith", icon: "⚒️", name: "Blacksmith" },
    { id: "adventure", icon: "🚪", name: "Adventure Gate" },
    { id: "gemshop", icon: "💎", name: "Gem Shop" },
];

export default function Lobby() {
    const [activeMenu, setActiveMenu] = useState("lobby");
    const [activeCharacter, setActiveCharacter] =
    useState<CharacterId>("knight");
    const [characterLoaded, setCharacterLoaded] = useState(false);
    const [gems, setGems] = useState(100);
    const [unlockedCharacters, setUnlockedCharacters] = useState<CharacterId[]>([
        "knight",
        "mage",
    ]);
    const [economyLoaded, setEconomyLoaded] = useState(false);
    const [characterProgress, setCharacterProgress] =
    useState<CharacterProgress[]>(initialCharacterProgress);
    const [progressLoaded, setProgressLoaded] = useState(false);
    const [skillMessage, setSkillMessage] = useState("");
    const [combatStates, setCombatStates] = useState<CharacterCombatState[]>(
      () =>
        characters.map((character) => ({
          characterId: character.id,
          mana: 100 + character.baseStats.intelligence,
          maxMana: 100 + character.baseStats.intelligence,
          skillCooldowns: {},
        }))
    );
    // Waktu terakhir setiap karakter berhasil menggunakan skill.
    const lastSkillUseAt = useRef<Record<CharacterId, number>>({
      knight: 0,
      mage: 0,
      ranger: 0,
      assassin: 0,
      cleric: 0,
    });
    const [playerX, setPlayerX] = useState(50);
    const [playerY, setPlayerY] = useState(78);
    const [direction, setDirection] = useState<
    "north" | "south" | "east" | "west"
        >("south");
    const [isMoving, setIsMoving] = useState(false);
    type PlayerAction = "idle" | "walk" | "attack" | "skill1" | "skill2";
    const [playerAction, setPlayerAction] = useState<PlayerAction>("idle");
    const actionTimer = useRef<number | null>(null);
    const playPlayerAction = (action: PlayerAction) => {
    if (actionTimer.current !== null) {
    window.clearTimeout(actionTimer.current);
    }
    setPlayerAction(action);
    actionTimer.current = window.setTimeout(() => {
    setPlayerAction(
    keysPressed.current.size > 0 ? "walk" : "idle"
    );
    }, 700);
};

const useSkillRef = useRef<(skillId: string) => void>(() => {});
    const keysPressed = useRef(new Set<string>());
    const handleTouchStart = (key: string) => {
    keysPressed.current.add(key);
    setIsMoving(true);
    };
    const handleTouchEnd = (key: string) => {
    keysPressed.current.delete(key);
    if (keysPressed.current.size === 0) {
    setIsMoving(false);
    }
};
    const playerSpriteCharacter =
    activeCharacter === "assassin" ? "rogue" : activeCharacter;

// Menambahkan EXP ke karakter yang sedang digunakan
const gainCharacterXP = (amount: number) => {
  const currentProgress = characterProgress.find(
    (item) => item.characterId === activeCharacter
  );

  if (!currentProgress || !currentProgress.isUnlocked) return;
  if (amount <= 0) return;

  let newXP = currentProgress.xp + amount;
  let newLevel = currentProgress.level;
  let gainedLevels = 0;

  while (newXP >= newLevel * 100) {
    newXP -= newLevel * 100;
    newLevel += 1;
    gainedLevels += 1;
  }

  setCharacterProgress((current) =>
    current.map((item) =>
      item.characterId === activeCharacter
        ? {
            ...item,
            level: newLevel,
            xp: newXP,
            attributePoints:
              item.attributePoints + gainedLevels * 2,
          }
        : item
    )
  );

  if (gainedLevels > 0) {
    setGems((currentGems) => currentGems + gainedLevels * 2);
  }
};

// Mengalokasikan Attribute Points
const allocateAttributePoint = (stat: keyof CharacterStats) => {
  setCharacterProgress((current) =>
    current.map((item) => {
      if (item.characterId !== activeCharacter) return item;
      if (item.attributePoints <= 0) return item;

      return {
        ...item,
        attributePoints: item.attributePoints - 1,
        allocatedStats: {
          ...item.allocatedStats,
          [stat]: item.allocatedStats[stat] + 1,
        },
      };
    })
  );
};

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

  // Membaca saldo dan karakter yang sudah dimiliki
useEffect(() => {
    const savedGems = localStorage.getItem("lifequest-gems");
    const savedUnlocked = localStorage.getItem(
    "lifequest-unlocked-characters"
    );
    if (savedGems !== null) {
    setGems(Number(savedGems));
    }
    if (savedUnlocked !== null) {
    try {
        setUnlockedCharacters(JSON.parse(savedUnlocked));
    } catch {
        setUnlockedCharacters(["knight", "mage"]);
    }
    }

setEconomyLoaded(true);
}, []);
// Membaca progression setiap karakter
useEffect(() => {
    const savedProgress = localStorage.getItem(
    "lifequest-character-progress"
    );
    if (savedProgress !== null) {
    try {
        const parsedProgress = JSON.parse(savedProgress);
        setCharacterProgress(parsedProgress);
    } catch {
        setCharacterProgress(initialCharacterProgress);
    }
    }

 setProgressLoaded(true);
}, []);

// Regenerasi Mana setiap detik berdasarkan Intelligence karakter.
useEffect(() => {
  const manaRegeneration = window.setInterval(() => {
    const now = Date.now();

    setCombatStates((currentStates) =>
      currentStates.map((combatState) => {
        const character = characters.find(
          (item) => item.id === combatState.characterId
        );
        if (!character) return combatState;

        const progress = characterProgress.find(
          (item) => item.characterId === combatState.characterId
        );
        const bonusIntelligence = progress?.allocatedStats.intelligence ?? 0;
        const totalIntelligence =
          character.baseStats.intelligence + bonusIntelligence;
        const maxMana = 100 + totalIntelligence;
        const manaRegenPerSecond = totalIntelligence * 0.05;
        const usedSkillRecently =
          now - (lastSkillUseAt.current[combatState.characterId] ?? 0) < 1000;

        // Kurangi sisa cooldown satu detik setiap tick.
        const updatedCooldowns = Object.fromEntries(
          Object.entries(combatState.skillCooldowns).map(([skillId, seconds]) => [
            skillId,
            Math.max(0, seconds - 1),
          ])
        );

        // Setelah memakai skill, regenerasi berhenti selama 1 detik.
        if (usedSkillRecently) {
          return {
            ...combatState,
            maxMana,
            mana: Math.min(combatState.mana, maxMana),
            skillCooldowns: updatedCooldowns,
          };
        }

        return {
          ...combatState,
          maxMana,
          mana: Math.min(maxMana, combatState.mana + manaRegenPerSecond),
          skillCooldowns: updatedCooldowns,
        };
      })
    );
  }, 1000);

  return () => window.clearInterval(manaRegeneration);
}, [characterProgress]);

  // Menyimpan saldo dan karakter yang dimiliki
useEffect(() => {
    if (!economyLoaded) return;
    localStorage.setItem("lifequest-gems", String(gems));
    localStorage.setItem(
    "lifequest-unlocked-characters",
    JSON.stringify(unlockedCharacters)
    );
}, [gems, unlockedCharacters, economyLoaded]);

// Menyimpan progression setiap karakter
useEffect(() => {
    if (!progressLoaded) return;
    localStorage.setItem(
    "lifequest-character-progress",
    JSON.stringify(characterProgress)
    );
}, [characterProgress, progressLoaded]);

useEffect(() => {
    if (characterLoaded) {
        localStorage.setItem("lifequest-character", activeCharacter);
    }
    }, [activeCharacter, characterLoaded]);

useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    if (key === "j") {
    event.preventDefault();
    playPlayerAction("attack");
    return;
    }

    if (key === "k" || key === "l") {
    event.preventDefault();

    const skills = activeCharacterDefinition?.skills ?? [];
    const skill = skills[key === "k" ? 0 : 1];

    if (skill) {
    useSkillRef.current(skill.id);
    }

return;
}
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

const activeCombatState = combatStates.find(
  (item) => item.characterId === activeCharacter
);
const activeCharacterDefinition = characters.find(
  (item) => item.id === activeCharacter
);

// Memakai skill karakter aktif.
const useSkill = (skillId: string) => {
  const skill = activeCharacterDefinition?.skills.find(
    (item) => item.id === skillId
  );
  const currentCombat = combatStates.find(
    (item) => item.characterId === activeCharacter
  );

  if (!skill || !currentCombat) return;

  if ((currentCombat.skillCooldowns[skillId] ?? 0) > 0) {
    setSkillMessage(`${skill.name} masih cooldown.`);
    return;
  }

  if (currentCombat.mana < skill.manaCost) {
    setSkillMessage(`Not Enough Mana! Butuh ${skill.manaCost} Mana.`);
    return;
  }

  setCombatStates((currentStates) =>
    currentStates.map((state) =>
      state.characterId === activeCharacter
        ? {
            ...state,
            mana: state.mana - skill.manaCost,
            skillCooldowns: {
              ...state.skillCooldowns,
              [skillId]: skill.cooldown,
            },
          }
        : state
    )
  );

  lastSkillUseAt.current[activeCharacter] = Date.now();

const skillIndex = activeCharacterDefinition?.skills.findIndex(
  (item) => item.id === skillId
);

playPlayerAction(skillIndex === 0 ? "skill1" : "skill2");

setSkillMessage(`${skill.name} berhasil digunakan!`);
};
useSkillRef.current = useSkill;
// Gem Shop
if (activeMenu === "gemshop") {
return (
    <GemShop
    onBack={() => setActiveMenu("lobby")}
    onTopUp={(amount) => {
        const confirmed = window.confirm(
        `Buy ${amount} Life Gems? This is a simulated purchase.`
        );
        if (!confirmed) return;
        setGems((currentGems) => currentGems + amount);
        window.alert(`${amount} Life Gems added to your wallet!`);
        setActiveMenu("lobby");
    }}
    />
);
}

  // 4. Character Hall
  if (activeMenu === "characters") {
    return (
      <CharacterSelection
        activeCharacterId={activeCharacter}
        onBack={() => setActiveMenu("lobby")}
        gems={gems}
        unlockedCharacters={unlockedCharacters}
        onBuyCharacter={(characterId) => {
          const character = characters.find(
            (item) => item.id === characterId
          );

          if (!character) return false;

          if (unlockedCharacters.includes(characterId)) {
            return false;
          }

          const price = character.unlock.priceInGems ?? 0;

          if (gems < price) return false;

          setGems((currentGems) => currentGems - price);

          setUnlockedCharacters((current) => [
            ...current,
            characterId,
          ]);

          return true;
        }}
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
  action={playerAction === "idle" || playerAction === "walk"
  ? (isMoving ? "walk" : "idle")
  : playerAction}
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
          <span className="text-sky-300">🔷 {Math.floor(activeCombatState?.mana ?? 0)}/{activeCombatState?.maxMana ?? 0}</span>
          <span className="text-yellow-300">💎 {gems}</span>
        </div>
      </header>

{/* ACTION BUTTONS */}
<div className="absolute bottom-28 right-4 z-30 flex flex-col gap-2">
  <button
    type="button"
    onClick={() => playPlayerAction("attack")}
    className="rounded-xl border border-orange-300/50 bg-orange-600/90 px-4 py-3 text-sm font-black shadow-lg"
  >
    ⚔️ ATTACK (J)
  </button>

  <button
    type="button"
    onClick={() => {
      const skill = activeCharacterDefinition?.skills[0];
      if (skill) useSkill(skill.id);
    }}
    className="rounded-xl border border-sky-300/50 bg-sky-700/90 px-4 py-3 text-sm font-black shadow-lg"
  >
    ✨ SKILL 1 (K)
  </button>

  <button
    type="button"
    onClick={() => {
      const skill = activeCharacterDefinition?.skills[1];
      if (skill) useSkill(skill.id);
    }}
    className="rounded-xl border border-purple-300/50 bg-purple-700/90 px-4 py-3 text-sm font-black shadow-lg"
  >
    🔮 SKILL 2 (L)
  </button>
</div>

      {/* SKILL PANEL */}
      <section className="absolute bottom-4 left-1/2 z-20 w-[min(92vw,420px)] -translate-x-1/2 rounded-xl border border-sky-300/30 bg-[#171629]/95 p-3 shadow-xl backdrop-blur-sm">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xs font-black tracking-wider text-sky-200">
            {activeCharacterDefinition?.name ?? "Character"} SKILLS
          </h2>
          <span className="text-[10px] text-sky-200">
            Mana {Math.floor(activeCombatState?.mana ?? 0)}/{activeCombatState?.maxMana ?? 0}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {activeCharacterDefinition?.skills.map((skill) => {
            const cooldown = activeCombatState?.skillCooldowns[skill.id] ?? 0;
            const enoughMana = (activeCombatState?.mana ?? 0) >= skill.manaCost;
            const disabled = cooldown > 0 || !enoughMana;

            return (
              <button
                key={skill.id}
                type="button"
                disabled={disabled}
                onClick={() => useSkill(skill.id)}
                className={`rounded-lg border p-2 text-left transition ${
                  disabled
                    ? "cursor-not-allowed border-white/10 bg-white/5 opacity-50"
                    : "border-sky-300/40 bg-sky-400/10 hover:bg-sky-400/20"
                }`}
                title={skill.description}
              >
                <span className="block text-xs font-bold">{skill.name}</span>
                <span className="mt-1 block text-[10px] text-sky-200">
                  Mana {skill.manaCost} · CD {skill.cooldown}s
                </span>
                <span className="mt-1 block text-[10px] font-semibold text-yellow-200">
                  {cooldown > 0
                    ? `Cooldown: ${cooldown}s`
                    : !enoughMana
                      ? "Not Enough Mana"
                      : "READY"}
                </span>
              </button>
            );
          })}
        </div>
        {skillMessage && (
          <p className="mt-2 text-center text-[10px] text-yellow-200" role="status">
            {skillMessage}
          </p>
        )}
      </section>

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
