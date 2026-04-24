"use client";

import Lottie from "react-lottie-player";
import { useEffect, useState } from "react";
import boxOpen from "@/app/loties/explosion.json";
import boxIdle from "@/app/loties/box.json";
import { getSupabaseBrowserClient } from "@/app/lib/superbase/browser_client";
import AuthModal from "@/app/modal/AuthModel";
import { useAuth } from "@/app/context/AuthContext";
import { BlindBag } from "../../components/BagePageClient";

type RevealedAccount = {
  id: string;
  title: string;
  username: string;
  password: string;
  description: string | null;
  images: string[];
  login_type: string;
  rarity: string;
  price: number | null;
};

const RARITY_STYLE: Record<string, { bg: string; text: string; glow: string }> =
{
  Thường: {
    bg: "from-slate-500 to-slate-600",
    text: "text-slate-200",
    glow: "shadow-slate-500/30",
  },
  Hiếm: {
    bg: "from-blue-500 to-blue-700",
    text: "text-blue-200",
    glow: "shadow-blue-500/40",
  },
  "Siêu hiếm": {
    bg: "from-purple-500 to-violet-700",
    text: "text-purple-200",
    glow: "shadow-purple-500/50",
  },
  "Huyền thoại": {
    bg: "from-yellow-400 to-orange-600",
    text: "text-yellow-100",
    glow: "shadow-yellow-500/60",
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BlindBoxGame({ bagId }: { bagId: string }) {
  const BOX_COUNT = 6;

  const [status, setStatus] = useState<"idle" | "opening" | "reveal" | "error">(
    "idle",
  );
  const [bag, setBag] = useState<BlindBag | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // ✅ result giờ là RevealedAccount, không phải OpenResult
  const [result, setResult] = useState<RevealedAccount | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const [pricePaid, setPricePaid] = useState<number | null>(null); // ✅ thêm state này
  const [copied, setCopied] = useState<"username" | "password" | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const { user } = useAuth();
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const initData = async () => {
      setLoading(true);

      try {
        const bagRes = await supabase
          .from("blind_bags")
          .select("*")
          .eq("id", bagId)
          .single();

        console.log("bagRes:", bagRes);

        if (bagRes.error) {
          console.error("bag error:", bagRes.error);
        } else {
          setBag(bagRes.data);
        }

        if (user) {
          const profileRes = await supabase
            .from("profiles")
            .select("balance")
            .eq("id", user.id)
            .single();

          const data = profileRes.data as { balance: number } | null;
          if (data) {
            setBalance(data.balance);
          }
        }
      } catch (err) {
        console.error("initData error:", err);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, [bagId, user?.id]); // ✅ user?.id thay vì user

  // ── Open box ────────────────────────────────────────────────────────────────
  const handleChoose = async (index: number) => {
    if (status !== "idle") return;

    setSelectedIndex(index);
    setStatus("opening");
    setErrorMsg("");

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setErrorMsg("Bạn cần đăng nhập để mở túi.");
        setStatus("error");
        setShowAuth(true);
        return;
      }

      if (bag === null) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/open-blind-bag`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          },
          body: JSON.stringify({ bag_id: bag.id }),
        },
      );

      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMsg(json.error ?? "Có lỗi xảy ra.");
        setStatus("error");
        setSelectedIndex(null);
        return;
      }

      // Đợi animation mở hết (2.5s) rồi reveal
      setTimeout(() => {
        // ✅ json.data.account là RevealedAccount
        setResult(json.data.account);
        // ✅ balance_after từ RPC
        setBalance(json.data.balance_after);
        // ✅ giá đã trả = giá túi
        setPricePaid(bag.price);
        setStatus("reveal");
      }, 2500);
    } catch (error) {
      console.error("error:", error);
      setErrorMsg("Không thể kết nối máy chủ.");
      setStatus("error");
      setSelectedIndex(null);
    }
  };

  const handleReset = () => {
    setSelectedIndex(null);
    setStatus("idle");
    setResult(null);
    setErrorMsg("");
    setCopied(null);
    setPricePaid(null);
  };

  const copyToClipboard = async (
    text: string,
    field: "username" | "password",
  ) => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  // ✅ result giờ là RevealedAccount nên dùng result.rarity trực tiếp
  const rarityStyle = result
    ? (RARITY_STYLE[result.rarity] ?? RARITY_STYLE["Thường"])
    : null;

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <span className="w-8 h-8 border-2 border-t-yellow-400 rounded-full animate-spin" />
      </div>
    );

  if (!bag) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Không tìm thấy thông tin túi mù này.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center px-4 py-12">
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-yellow-400 uppercase tracking-widest mb-2">
          🎁 {bag.name}
        </h1>
        {bag.description && (
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            {bag.description}
          </p>
        )}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="text-center">
            <p className="text-xs text-slate-500 uppercase tracking-wide">
              Giá mở
            </p>
            <p className="text-xl font-black text-yellow-400">
              {bag.price != null
                ? bag.price.toLocaleString("vi-VN") + " ₫"
                : "Miễn phí"}
            </p>
          </div>
          {balance !== null && (
            <div className="text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Số dư của bạn
              </p>
              <p
                className={`text-xl font-black ${balance >= (bag.price ?? 0) ? "text-emerald-400" : "text-red-400"}`}
              >
                {balance.toLocaleString("vi-VN")} ₫
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="mb-6 px-5 py-3 bg-red-900/50 border border-red-700 rounded-2xl text-red-300 text-sm text-center max-w-sm">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Boxes grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl w-full">
        {Array.from({ length: BOX_COUNT }).map((_, index) => {
          const isSelected = selectedIndex === index;
          const isDimmed = selectedIndex !== null && !isSelected;

          return (
            <div
              key={index}
              onClick={() => handleChoose(index)}
              className={`
                relative flex flex-col items-center justify-center rounded-2xl transition-all duration-500
                ${status === "idle" ? "cursor-pointer hover:scale-105 active:scale-95" : ""}
                ${isDimmed ? "opacity-20 grayscale blur-[1px] pointer-events-none" : ""}
              `}
            >
              {status === "opening" && isSelected ? (
                <Lottie
                  animationData={boxOpen}
                  play
                  style={{ width: 200, height: 200 }}
                />
              ) : status === "reveal" && isSelected && result ? (
                /* ✅ Reveal card — dùng result.xxx trực tiếp */
                <div
                  className={`bg-gradient-to-br ${rarityStyle!.bg} p-[2px] rounded-2xl shadow-2xl ${rarityStyle!.glow} animate-in zoom-in duration-500`}
                >
                  <div className="bg-slate-900 rounded-2xl p-5 text-center w-44">
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-1">
                      Bạn nhận được
                    </p>
                    <p
                      className={`font-black text-sm mb-0.5 ${rarityStyle!.text}`}
                    >
                      {result.rarity} {/* ✅ */}
                    </p>
                    <p className="text-white font-bold text-xs leading-snug line-clamp-2 mb-3">
                      {result.title} {/* ✅ */}
                    </p>
                    {result.images?.[0] /* ✅ */ && (
                      <img
                        src={result.images[0]}
                        className="w-full h-20 object-cover rounded-lg mb-3"
                        alt=""
                      />
                    )}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between bg-slate-800 rounded-lg px-2 py-1.5">
                        <span className="text-slate-400 text-[10px]">
                          Tài khoản
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(result.username, "username");
                          }} /* ✅ */
                          className="text-[10px] text-blue-400 hover:text-blue-300 font-mono truncate max-w-[80px]"
                        >
                          {copied === "username" ? "✓ Copied" : result.username}{" "}
                          {/* ✅ */}
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-slate-800 rounded-lg px-2 py-1.5">
                        <span className="text-slate-400 text-[10px]">
                          Mật khẩu
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(result.password, "password");
                          }} /* ✅ */
                          className="text-[10px] text-yellow-400 hover:text-yellow-300 font-mono"
                        >
                          {copied === "password" ? "✓ Copied" : "••••• Tap"}
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-500 text-[9px] mt-2">
                      {result.login_type}
                    </p>{" "}
                    {/* ✅ */}
                  </div>
                </div>
              ) : (
                /* Idle / dimmed boxes */
                <div className="relative">
                  <Lottie
                    loop
                    animationData={boxIdle}
                    play={status === "idle"}
                    style={{ width: 180, height: 180 }}
                  />
                  {status === "idle" && (
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/30 text-[10px] font-mono whitespace-nowrap">
                      #{index + 101}
                    </span>
                  )}
                  {status === "reveal" && !isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-black/60 text-slate-400 text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10">
                        Không trúng
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Full result card below on reveal */}
      {status === "reveal" && result && (
        <div className="mt-10 w-full max-w-sm">
          <div
            className={`bg-gradient-to-br ${rarityStyle!.bg} p-[1.5px] rounded-3xl shadow-2xl ${rarityStyle!.glow}`}
          >
            <div className="bg-slate-900 rounded-3xl p-6 space-y-4">
              <div className="text-center">
                <p className="text-slate-400 text-xs uppercase tracking-widest">
                  Thông tin chi tiết
                </p>
                <p className={`text-lg font-black mt-1 ${rarityStyle!.text}`}>
                  {result.title} {/* ✅ */}
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${rarityStyle!.bg} text-white mt-1`}
                >
                  {result.rarity} {/* ✅ */}
                </span>
              </div>

              {result.images?.[0] /* ✅ */ && (
                <img
                  src={result.images[0]}
                  className="w-full h-36 object-cover rounded-2xl"
                  alt=""
                />
              )}

              <div className="space-y-2">
                <InfoRow label="Loại đăng nhập" value={result.login_type} />{" "}
                {/* ✅ */}
                <div className="flex items-center justify-between bg-slate-800 rounded-xl px-4 py-2.5">
                  <span className="text-slate-400 text-xs">Tài khoản</span>
                  <button
                    onClick={() =>
                      copyToClipboard(result.username, "username")
                    } /* ✅ */
                    className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {copied === "username" ? "✓ Đã copy!" : result.username}{" "}
                    {/* ✅ */}
                  </button>
                </div>
                <div className="flex items-center justify-between bg-slate-800 rounded-xl px-4 py-2.5">
                  <span className="text-slate-400 text-xs">Mật khẩu</span>
                  <button
                    onClick={() =>
                      copyToClipboard(result.password, "password")
                    } /* ✅ */
                    className="text-xs font-mono text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    {copied === "password" ? "✓ Đã copy!" : "Nhấn để copy"}
                  </button>
                </div>
              </div>

              {result.description /* ✅ */ && (
                <p className="text-slate-500 text-xs leading-relaxed text-center">
                  {result.description}
                </p>
              )}

              {/* ✅ Dùng pricePaid và balance thay vì result.price_paid / result.balance_after */}
              <div className="border-t border-slate-800 pt-3 flex justify-between text-xs text-slate-500">
                <span>Đã trả</span>
                <span className="text-red-400 font-bold">
                  -{(pricePaid ?? 0).toLocaleString("vi-VN")} ₫
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Số dư còn lại</span>
                <span className="text-emerald-400 font-bold">
                  {(balance ?? 0).toLocaleString("vi-VN")} ₫
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset button */}
      {(status === "reveal" || status === "error") && (
        <button
          onClick={handleReset}
          className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 px-12 rounded-full shadow-[0_0_30px_rgba(234,179,8,0.35)] transition-all hover:scale-105 active:scale-95 text-sm uppercase tracking-widest"
        >
          {status === "error" ? "Thử lại" : "Mở túi mới! 🎁"}
        </button>
      )}

      {/* Insufficient balance warning */}
      {status === "idle" &&
        balance !== null &&
        bag.price !== null &&
        balance < bag.price && (
          <div className="mt-6 text-center">
            <p className="text-red-400 text-sm font-semibold">
              Số dư không đủ — cần thêm{" "}
              {(bag.price - balance).toLocaleString("vi-VN")} ₫
            </p>
            <a
              href="/wallet"
              className="text-xs text-blue-400 hover:underline mt-1 block"
            >
              Nạp tiền ngay →
            </a>
          </div>
        )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between bg-slate-800 rounded-xl px-4 py-2.5">
      <span className="text-slate-400 text-xs">{label}</span>
      <span className="text-white text-xs font-medium">{value}</span>
    </div>
  );
}
