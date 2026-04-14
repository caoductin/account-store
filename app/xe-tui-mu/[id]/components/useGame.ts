"use client";

import { useEffect, useState } from "react";
import { openBoxAPI } from "@/app/lib/server";
import { shootFireworks } from "./shootFireworks";


const price = 20000;

export default function useGame() {
  const [balance, setBalance] = useState(200000);
  const [opened, setOpened] = useState<Record<number, string>>({});
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [rewardPopup, setRewardPopup] = useState<any>(null);

  useEffect(() => {
    console.log("Hook useGame đã sẵn sàng");
  }, []);

 const openCard = async (index: number) => {
  if (opened[index] || loadingIndex !== null) return;
  if (balance < price) return alert("Không đủ tiền");

  setLoadingIndex(index);
  console.log("Đang gọi API cho card:", index);

  try {
    const res = await openBoxAPI(index); 
    console.log("Kết quả API:", res);

    if (res && res.reward) {
      setBalance((b) => b - price);
      setOpened((prev) => ({
        ...prev,
        [index]: res.reward,
      }));
      shootFireworks();
      setRewardPopup(res);
    }
  } catch (error) {
    console.error("Lỗi API rồi bạn ơi:", error);
    alert("Có lỗi kết nối đến server!");
  } finally {
    setLoadingIndex(null); // Luôn luôn tắt loading dù thành công hay thất bại
  }
};

  return {
    balance,
    opened,
    openCard,
    loadingIndex,
    rewardPopup,
    setRewardPopup,
  };
}