
const tiles = Array.from({ length: 81 }, (_, index) => {
  const x = index % 9;
  const y = Math.floor(index / 9);

  const isRoad =
    (x >= 3 && x <= 5) ||
    (y >= 3 && y <= 5);

  return { id: index, isRoad };
});

export default function LobbyMap() {
  return (
    <div className="relative mx-auto w-fit overflow-hidden rounded-xl border-4 border-[#6b503b] bg-[#24452f] p-3">
      <div className="grid grid-cols-9 gap-1">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={`h-9 w-9 border border-black/10 sm:h-12 sm:w-12 ${
              tile.isRoad
                ? "bg-[#a18a68]"
                : "bg-[#43845a]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
