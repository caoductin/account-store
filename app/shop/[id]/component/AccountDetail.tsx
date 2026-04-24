"use client";

import Link from "next/link";
import { useState } from "react";
import { GameAccount } from "./Accountsgrid";
import { getSupabaseBrowserClient } from "@/app/lib/superbase/browser_client";

const RARITY_STYLE: Record<
  string,
  { gradient: string; text: string; glow: string }
> = {
  Thường: {
    gradient: "from-slate-500 to-slate-600",
    text: "text-slate-300",
    glow: "shadow-slate-500/20",
  },
  Hiếm: {
    gradient: "from-blue-500 to-blue-700",
    text: "text-blue-300",
    glow: "shadow-blue-500/30",
  },
  "Siêu hiếm": {
    gradient: "from-purple-500 to-violet-700",
    text: "text-purple-300",
    glow: "shadow-purple-500/40",
  },
  "Huyền thoại": {
    gradient: "from-yellow-400 to-orange-600",
    text: "text-yellow-300",
    glow: "shadow-yellow-500/50",
  },
};

const DEFAULT_STYLE = RARITY_STYLE["Thường"];

type PurchaseResult = {
  order_id: string;
  username: string;
  password: string;
  title: string;
  balance_after: number;
};

export default function AccountDetail({ account }: { account: GameAccount }) {
  const [activeImage, setActiveImage] = useState(0);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<PurchaseResult | null>(null);
  const [copied, setCopied] = useState<"username" | "password" | null>(null);
  const supabase = getSupabaseBrowserClient();
  const style = RARITY_STYLE[account.rarity] ?? DEFAULT_STYLE;

  const handleBuy = async () => {
    setBuying(true);
    setError("");

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setError("Bạn cần đăng nhập để mua hàng.");
        setBuying(false);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/buy-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          },
          body: JSON.stringify({ account_id: account.id }),
        },
      );

      const json = await res.json();
      console.log("=== BUY RESULT ===", JSON.stringify(json, null, 2));

      if (!res.ok || !json.success) {
        setError(json.error ?? "Có lỗi xảy ra.");
        setBuying(false);
        return;
      }

      setResult(json.data);
    } catch (err) {
      setError("Không thể kết nối máy chủ.");
    } finally {
      setBuying(false);
    }
  };

  const copyToClipboard = async (
    text: string,
    field: "username" | "password",
  ) => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <div
        className={`absolute top-0 left-0 w-full h-64 bg-gradient-to-b ${style.gradient} opacity-5 pointer-events-none`}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Back */}
        <Link
          href="/accounts"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-sm mb-8 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Quay lại danh sách
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left — Images */}
          <div>
            <div
              className={`relative w-full aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl ${style.glow}`}
            >
              {account.images?.[activeImage] ? (
                <img
                  src={account.images[activeImage]}
                  alt={account.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  🎮
                </div>
              )}
              {account.is_sold && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="bg-red-500 text-white font-black px-6 py-2 rounded-full uppercase tracking-widest text-sm">
                    Đã bán
                  </span>
                </div>
              )}
            </div>

            {account.images?.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {account.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === i
                        ? "border-blue-400 scale-105"
                        : "border-slate-700 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Info */}
          <div className="flex flex-col gap-5">
            <div>
              <span
                className={`inline-block text-xs font-black px-3 py-1 rounded-full bg-gradient-to-r ${style.gradient} text-white mb-3`}
              >
                {account.rarity}
              </span>
              <h1 className="text-white font-black text-2xl leading-snug">
                {account.title}
              </h1>
            </div>

            {/* Price */}
            <div
              className={`bg-gradient-to-br ${style.gradient} p-[1.5px] rounded-2xl`}
            >
              <div className="bg-slate-900 rounded-2xl px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">
                    Giá bán
                  </p>
                  <p
                    className={`font-black text-3xl ${account.is_sold ? "line-through text-slate-600" : "text-yellow-400"}`}
                  >
                    {account.price != null
                      ? account.price.toLocaleString("vi-VN") + " ₫"
                      : "Liên hệ"}
                  </p>
                </div>
                {!account.is_sold && (
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${style.gradient} flex items-center justify-center text-xl`}
                  >
                    🎮
                  </div>
                )}
              </div>
            </div>

            {/* Info rows */}
            <div className="space-y-2">
              <InfoRow label="Loại đăng nhập" value={account.login_type} />
              <InfoRow
                label="Trạng thái"
                value={account.is_sold ? "Đã bán" : "Còn hàng"}
                valueClass={
                  account.is_sold ? "text-red-400" : "text-emerald-400"
                }
              />
            </div>

            {account.description && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <p className="text-slate-500 text-xs uppercase tracking-wide mb-2">
                  Mô tả
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {account.description}
                </p>
              </div>
            )}

            {/* Login info — ẩn trước khi mua */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <p className="text-slate-500 text-xs uppercase tracking-wide">
                Thông tin đăng nhập
              </p>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">Tài khoản</span>
                <span className="text-slate-600 text-xs font-mono">
                  ••••••••••••
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">Mật khẩu</span>
                <span className="text-slate-600 text-xs font-mono">
                  ••••••••••••
                </span>
              </div>
              <p className="text-slate-600 text-[10px] text-center pt-1">
                🔒 Thông tin sẽ hiển thị sau khi mua
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-3 bg-red-900/40 border border-red-700 rounded-xl text-red-300 text-sm">
                ⚠️ {error}
              </div>
            )}

            {/* Buy button */}
            {!account.is_sold && (
              <button
                onClick={handleBuy}
                disabled={buying}
                className={`w-full bg-gradient-to-r ${style.gradient} text-white font-black py-4 rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2`}
              >
                {buying ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    💳 Mua ngay —{" "}
                    {account.price != null
                      ? account.price.toLocaleString("vi-VN") + " ₫"
                      : "Liên hệ"}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Success Modal ──────────────────────────────────────── */}
      {result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
          <div
            className={`bg-gradient-to-br ${style.gradient} p-[1.5px] rounded-3xl shadow-2xl w-full max-w-sm`}
          >
            <div className="bg-slate-900 rounded-3xl p-7 space-y-5">
              {/* Header */}
              <div className="text-center">
                <div className="text-4xl mb-3">🎉</div>
                <p className="text-white font-black text-xl">Mua thành công!</p>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                  {result.title}
                </p>
              </div>

              {/* Credentials */}
              <div className="space-y-3">
                <p className="text-slate-500 text-xs uppercase tracking-wide text-center">
                  Thông tin đăng nhập
                </p>

                <div className="flex items-center justify-between bg-slate-800 rounded-xl px-4 py-3">
                  <span className="text-slate-400 text-xs">Tài khoản</span>
                  <button
                    onClick={() => copyToClipboard(result.username, "username")}
                    className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors max-w-[160px] truncate"
                  >
                    {copied === "username" ? "✓ Đã copy!" : result.username}
                  </button>
                </div>

                <div className="flex items-center justify-between bg-slate-800 rounded-xl px-4 py-3">
                  <span className="text-slate-400 text-xs">Mật khẩu</span>
                  <button
                    onClick={() => copyToClipboard(result.password, "password")}
                    className="text-xs font-mono text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    {copied === "password" ? "✓ Đã copy!" : result.password}
                  </button>
                </div>
              </div>

              {/* Balance after */}
              <div className="flex justify-between items-center border-t border-slate-800 pt-4 text-xs">
                <span className="text-slate-500">Số dư còn lại</span>
                <span className="text-emerald-400 font-black text-base">
                  {result.balance_after.toLocaleString("vi-VN")} ₫
                </span>
              </div>

              {/* Warning */}
              <p className="text-slate-600 text-[10px] text-center leading-relaxed">
                ⚠️ Hãy lưu thông tin ngay. Sau khi đóng bạn có thể xem lại trong
                lịch sử mua hàng.
              </p>

              {/* Close */}
              <button
                onClick={() => setResult(null)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                Đã lưu, đóng lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5">
      <span className="text-slate-400 text-xs">{label}</span>
      <span className={`text-xs font-semibold ${valueClass ?? "text-white"}`}>
        {value}
      </span>
    </div>
  );
}
