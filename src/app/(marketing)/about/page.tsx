import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { ProgramOverview } from "@/components/about/program-overview";
import { TimelineHorizontal } from "@/components/about/timeline-horizontal";
import { PartnersBlock } from "@/components/about/partners-block";
import { QuotesBlock } from "@/components/about/quotes-block";

export const metadata: Metadata = {
  title: "אודות",
  description: "תוכנית גביש - קהילה מקצועית לומדת למנהלות ומנהלי מחלקות הנוער ברשויות בישראל. יוזמה של קרן רש״י ואיגוד מנהלי מחלקות הנוער.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ProgramOverview />
      <TimelineHorizontal />
      <PartnersBlock />
      <QuotesBlock />
    </>
  );
}
