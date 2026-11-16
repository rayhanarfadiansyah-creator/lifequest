"use client";

type GemShopProps = {
  onBack: () => void;
  onTopUp: (amount: number) => void;
};

const gemPackages = [
  { gems: 50, price: "Rp10.000", name: "Starter Pack" },
  { gems: 100, price: "Rp15.000", name: "Adventurer Pack" },
  { gems: 250, price: "Rp20.000", name: "Hero Pack" },
  { gems: 500, price: "Rp35.000", name: "Legend Pack" },
];

export default function GemShop({ onBack, onTopUp }: GemShopProps) {
  return (
    <main className="min-h-screen bg-[#100f1b] p-5 text-white md:p-10">
      <button
        onClick={onBack}
        className="mb-8 rounded-lg border border-yellow-500/40 bg-gray-800 px-4 py-2 font-bold text-yellow-300"
      >
        ← BACK
      </button>

      <header className="mb-8 text-center">
        <p className="text-sm tracking-[0.3em] text-purple-400">
          LIFEQUEST STORE
        </p>
        <h1 className="mt-2 text-4xl font-black text-yellow-300">
          💎 GEM SHOP
        </h1>
        <p className="mt-3 text-gray-400">
          Choose your Gems package and power up your adventure.
        </p>
      </header>

      <section className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        {gemPackages.map((item) => (
          <div
            key={item.gems}
            className="rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-purple-900/60 to-gray-900 p-6 text-center"
          >
            <p className="text-sm font-bold text-purple-300">
              {item.name}
            </p>

            <h2 className="my-4 text-4xl font-black text-yellow-300">
              💎 {item.gems}
            </h2>

            <p className="mb-5 text-xl font-bold">
              {item.price}
            </p>

            <button
              onClick={() => onTopUp(item.gems)}
              className="w-full rounded-xl bg-yellow-500 py-3 font-black text-gray-950 transition hover:bg-yellow-300"
            >
              BUY GEMS
            </button>
          </div>
        ))}
      </section>

      <p className="mt-8 text-center text-xs text-gray-500">
        Demo store — payments are simulated, no real money is charged.
      </p>
    </main>
  );
}
