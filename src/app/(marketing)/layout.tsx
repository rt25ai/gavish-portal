import { SiteNav, type SiteNavUser } from "@/components/nav/site-nav";
import { SiteFooter } from "@/components/nav/site-footer";
import { createClient } from "@/lib/supabase/server";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navUser = await getNavUser();

  return (
    <>
      <SiteNav user={navUser} />
      <main className="pt-16 lg:pt-20">{children}</main>
      <SiteFooter />
    </>
  );
}

async function getNavUser(): Promise<SiteNavUser> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, avatar_url")
    .eq("id", user.id)
    .single();

  return {
    fullName: profile?.full_name ?? user.email ?? "",
    isAdmin: profile?.role === "admin",
    avatarUrl: profile?.avatar_url ?? null,
  };
}
