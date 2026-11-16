"use client";

type GemWalletProps = {
  gems: number;
};

export default function GemWallet({ gems }: GemWalletProps) {
  return (
    <div className="rounded-xl border border-yellow-500/30 bg-gray-900 p-5">
      <p className="text-sm text-gray-400">Your Wallet</p>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-2xl">💎</span>
        <span className="text-2xl font-bold text-yellow-400">
          {gems} Life Gems
        </span>
      </div>
    </div>
  );
}
