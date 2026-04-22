
"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/superbase/browser_client";
import Hero from "./components/Hero";
import Features from "./components/Features";
import BlindBagSection from "./components/BlindBagSection";
import CTA from "./components/CTA";

// Import các sub-components

export type BlindBag = {
  id: string;
  name: string;
  price: number | null;
  description: string | null;
};

export default function HomePage() {
  const [bags, setBags] = useState<BlindBag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBags();
  }, []);

  const fetchBags = async () => {
    const { data, error } = await supabase
      .from("blind_bags")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) console.error("Supabase error:", error);
    else setBags(data ?? []);
    setLoading(false);
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <Hero />
      <Features />
      <BlindBagSection bags={bags} loading={loading} />
      <CTA />
      {/* <Footer /> */}
    </main>
  );
}
