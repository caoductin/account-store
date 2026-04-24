// app/accounts/page.tsx — Server Component
import { createSupabaseServerClient } from "@/app/lib/superbase/server_client";
import AccountsGrid from "./[id]/component/Accountsgrid";

export const revalidate = 20;

export default async function AccountsPage() {
  const supabase = await createSupabaseServerClient();

  const { data: accounts, error } = await supabase
    .from("public_game_accounts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error("Lỗi fetch accounts:", error);

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-blue-400/60 text-xs uppercase tracking-[0.3em] font-bold mb-3">
            Kho tài khoản
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-none mb-4">
            Tài Khoản
            <span className="text-blue-400"> Game</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Khám phá kho tài khoản game chất lượng cao. Đa dạng thể loại, nhiều
            mức giá.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-blue-400/30" />
            <span className="text-blue-400/50 text-lg">✦</span>
            <span className="w-8 h-px bg-blue-400/30" />
          </div>
        </div>

        <AccountsGrid accounts={accounts ?? []} />
      </div>
    </div>
  );
}
