"use client";
import GemWallet from "@/components/GemWallet";
import { useState } from "react";
import { characters, initialCharacterProgress } from "@/data/characters";
import type { CharacterId } from "@/types/character";

type CharacterSelectionProps = {
  onBack: () => void;
};

export default function CharacterSelection({
  onBack,
}: CharacterSelectionProps) {
  const [selectedCharacterId, setSelectedCharacterId] =
    useState<CharacterId>("knight");

  const selectedCharacter = characters.find(
    (character) => character.id === selectedCharacterId
  );

  const selectedProgress = initialCharacterProgress.find(
    (progress) => progress.characterId === selectedCharacterId
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#100f1b] p-4 text-white md:p-8">
        <button
        onClick={onBack}
        className="mb-5 rounded-lg border border-yellow-500/40 bg-gray-800 px-4 py-2 text-sm font-bold text-yellow-300 transition hover:bg-yellow-500/20"
        >
  ← BACK TO LOBBY
</button>
      <header className="mb-10 border-b border-yellow-500/20 pb-6">
        <GemWallet gems={500} />
        <p className="text-sm uppercase tracking-[0.3em] text-purple-400">
          LIFEQUEST
        </p>
        <h1 className="mt-2 text-3xl font-black">
          Choose Your Destiny
        </h1>
        <p className="mt-2 text-gray-400">
          Select your adventurer and begin your journey.
        </p>
      </header>

      {/* CHARACTER LIST */}
      
<section className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
  {characters.map((character) => {
    const progress = initialCharacterProgress.find(
      (item) => item.characterId === character.id
    );

    const isUnlocked = progress?.isUnlocked ?? false;
    const isSelected = selectedCharacterId === character.id;

    return (
      <button
        key={character.id}
        disabled={!isUnlocked}
        onClick={() => setSelectedCharacterId(character.id)}
        className={`group relative flex min-h-[230px] flex-col items-center justify-between overflow-hidden rounded-xl border-2 p-3 transition-all duration-200 ${
          isSelected
            ? "border-yellow-400 bg-gradient-to-b from-purple-800 to-gray-950 shadow-[0_0_20px_rgba(250,204,21,0.2)]"
            : "border-gray-700 bg-gradient-to-b from-gray-800 to-gray-950 hover:border-purple-400"
        } ${!isUnlocked ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      >
        <span className="absolute right-2 top-2 text-[10px] font-bold uppercase tracking-wider text-yellow-300">
          {isUnlocked ? "FREE" : "PREMIUM"}
        </span>

        <img
          src={character.spritePath}
          alt={character.name}
          className="mt-5 h-28 w-28 object-contain"
        />

        <div className="text-center">
          <h2 className="font-black uppercase tracking-wider text-white">
            {character.name}
          </h2>
          <p className="mt-1 text-xs text-purple-300">
            {character.role}
          </p>

          {!isUnlocked && (
            <p className="mt-2 text-xs font-bold text-yellow-400">
              💎 {character.unlock.priceInGems}
            </p>
          )}

          {isSelected && (
            <p className="mt-2 text-[10px] font-bold tracking-widest text-yellow-300">
              SELECTED
            </p>
          )}
        </div>
      </button>
    );
  })}
</section>


      {/* CHARACTER DETAILS */}
      {selectedCharacter && selectedProgress && (
        <section className="relative mt-10 overflow-hidden rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-[#29203f] via-[#171629] to-[#0c101c] p-6 md:p-8">
          <p className="text-sm uppercase tracking-widest text-purple-400">
            Character Details
          </p>

          <h2 className="mt-2 text-4xl font-black uppercase tracking-widest text-yellow-300">
  {selectedCharacter.name}
</h2>

          <p className="mt-1 text-gray-400">
            {selectedCharacter.description}
          </p>

          <div className="my-8 flex justify-center rounded-xl bg-black/20 py-6">
  <img
    src={selectedCharacter.spritePath}
    alt={selectedCharacter.name}
    className="h-64 w-64 object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]"
  />
</div>

          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            {Object.entries(selectedCharacter.baseStats).map(
              ([stat, value]) => (
                <div key={stat} className="rounded-lg bg-gray-800 p-3">
                  <p className="text-xs capitalize text-gray-400">
                    {stat}
                  </p>
                  <p className="mt-1 text-xl font-bold">{value}</p>
                </div>
              )
            )}
          </div>

          <h3 className="mb-3 mt-6 text-xl font-bold">Skills</h3>

          <div className="grid gap-3 md:grid-cols-2">
            {selectedCharacter.skills.map((skill) => (
              <div key={skill.id} className="rounded-lg bg-gray-800 p-4">
                <h4 className="font-bold text-purple-300">
                  {skill.name}
                </h4>
                <p className="mt-1 text-sm text-gray-400">
                  {skill.description}
                </p>
                <p className="mt-3 text-xs text-gray-500">
                  Cooldown: {skill.cooldown}s · Mana: {skill.manaCost}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-700 pt-4">
            <p className="text-gray-400">Character Progress</p>
            <p className="mt-1 text-xl font-bold">
              Level {selectedProgress.level}
            </p>
            <p className="text-purple-300">
              {selectedProgress.xp} XP
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
