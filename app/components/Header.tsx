"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  Wallet,
  Home,
  Gift,
  ShoppingBag,
  PlusCircle,
  LogIn,
} from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("Header component đã mounted!");
  }, []);

  // Khóa cuộn trang khi mở menu mobile để trải nghiệm tốt hơn
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const isLoggedIn = true;
  const balance = 150000;

  const navLinks = [
    { name: "Trang chủ", href: "/", icon: Home },
    { name: "Xé túi mù", href: "/xe-tui-mu", icon: Gift },
    { name: "Mua acc", href: "/mua-acc", icon: ShoppingBag },
    { name: "Nạp tiền", href: "/topup", icon: PlusCircle },
  ];

  return (
    <>
      <header className="sticky top-0 z-[100] bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 transition-transform group-hover:scale-105">
              <span className="text-xl">🎁</span>
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tighter">
              TUIMU<span className="text-blue-600">.VN</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* User Area */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <div className="hidden md:flex items-center gap-2.5 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                  <Wallet className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-600 font-black text-sm">
                    {balance.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <Link
                  href="/profile"
                  className="hidden md:block p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                >
                  <User className="w-5 h-5" />
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition"
              >
                <LogIn className="w-4 h-4" />
                Đăng nhập
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                console.log("this is call");
                setIsOpen(true);
              }}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition active:scale-90"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE DRAWER --- */}
      {/* Tăng z-index lên z-[9999] để chắc chắn đè lên mọi thứ */}
      <div
        className={`fixed inset-0 z-[9999] transition-all duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop mờ */}
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />

        {/* Thanh Menu trượt */}
        <aside
          className={`absolute right-0 top-0 h-full w-[300px] max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 transform flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Header trong menu */}
          <div className="p-5 flex items-center justify-between border-b border-slate-50">
            <span className="text-lg font-black text-slate-800">DANH MỤC</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Info Section */}
          <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white m-4 rounded-[2rem] shadow-lg shadow-blue-200">
            {isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white border border-white/30">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-100 uppercase font-bold tracking-wider">
                      Số dư túi
                    </p>
                    <p className="text-xl font-black">
                      {balance.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-white text-blue-600 py-3 rounded-2xl font-bold transition"
              >
                Đăng nhập
              </Link>
            )}
          </div>

          {/* Menu Links */}
          <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    console.log("this is call");
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-4 p-4 rounded-2xl text-slate-700 font-bold hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-slate-500" />
                  </div>
                  <span className="text-[16px]">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer menu */}
          <div className="p-6 border-t border-slate-50">
            <button className="w-full py-4 text-sm font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest">
              Đăng xuất
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
