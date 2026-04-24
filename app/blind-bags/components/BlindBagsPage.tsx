// app/blind-bags/page.tsx — Server Component, KHÔNG có "use client"
import { createSupabaseServerClient } from "@/app/lib/superbase/server_client";
import BlindBagsGrid from "./BagePageClient";

export const revalidate = 60; // cache 60 giây, không fetch lại mỗi lần navigate

export default async function BlindBagsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: bags, error } = await supabase
    .from("blind_bags")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Lỗi fetch blind_bags:", error);
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-yellow-400/60 text-xs uppercase tracking-[0.3em] font-bold mb-3">
            Thử vận may của bạn
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-none mb-4">
            Túi Mù
            <span className="text-yellow-400"> Bí Ẩn</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Mỗi túi chứa một tài khoản game ngẫu nhiên. Mở ra và khám phá điều
            bất ngờ!
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-yellow-400/30" />
            <span className="text-yellow-400/50 text-lg">✦</span>
            <span className="w-8 h-px bg-yellow-400/30" />
          </div>
        </div>

        {/* Grid — nhận data từ server, không fetch lại ở client */}
        <BlindBagsGrid bags={bags ?? []} />
      </div>
    </div>
  );
}
