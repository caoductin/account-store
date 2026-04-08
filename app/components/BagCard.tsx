export default function BagCard({ bag }: { bag: any }) {
  return (
    <div className="group bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image: Trên Mobile sẽ to và rõ ràng */}
      <div className="relative aspect-[16/9] sm:aspect-square overflow-hidden rounded-[24px] bg-slate-50 mb-4">
        <img
          src={bag.image}
          alt={bag.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
          {bag.tag || "Hot"}
        </div>
      </div>

      {/* Info Section */}
      <div className="px-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-slate-800 font-extrabold text-xl sm:text-lg leading-tight">
            {bag.name}
          </h3>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
            <span className="text-yellow-500 text-xs">⭐ 5.0</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-5 text-[13px] text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Đã mở: <b>{bag.playCount.toLocaleString()}</b>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            Tỉ lệ: <b>Cực cao</b>
          </span>
        </div>

        {/* Action Area: Giá và Nút bấm */}
        <div className="flex items-center justify-between gap-4 bg-slate-50 p-3 rounded-2xl">
          <div>
            <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-widest">
              Giá xé
            </span>
            <span className="text-2xl font-black text-blue-600">
              {bag.price.toLocaleString()}đ
            </span>
          </div>
          <button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-black text-sm transition-all active:scale-95 shadow-lg shadow-blue-200 uppercase">
            Mở Ngay 🎉
          </button>
        </div>
      </div>
    </div>
  );
}
