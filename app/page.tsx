import BlindBagSection from "./components/BlindBagSection";
import CTA from "./components/CTA";
import Features from "./components/Features";
import Hero from "./components/Hero";
import { createSupabaseServerClient } from "./lib/superbase/server_client";

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();

  const { data: bags, error } = await supabase
    .from("blind_bags")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) console.error("Supabase error:", error);

  return (
    <main className="bg-slate-50 min-h-screen">
      <Hero />
      <Features />
      <BlindBagSection bags={bags ?? []} loading={false} />
      <CTA />
      {/* <Footer /> */}
    </main>
  );
}
