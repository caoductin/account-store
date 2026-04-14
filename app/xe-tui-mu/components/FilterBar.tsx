"use client";

export default function FilterBar() {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {["Tất cả", "Giá rẻ", "Hot", "VIP"].map((item) => (
        <button
          key={item}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white font-bold text-sm transition"
        >
          {item}
        </button>
      ))}
    </div>
  );
}