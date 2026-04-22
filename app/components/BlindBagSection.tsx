import Link from "next/link";
import { BlindBag } from "../blind-bags/[id]/page";

export default function BlindBagSection({
  bags,
  loading,
}: {
  bags: BlindBag[];
  loading: boolean;
}) {
  return (
    <section className="bg-white border-y border-slate-200 py-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
            Blind Bag đang mở bán
          </h2>
          <Link
            href="/blind-bags"
            className="text-sm font-semibold text-blue-600 hover:underline italic"
          >
            Xem tất cả →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <span className="w-8 h-8 border-2 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bags.map((bag) => (
              <Link key={bag.id} href={`/blind-bags/${bag.id}`}>
                <div className="group bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:border-blue-400 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl mb-5 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                    🎁
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {bag.name}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-grow">
                    {bag.description || "Khám phá ngay túi mù may mắn."}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <p className="text-lg font-black text-blue-600">
                      {bag.price?.toLocaleString("vi-VN")} ₫
                    </p>
                    <span className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold group-hover:bg-blue-700">
                      MỞ NGAY
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
