// CTA.tsx
import Link from "next/link";
export default function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-20">
      <div className="bg-blue-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-8 relative z-10">
          Sẵn sàng chiến thắng cùng tuimu.vn?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-3 relative z-10">
          <Link
            href="/register"
            className="px-8 py-3.5 rounded-2xl bg-white text-blue-700 font-bold hover:bg-blue-50 transition-all"
          >
            Đăng ký ngay
          </Link>
          <Link
            href="/shop"
            className="px-8 py-3.5 rounded-2xl bg-blue-500 text-white font-semibold border border-blue-400"
          >
            Xem shop tài khoản
          </Link>
        </div>
      </div>
    </section>
  );
}
