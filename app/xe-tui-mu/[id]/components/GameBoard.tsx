"use client";

import Card from "./Card";
import RewardModal from "./RewardModal";
import useGame from "./useGame";

export default function GameBoard() {
  const {
    balance,
    opened,
    openCard,
    loadingIndex,
    rewardPopup,
    setRewardPopup,
  } = useGame();

  const cards = Array.from({ length: 12 });

  return (
    <div>
      {/* balance */}
      <div className="mb-4 font-bold text-blue-600">
        💰 Số dư: {balance.toLocaleString()}đ
      </div>

      {/* grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {cards.map((_, i) => (
          <Card
            key={i}
            value={opened[i]}
            loading={loadingIndex === i}
            onClick={() => openCard(i)}
          />
        ))}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        💸 Mỗi lần lật: 20.000đ
      </p>

      <RewardModal
        data={rewardPopup}
        onClose={() => setRewardPopup(null)}
      />
    </div>
  );
}