import Link from "next/link";

const STATS = [
  { value: "2,000+", label: "Tài khoản đã bán" },
  { value: "500+", label: "Khách hàng hài lòng" },
  { value: "99%", label: "Đánh giá tích cực" },
  { value: "< 5s", label: "Giao hàng" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-5 py-24 md:py-36 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase mb-6">
          🎮 Shop tài khoản game uy tín số 1
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Thắng <span className="text-red-400">Không</span> Thua
          <span className="text-2xl md:text-3xl font-semibold text-slate-300 mt-2 block italic">
            Nhanh · Rẻ · Uy tín
          </span>
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <Link
            href="/shop"
            className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold transition-all shadow-lg shadow-blue-900/40"
          >
            Mua tài khoản ngay
          </Link>
          <Link
            href="/blind-bags"
            className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur transition-all"
          >
            🎁 Xem Blind Bag
          </Link>
        </div>
      </div>
      <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-5 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-extrabold">{s.value}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
