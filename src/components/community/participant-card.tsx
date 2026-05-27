import { topics, topicColorClasses, type Participant } from "@/lib/content";
import { cn } from "@/lib/cn";

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("");
}

export function ParticipantCard({ p, size = "md" }: { p: Participant; size?: "sm" | "md" | "lg" }) {
  const topic = topics.find((t) => t.slug === p.topic);
  const color = topic ? topicColorClasses[topic.color] : null;
  const hasCity = p.city && p.city !== "—";
  const hasQuote = !!p.quote;

  return (
    <article
      className={cn(
        "group relative bg-navy-900 rounded-3xl overflow-hidden text-paper transition-all duration-500 hover:-translate-y-1",
        size === "sm" && "aspect-[3/4]",
        size === "md" && "aspect-[4/5]",
        size === "lg" && "aspect-[3/4]",
      )}
    >
      <div className="absolute inset-0 bg-crystal" />
      {/* Signature stripes pattern - the brand element */}
      <div aria-hidden className="absolute inset-0 bg-stripes-soft opacity-40 mix-blend-screen" />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 grid place-items-center font-display font-black opacity-30 transition-opacity duration-500 group-hover:opacity-50",
          size === "sm" ? "text-9xl" : "text-[10rem]",
        )}
      >
        {initials(p.name)}
      </div>

      {topic && (
        <div className="absolute top-5 right-5 flex items-center gap-2">
          <span className={cn("size-2.5 rounded-full", color?.bg)} aria-hidden />
          <span className="font-body text-[10px] uppercase tracking-[0.15em] text-paper/70 font-semibold">
            {topic.title}
          </span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-950 via-navy-900/70 to-transparent" />

      <div className="relative h-full flex flex-col justify-end p-6 lg:p-7">
        <p className="font-body text-xs uppercase tracking-[0.18em] text-paper/60 mb-2">{p.role}</p>
        <h3 className="font-display font-black text-2xl lg:text-3xl leading-tight mb-1">{p.name}</h3>
        {hasCity && <p className="font-body text-sm text-paper/70 mb-4">{p.city}</p>}
        {hasQuote && (
          <p className={cn("font-body text-sm text-paper/80 leading-snug border-r-2 pr-3 mt-3", color?.border ?? "border-leaf-500")}>
            {p.quote}
          </p>
        )}
        {!hasQuote && !hasCity && (
          <p className="font-body text-xs text-paper/40 mt-3">פרטים מלאים יתעדכנו בקרוב</p>
        )}
      </div>
    </article>
  );
}
