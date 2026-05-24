import { HeroSplit } from "@/components/home/hero-split";
import { Manifesto } from "@/components/home/manifesto";
import { TopicsBento } from "@/components/home/topics-bento";
import { ParticipantsMarquee } from "@/components/home/participants-marquee";
import { StatsStrip } from "@/components/home/stats-strip";

export default function HomePage() {
  return (
    <>
      <HeroSplit />
      <Manifesto />
      <TopicsBento />
      <ParticipantsMarquee />
      <StatsStrip />
    </>
  );
}
