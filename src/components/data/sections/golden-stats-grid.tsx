import { stats } from "@/data/stats";

function fmt(v: number) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(2).replace(/\.?0+$/, "") + "M";
  if (v >= 1000) return (v / 1000).toFixed(0) + "K";
  return v.toString();
}

export function GoldenStatsGrid() {
  return (
    <section className="bg-paper-mesh-soft pb-16 lg:pb-24 relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-navy-900/10 rounded-3xl overflow-hidden">
          {stats.map((s, i) => (
            <div key={i} className="bg-paper p-8 lg:p-10">
              <p className="font-display font-black text-5xl lg:text-6xl text-navy-900 leading-none mb-4 tabular">
                {s.prefix}{fmt(s.value)}{s.suffix}
              </p>
              <p className="font-body text-base text-ink/80 mb-2">{s.label}</p>
              <p className="font-body text-xs text-ink/45 uppercase tracking-wider">{s.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
