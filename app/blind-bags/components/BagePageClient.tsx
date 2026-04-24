"use client";

import Link from "next/link";

export type BlindBag = {
  id: string;
  name: string;
  price: number | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
};

const RARITY_GRADIENTS = [
  "from-yellow-400 via-orange-500 to-red-500",
  "from-blue-400 via-cyan-500 to-teal-500",
  "from-purple-500 via-violet-500 to-indigo-600",
  "from-emerald-400 via-green-500 to-teal-600",
  "from-pink-500 via-rose-500 to-orange-400",
  "from-slate-400 via-slate-500 to-slate-600",
];

const BOX_ICONS = ["🎁", "🎀", "📦", "🎊", "✨", "🎯"];

export default function BlindBagsGrid({ bags }: { bags: BlindBag[] }) {
  if (bags.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-5xl mb-4">📭</p>
        <p className="text-slate-400 text-sm">Hiện chưa có túi mù nào.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {bags.map((bag, i) => {
          const gradient = RARITY_GRADIENTS[i % RARITY_GRADIENTS.length];
          const icon = BOX_ICONS[i % BOX_ICONS.length];

          return (
            <Link
              key={bag.id}
              href={`/blind-bags/${bag.id}`}
              className="group relative block"
            >
              {/* Glow on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500`}
              />

              {/* Card */}
              <div className="relative bg-slate-900 border border-slate-800 group-hover:border-slate-600 rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-black/50">
                <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-lg`}
                    >
                      {icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-700 rounded-full px-2.5 py-1">
                      Túi mù
                    </span>
                  </div>

                  <h2 className="text-white font-black text-lg leading-tight mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-200">
                    {bag.name}
                  </h2>

                  {bag.description && (
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-5">
                      {bag.description}
                    </p>
                  )}

                  <div className="border-t border-slate-800 mb-4" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-600 uppercase tracking-wide mb-0.5">
                        Giá mở
                      </p>
                      <p className="text-yellow-400 font-black text-lg">
                        {bag.price != null
                          ? bag.price.toLocaleString("vi-VN") + " ₫"
                          : "Miễn phí"}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 bg-gradient-to-r ${gradient} text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg group-hover:scale-105 transition-transform duration-200`}
                    >
                      Mở ngay
                      <svg
                        className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="text-center text-slate-700 text-xs mt-12 uppercase tracking-widest">
        Mỗi lần mở là một bất ngờ ✦ Chúc may mắn
      </p>
    </>
  );
}
