export async function openBoxAPI(index: number) {
  await new Promise((r) => setTimeout(r, 800));

  const ITEMS = [
    "💎 Skin Kim Cương",
    "🔥 Skin Huyền Thoại",
    "⚡ Voucher 10k",
    "🎁 Hộp quà",
    "💀 Item hiếm",
  ];

  return {
    user: {
      account: "k123k43",
      password: "12i3i12i3i12",
    },
    reward: ITEMS[Math.floor(Math.random() * ITEMS.length)],
  };
}

