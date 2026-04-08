export default function HeroBanner() {
  return (
    <section className="py-12 border-b border-slate-100 bg-white rounded-3xl mb-10 shadow-sm overflow-hidden relative">
      {/* Trang trí nhẹ nhàng phía sau */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
      
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
              Xé Túi Mù <br/>
              <span className="text-blue-600">Săn Acc FreeFire Siêu Cấp</span>
            </h1>
            <p className="text-slate-500 text-lg mb-8">
              Hệ thống mở túi mù tự động, nhận tài khoản ngay lập tức. 
              Uy tín - Minh bạch - Tỉ lệ trúng cao.
            </p>
            
            {/* Thay thế Stats bằng Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-2xl">⚡</span>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-800">Tự động</div>
                  <div className="text-[11px] text-slate-500">Nhận Acc sau 1 giây</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-2xl">🛡️</span>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-800">Bảo mật</div>
                  <div className="text-[11px] text-slate-500">100% Acc sạch sạch</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ảnh minh họa hoặc Banner Giftbox */}
          <div className="hidden md:block w-full max-w-sm">
             <div className="relative p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-[40px] aspect-square flex items-center justify-center shadow-inner">
                <span className="text-[150px] animate-bounce">🎁</span>
                {/* Badge nhỏ đè lên ảnh */}
                <div className="absolute -bottom-4 -left-4 bg-white p-4 shadow-xl rounded-2xl border border-slate-100 flex items-center gap-3">
                   <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
                   <div>
                      <div className="text-xs text-slate-400">Giao dịch mới nhất</div>
                      <div className="text-sm font-bold text-slate-800">Nạp 50.000đ thành công</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}