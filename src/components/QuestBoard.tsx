"use client";

import { useState } from "react";
import XPCounter from "@/components/XPCounter";
import QuestCard from "@/components/QuestCard";

export default function QuestBoard() {
    const [xp, setXp] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    function handleCompleteQuest() {
        if (isCompleted) return;

    setIsCompleted(true);
    setXp(currentXp => currentXp + 50);
    }

    return (
        <section className="mt-10 space-y-6">
            <XPCounter xp={xp} />

        <QuestCard
            isCompleted={isCompleted}
            onComplete={handleCompleteQuest}
        />
    </section>
    );
}
