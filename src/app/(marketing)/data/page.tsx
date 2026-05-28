import type { Metadata } from "next";
import { BudgetSection } from "@/components/data/sections/budget-section";
import { ChartsGrid } from "@/components/data/sections/charts-grid";
import { DataHero } from "@/components/data/sections/data-hero";
import { GoldenStatsGrid } from "@/components/data/sections/golden-stats-grid";
import { HouseholdSection } from "@/components/data/sections/household-section";
import { LongTermImpactSection } from "@/components/data/sections/long-term-impact";
import { NoCoordinatorSection } from "@/components/data/sections/no-coordinator-section";
import { ServiceImpactSection } from "@/components/data/sections/service-impact";
import { WhyItMattersSection } from "@/components/data/sections/why-it-matters";
import { WorkforceSection } from "@/components/data/sections/workforce-section";

export const metadata: Metadata = {
  title: "נתוני זהב",
  description: "נתוני זהב על חינוך בלתי פורמלי בישראל: השתתפות, תקציב, השפעה כלכלית-חברתית, ומיומנויות לא קוגניטיביות. מקורות: למ״ס, OECD, ממ\"מ הכנסת, מכון ברוקדייל, מכון דיאלוג.",
};

export default function DataPage() {
  return (
    <>
      <DataHero />
      <GoldenStatsGrid />
      <ChartsGrid />
      <ServiceImpactSection />
      <BudgetSection />
      <HouseholdSection />
      <WorkforceSection />
      <LongTermImpactSection />
      <NoCoordinatorSection />
      <WhyItMattersSection />
    </>
  );
}
