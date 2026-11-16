
"use client";

import { useEffect, useState } from "react";

type PlayerSpriteProps = {
  character: string;
  action: "idle" | "walk";
  direction: "north" | "south" | "east" | "west";
  size?: number;
  variant?: "player" | "npc";
};

export default function PlayerSprite({
  character,
  action,
  direction,
  size = 80,
  variant = "npc",
}: PlayerSpriteProps) {
  const [frame, setFrame] = useState(0);

  const isAnimatedPlayer =
    variant === "player" &&
    ["knight", "mage"].includes(character);

  const totalFrames =
    variant === "npc"
      ? action === "idle" ? 4 : 8
      : 4;

  const frameSpeed =
    variant === "npc"
      ? action === "idle" ? 540 : 110
      : action === "idle" ? 700 : 160;

  useEffect(() => {
    setFrame(0);

    // Player idle menggunakan frame pertama agar tidak bergeser
    if (isAnimatedPlayer && action === "idle") {
      return;
    }

    // Karakter player yang belum punya animasi memakai gambar statis
    if (variant === "player" && !isAnimatedPlayer) {
      return;
    }

    const timer = setInterval(() => {
      setFrame((current) => (current + 1) % totalFrames);
    }, frameSpeed);

    return () => clearInterval(timer);
  }, [
    action,
    totalFrames,
    frameSpeed,
    variant,
    isAnimatedPlayer,
  ]);

  // PLAYER LIFEQUEST
  if (variant === "player") {
    const imagePath = isAnimatedPlayer
      ? `/sprites/animations/${character}/${action}/${direction}/${String(frame).padStart(3, "0")}.png`
      : `/sprites/${character}.png`;

    return (
      <img
        src={imagePath}
        alt={character}
        draggable={false}
        className={
          isAnimatedPlayer && action === "idle"
            ? "mc-idle"
            : ""
        }
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          objectPosition: "center bottom",
          imageRendering: "pixelated",
          transformOrigin: "center bottom",
        }}
      />
    );
  }

  // NPC HAPPYHUSTLE
  const frameNumber = String(frame).padStart(3, "0");

  const imagePath =
    `/assets/fantasy-village/art/characters/${character}` +
    `/animations/${action}/${direction}/${frameNumber}.png`;

  return (
    <img
      src={imagePath}
      alt={character}
      draggable={false}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        objectPosition: "center bottom",
        imageRendering: "pixelated",
      }}
    />
  );
}
