"use client";
export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 border-l-4 border-blue-600 pl-4">
      <h1 className="text-2xl md:text-3xl font-black text-slate-800 uppercase">
        {title}
      </h1>
    </div>
  );
}