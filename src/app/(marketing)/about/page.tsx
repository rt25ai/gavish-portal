import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { TimelineHorizontal } from "@/components/about/timeline-horizontal";
import { PartnersBlock } from "@/components/about/partners-block";
import { QuotesBlock } from "@/components/about/quotes-block";

export const metadata: Metadata = {
  title: "אודות",
  description: "תוכנית גביש - פיתוח מקצועי למנהלי מח׳ נוער ברשויות בישראל. יוזמה של קרן רש״י ומועצת ארגוני הילדים והנוער.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <TimelineHorizontal />
      <PartnersBlock />
      <QuotesBlock />
    </>
  );
}
