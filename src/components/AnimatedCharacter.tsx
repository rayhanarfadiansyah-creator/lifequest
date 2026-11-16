
"use client";

import { useEffect, useState } from "react";

type AnimatedCharacterProps = {
  character: string;
  action: "idle" | "walk";
  direction: "north" | "south" | "east" | "west";
  size?: number;
};

export default function AnimatedCharacter({
  character,
  action,
  direction,
  size = 80,
}: AnimatedCharacterProps) {
  const [frame, setFrame] = useState(0);

  // Jumlah gambar dalam satu animasi
  const totalFrames = action === "idle" ? 4 : 8;

  // Kecepatan animasi
  const frameSpeed = action === "idle" ? 540 : 110;

  useEffect(() => {
    setFrame(0);

    const animation = setInterval(() => {
      setFrame((current) => (current + 1) % totalFrames);
    }, frameSpeed);

    return () => clearInterval(animation);
  }, [action, frameSpeed, totalFrames]);

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
        imageRendering: "pixelated",
      }}
    />
  );
}
