import { HeroSplit } from "@/components/home/hero-split";
import { CommunityUpdates } from "@/components/home/community-updates";
import { Manifesto } from "@/components/home/manifesto";
import { TopicsBento } from "@/components/home/topics-bento";
import { ParticipantsMarquee } from "@/components/home/participants-marquee";
import { StatsStrip } from "@/components/home/stats-strip";

export default function HomePage() {
  return (
    <>
      <HeroSplit />
      <CommunityUpdates />
      <Manifesto />
      <TopicsBento />
      <ParticipantsMarquee />
      <StatsStrip />
    </>
  );
}
