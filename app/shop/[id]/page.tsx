// app/accounts/[id]/page.tsx — Server Component
import { createSupabaseServerClient } from "@/app/lib/superbase/server_client";
import { notFound } from "next/navigation";
import AccountDetail from "./component/AccountDetail";

export const revalidate = 60;

export default async function AccountDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: account, error } = await supabase
    .from("public_game_accounts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !account) notFound();

  return <AccountDetail account={account} />;
}
