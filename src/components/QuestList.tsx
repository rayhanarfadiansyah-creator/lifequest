"use client";
import { useState } from "react";

type Quest = {
    id: number;
    title: string;
    description: string;
    reward: number;
    isCompleted: boolean;
};

export default function QuestList() {
    const [quests, setQuests] = useState<Quest[]>([
    {
        id: 1,
        title: "Learn React",
        description: "Understand React components",
        reward: 50,
        isCompleted: false,
    },
    {
        id: 2,
        title: "Exercise",
        description: "Exercise for 30 minutes",
        reward: 30,
        isCompleted: false,
    },
    {
        id: 3,
        title: "Read a Book",
        description: "Read 10 pages",
        reward: 20,
        isCompleted: false,
    },
    
]);
const [totalXP, setTotalXP] = useState(0);
function handleCompleteQuest(id: number) {
    setQuests((currentQuests) =>
        currentQuests.map((quest) =>
            quest.id === id
                ? { ...quest, isCompleted: true }
                : quest
        )
    );
}

return (
    <div className="mt-10 space-y-5">
        <h2 className="text-2xl font-bold">Daily Quests</h2>
        {quests.map((quest) => (
            <div key={quest.id} className="rounded-xl bg-gray-800 p-5">
                <h3 className="text-lg font-bold">{quest.title}</h3>
                <p className="text-gray-400">{quest.description}</p>
                <p className="text-purple-400">+{quest.reward} XP</p>
                <p>{quest.isCompleted ? "Completed" : "In Progress"}</p>
                <button
                    onClick={() => handleCompleteQuest(quest.id)}
                    disabled={quest.isCompleted}
                    className="mt-3 rounded-lg bg-purple-600 px-4 py-2 disabled:bg-gray-600"
                >
                    {quest.isCompleted ? "Quest Completed!" : "Complete Quest"}
                </button>
            </div>
        ))}
    </div>
);
}
