type XPCounterProps = {
  xp: number;
};

export default function XPCounter({ xp }: XPCounterProps) {
  return (
    <div className="rounded-xl bg-gray-800 p-6">
      <h2 className="text-2xl font-bold">
        Total Experience
      </h2>

      <p className="mt-3 text-3xl font-bold text-purple-400">
        {xp} XP
      </p>
    </div>
  );
}
