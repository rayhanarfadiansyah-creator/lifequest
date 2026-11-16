
type QuestCardProps = {
  isCompleted: boolean;
  onComplete: () => void;
};

export default function QuestCard({
  isCompleted,
  onComplete,
}: QuestCardProps) {
  return (
    <div className="rounded-xl bg-gray-800 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Learn React
        </h2>

        <span className="text-sm text-yellow-400">
          {isCompleted ? "Completed" : "In Progress"}
        </span>
      </div>

      <p className="mt-3 text-gray-400">
        Understand React components and state.
      </p>

      <p className="mt-3 text-purple-400">
        +50 XP
      </p>

      <p className="mt-2 text-sm text-gray-400">
        {isCompleted
          ? "Reward Claimed 🎁"
          : "Reward Locked 🔒"}
      </p>

      <button
        onClick={onComplete}
        disabled={isCompleted}
        className="mt-5 rounded-lg bg-purple-600 px-5 py-2 disabled:bg-gray-600"
      >
        {isCompleted ? "Quest Completed!" : "Complete Quest"}
      </button>
    </div>
  );
}
