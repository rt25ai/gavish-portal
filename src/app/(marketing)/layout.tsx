import { SiteNav } from "@/components/nav/site-nav";
import { SiteFooter } from "@/components/nav/site-footer";
import { getNavProfile } from "@/server/profiles/queries";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navUser = await getNavProfile();

  return (
    <>
      <SiteNav user={navUser} />
      <main className="pt-16 lg:pt-20">{children}</main>
      <SiteFooter />
    </>
  );
}
