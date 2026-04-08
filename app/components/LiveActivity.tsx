export default function LiveActivity() {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm sticky top-24">
      <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        Vừa trúng Acc
      </h3>
      
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              U
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">user_***{i}2</p>
              <p className="text-[11px] text-slate-500">Vừa mở Túi 20k</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">Trúng Acc</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl text-sm transition-all">
        Xem tất cả
      </button>
    </div>
  )
}