"use client";
import BagGrid from "./components/BagGrid";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroBanner from "./components/Herobanner";
import LiveActivity from "./components/LiveActivity";

export default function Home() {
  return (
    // THÊM: relative và overflow-x-hidden để chặn mọi phần tử "lòi" ra ngoài
    <main className="relative min-h-screen bg-[#F8FAFC] overflow-x-hidden">
      <Header />

      {/* SỬA: Thêm w-full để đảm bảo div này không bao giờ vượt quá chiều rộng màn hình.
        Padding được giữ nguyên để tạo khoảng cách an toàn với mép màn hình mobile.
      */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Banner: Đảm bảo bên trong component này không có div nào dùng w-screen */}
        <HeroBanner />

        <div className="mt-12">
          {/* Header Section: Tối ưu font size cho mobile (text-2xl) lên desktop (text-3xl) */}
          <div className="flex items-center gap-2 mb-8 border-l-4 border-blue-600 pl-4">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tight">
              Túi Mù FreeFire
            </h2>
          </div>

          {/* Grid System: 
            - lg:grid-cols-4: Chia 4 cột ở máy tính.
            - gap-6 (mobile) lên gap-8 (desktop) để tránh layout bị dãn quá mức.
          */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Danh sách túi: Ưu tiên hiển thị trước trên Mobile */}
            <div className="lg:col-span-3 order-1">
              <BagGrid />
            </div>

            {/* Sidebar: Đẩy xuống dưới cùng trên Mobile để không chắn tầm nhìn */}
            <div className="lg:col-span-1 order-2 lg:order-last">
              <LiveActivity />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
