"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../lib/superbase/browser_client";

type User = { email: string; id: string };

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/shop", label: "Mua tài khoản" },
  { href: "/blind-bags", label: "Blind Bag" },
  { href: "/contact", label: "Liên hệ" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user)
        setUser({ id: data.user.id, email: data.user.email ?? "" });
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_e, session) => {
        setUser(
          session?.user
            ? { id: session.user.id, email: session.user.email ?? "" }
            : null,
        );
      },
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setDropOpen(false);
    router.push("/");
  };

  const initial = user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <span className="text-2xl">🎮</span>
          <div className="leading-tight">
            <span className="font-extrabold text-slate-900 tracking-tight text-base">
              Thắng
            </span>
            <span className="font-extrabold text-red-500 tracking-tight text-base">
              {" "}
              Không{" "}
            </span>
            <span className="font-extrabold text-slate-900 tracking-tight text-base">
              Thua
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                pathname === l.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropOpen((v) => !v)}
                className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                {initial}
              </button>
              {dropOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropOpen(false)}
                  />
                  <div className="absolute right-0 top-11 z-20 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs text-slate-400">Đăng nhập với</p>
                      <p className="text-sm font-semibold text-slate-700 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        👤 Hồ sơ của tôi
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        📦 Đơn hàng
                      </Link>
                      <Link
                        href="/wallet"
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        💰 Ví của tôi
                      </Link>
                      <div className="border-t border-slate-100 mt-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        🚪 Đăng xuất
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100 transition-all"
              >
                Đăng ký
              </Link>
            </div>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-5 py-4 space-y-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                pathname === l.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {!user && (
            <div className="pt-3 flex flex-col gap-2 border-t border-slate-100 mt-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-center border border-slate-200 text-slate-600"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-center bg-blue-600 text-white"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
