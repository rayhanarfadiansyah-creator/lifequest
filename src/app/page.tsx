import PlayerProfile from "@/components/PlayerProfile";
import QuestBoard from "@/components/QuestBoard";
import QuestList from "@/components/QuestList";
import GameWorld from "@/components/GameWorld";
import CharacterSelection from "@/components/CharacterSelection";
import Lobby from "@/components/Lobby";

export default function Home() {
  return <Lobby />;


    <main className="min-h-screen bg-gray-950 p-10 text-white">
      <h1 className="text-4xl font-bold text-purple-400">
        LIFEQUEST 🎮
      </h1>

      <p className="mt-3 text-gray-400">
        Your life, your adventure.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <PlayerProfile
          name="4chie"
          level={10}
          xp={75}
        />

        <PlayerProfile
          name="Knight"
          level={25}
          xp={90}
        />

        <PlayerProfile
          name="Ranger"
          level={5}
          xp={30}
        />
      </div>

      <QuestBoard />
      <QuestList />
    </main>
  ;
}
