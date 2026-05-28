import type { TopicColor } from "@/data/types";

/**
 * Tailwind class strings keyed by topic color. Two systems coexist:
 * - `topicColorClasses` -> bold/saturated (used on the topic detail pages)
 * - `topicPastelClasses` -> pastel / calm surface (used on cards/marquees)
 *
 * Both must be full class strings (no string interpolation) so Tailwind
 * picks them up during content scanning.
 */

export const topicColorClasses: Record<
  TopicColor,
  { bg: string; text: string; border: string; soft: string }
> = {
  amber: { bg: "bg-topic-amber", text: "text-topic-amber", border: "border-topic-amber", soft: "bg-topic-amber-soft" },
  coral: { bg: "bg-topic-coral", text: "text-topic-coral", border: "border-topic-coral", soft: "bg-topic-coral-soft" },
  teal:  { bg: "bg-topic-teal",  text: "text-topic-teal",  border: "border-topic-teal",  soft: "bg-topic-teal-soft" },
  moss:  { bg: "bg-topic-moss",  text: "text-topic-moss",  border: "border-topic-moss",  soft: "bg-topic-moss-soft" },
};

export const topicPastelClasses: Record<
  TopicColor,
  { surface: string; ink: string; ring: string; dot: string }
> = {
  teal: {
    surface: "bg-pastel-sky",
    ink: "text-pastel-sky-ink",
    ring: "border-pastel-sky-ring",
    dot: "bg-pastel-sky-ink",
  },
  amber: {
    surface: "bg-pastel-sand",
    ink: "text-pastel-sand-ink",
    ring: "border-pastel-sand-ring",
    dot: "bg-pastel-sand-ink",
  },
  coral: {
    surface: "bg-pastel-blush",
    ink: "text-pastel-blush-ink",
    ring: "border-pastel-blush-ring",
    dot: "bg-pastel-blush-ink",
  },
  moss: {
    surface: "bg-pastel-sage",
    ink: "text-pastel-sage-ink",
    ring: "border-pastel-sage-ring",
    dot: "bg-pastel-sage-ink",
  },
};
