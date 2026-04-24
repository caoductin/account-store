"use client";

import Link from "next/link";

export type GameAccount = {
  id: string;
  title: string;
  description: string | null;
  images: string[];
  price: number | null;
  login_type: string;
  rarity: string;
  is_sold: boolean;
  bag_id: string | null;
  created_at: string;
};

const RARITY_STYLE: Record<
  string,
  { gradient: string; badge: string; glow: string }
> = {
  Thường: {
    gradient: "from-slate-500 to-slate-600",
    badge: "bg-slate-700 text-slate-300",
    glow: "group-hover:shadow-slate-500/20",
  },
  Hiếm: {
    gradient: "from-blue-500 to-blue-700",
    badge: "bg-blue-900/60 text-blue-300",
    glow: "group-hover:shadow-blue-500/20",
  },
  "Siêu hiếm": {
    gradient: "from-purple-500 to-violet-700",
    badge: "bg-purple-900/60 text-purple-300",
    glow: "group-hover:shadow-purple-500/30",
  },
  "Huyền thoại": {
    gradient: "from-yellow-400 to-orange-600",
    badge: "bg-yellow-900/60 text-yellow-300",
    glow: "group-hover:shadow-yellow-500/30",
  },
};

const DEFAULT_STYLE = RARITY_STYLE["Thường"];

export default function AccountsGrid({
  accounts,
}: {
  accounts: GameAccount[];
}) {
  if (accounts.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-5xl mb-4">🎮</p>
        <p className="text-slate-400 text-sm">Chưa có tài khoản nào.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {accounts.map((acc) => {
        const style = RARITY_STYLE[acc.rarity] ?? DEFAULT_STYLE;

        return (
          <Link
            key={acc.id}
            href={`/shop/${acc.id}`}
            className="group relative block"
          >
            {/* Glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500`}
            />

            {/* Card */}
            <div
              className={`relative bg-slate-900 border border-slate-800 group-hover:border-slate-600 rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-black/50 ${style.glow} ${acc.is_sold ? "opacity-50" : ""}`}
            >
              {/* Top bar */}
              <div
                className={`h-1 w-full bg-gradient-to-r ${style.gradient}`}
              />

              {/* Image */}
              <div className="relative w-full h-40 bg-slate-800 overflow-hidden">
                {acc.images?.[0] ? (
                  <img
                    src={acc.images[0]}
                    alt={acc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    🎮
                  </div>
                )}
                {/* Sold overlay */}
                {acc.is_sold && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="bg-red-500/90 text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                      Đã bán
                    </span>
                  </div>
                )}
                {/* Rarity badge */}
                <span
                  className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-1 rounded-full ${style.badge}`}
                >
                  {acc.rarity}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 mb-1 group-hover:text-blue-400 transition-colors duration-200">
                  {acc.title}
                </h3>

                <p className="text-slate-500 text-[11px] mb-3">
                  {acc.login_type}
                </p>

                <div className="flex items-center justify-between">
                  <p
                    className={`font-black text-base ${acc.is_sold ? "text-slate-600 line-through" : "text-yellow-400"}`}
                  >
                    {acc.price != null
                      ? acc.price.toLocaleString("vi-VN") + " ₫"
                      : "Liên hệ"}
                  </p>
                  {!acc.is_sold && (
                    <span
                      className={`text-[10px] font-bold bg-gradient-to-r ${style.gradient} text-white px-2.5 py-1 rounded-full`}
                    >
                      Xem →
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
