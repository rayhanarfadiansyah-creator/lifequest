type PlayerProfileProps = {
  name: string;
  level: number;
  xp: number;
};

export default function PlayerProfile({
  name,
  level,
  xp,
}: PlayerProfileProps) {
  const progress = Math.min(xp, 100);
  return (
    <div className="rounded-xl bg-gray-800 p-6">
      <h2 className="text-2xl font-bold">
        {name}
      </h2>

      <p className="mt-2">
        Level {level} - Beginner
      </p>

      <p className="mt-1 text-purple-400">
        {xp} / 100 XP
      </p>

      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-gray-700">
        <div
          className="h-full rounded-full bg-purple-500 transition-all duration-500"
          style={{ width: `${progress}%` }}/>
      </div>
    </div>
  );
}
