/**
 * Light line illustrations - one per central challenge.
 * Thin stroke (1.6), currentColor so each card tints it with its accent.
 * Kept airy and minimal to match the brand's pastel, calm atmosphere.
 */
import type { TopicSlug } from "@/lib/content";

type Props = { className?: string };

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// 01 · עבודה מבוססת נתונים - bars + trend line
function DataDriven({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="עבודה מבוססת נתונים">
      <g {...common}>
        <line x1="10" y1="52" x2="54" y2="52" />
        <rect x="14" y="38" width="7" height="14" rx="1.5" />
        <rect x="26" y="30" width="7" height="22" rx="1.5" />
        <rect x="38" y="22" width="7" height="30" rx="1.5" />
        <polyline points="14,28 26,22 38,15 50,10" strokeDasharray="0.1 4" opacity="0.85" />
        <circle cx="14" cy="28" r="2" fill="currentColor" stroke="none" />
        <circle cx="26" cy="22" r="2" fill="currentColor" stroke="none" />
        <circle cx="38" cy="15" r="2" fill="currentColor" stroke="none" />
        <circle cx="50" cy="10" r="2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

// 02 · הון אנושי - a small connected team
function HumanCapital({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="הון אנושי">
      <g {...common}>
        <circle cx="32" cy="18" r="6" />
        <path d="M22 40c0-5.5 4.5-10 10-10s10 4.5 10 10" />
        <circle cx="14" cy="28" r="4.5" />
        <path d="M7 46c0-4 3-7.5 7-7.5" />
        <circle cx="50" cy="28" r="4.5" />
        <path d="M57 46c0-4-3-7.5-7-7.5" />
        <line x1="20" y1="22" x2="26" y2="20" opacity="0.6" />
        <line x1="44" y1="22" x2="38" y2="20" opacity="0.6" />
      </g>
    </svg>
  );
}

// 03 · עיצוב מדיניות בחינוך בלתי פורמלי - document + structure
function InformalPolicy({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="עיצוב מדיניות">
      <g {...common}>
        <path d="M18 10h20l8 8v36H18z" />
        <path d="M38 10v8h8" />
        <line x1="24" y1="28" x2="40" y2="28" />
        <line x1="24" y1="35" x2="40" y2="35" />
        <line x1="24" y1="42" x2="34" y2="42" />
        <circle cx="44" cy="44" r="8" fill="var(--card-surface, #fff)" />
        <polyline points="40.5,44 43,46.5 48,41" />
      </g>
    </svg>
  );
}

// 04 · השתתפות נוער - figures gathering around a center (raised hand)
function YouthParticipation({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="השתתפות נוער">
      <g {...common}>
        <circle cx="32" cy="34" r="14" opacity="0.5" strokeDasharray="2 4" />
        <circle cx="32" cy="14" r="4" />
        <path d="M28 26c0-2.2 1.8-4 4-4s4 1.8 4 4" />
        <circle cx="15" cy="24" r="3.5" />
        <path d="M11.5 34c0-2 1.6-3.5 3.5-3.5" />
        <circle cx="49" cy="24" r="3.5" />
        <path d="M52.5 34c0-2-1.6-3.5-3.5-3.5" />
        <circle cx="20" cy="48" r="3.5" />
        <circle cx="44" cy="48" r="3.5" />
        <path d="M30 52v-9m0 0l-3 3m3-3l3 3" />
      </g>
    </svg>
  );
}

const map: Record<TopicSlug, (p: Props) => React.ReactElement> = {
  "data-driven": DataDriven,
  "human-capital": HumanCapital,
  "informal-policy": InformalPolicy,
  "youth-participation": YouthParticipation,
};

export function TopicIllustration({ slug, className }: { slug: TopicSlug; className?: string }) {
  const Cmp = map[slug];
  return <Cmp className={className} />;
}
