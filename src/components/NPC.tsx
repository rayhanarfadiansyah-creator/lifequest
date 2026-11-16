"use client";

import { useEffect, useState } from "react";
import PlayerSprite from "@/components/PlayerSprite";

type NPCProps = {
    character: string;
    playerCharacter: string;
    startX: number;
    startY: number;
    size?: number;
};

export default function NPC({
    character,
    playerCharacter,
    startX,
    startY,
    size = 120,
}: NPCProps) {
    const [x, setX] = useState(startX);
    const [y, setY] = useState(startY);
    const [direction, setDirection] = useState<
    "north" | "south" | "east" | "west"
    >("south");
    const [isMoving, setIsMoving] = useState(false);
    const displayCharacter =
    character === playerCharacter ? "knight" : character;


useEffect(() => {
    let stopTimer: ReturnType<typeof setTimeout>;
    const directions = [
        { name: "north", dx: 0, dy: -5 },
        { name: "south", dx: 0, dy: 5 },
        { name: "east", dx: 5, dy: 0 },
        { name: "west", dx: -5, dy: 0 },
    ] as const;

        const movementTimer = setInterval(() => {
        const next =
        directions[Math.floor(Math.random() * directions.length)];

        setDirection(next.name);
        setIsMoving(true);

        setX((current) =>
            Math.max(20, Math.min(85, current + next.dx))
        );

        setY((current) =>
            Math.max(25, Math.min(80, current + next.dy))
        );

      clearTimeout(stopTimer);

      stopTimer = setTimeout(() => {
        setIsMoving(false);
      }, 1800);
    }, 3000);

    return () => {
      clearInterval(movementTimer);
      clearTimeout(stopTimer);
    };
  }, []);

  return (
    <div
      className="absolute z-[5]"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        transition: "left 1.8s linear, top 1.8s linear",
      }}
    >
      <PlayerSprite
  character={displayCharacter}
        action={isMoving ? "walk" : "idle"}
        direction={direction}
        size={250}
      />
    </div>
  );
}
