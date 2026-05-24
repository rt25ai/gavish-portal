"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { topics } from "@/lib/content";
import { cn } from "@/lib/cn";

const colorMap = {
  amber: "bg-topic-amber text-navy-900",
  coral: "bg-topic-coral text-paper",
  teal: "bg-topic-teal text-paper",
  moss: "bg-topic-moss text-paper",
} as const;

const layouts = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7 lg:row-span-2",
];

export function TopicsBento() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-end justify-between mb-16 gap-8 flex-wrap">
          <div className="max-w-2xl">
            <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
              ארבעה תחומים · ארבע פרספקטיבות
            </p>
            <h2 className="font-display text-display font-black text-navy-900 leading-[0.95]">
              ארבעת התחומים<br />
              <span className="outline-text">שחקרנו לעומק.</span>
            </h2>
          </div>
          <Link
            href="/topics"
            className="group inline-flex items-center gap-3 px-6 py-3 border-2 border-navy-900 hover:bg-navy-900 hover:text-paper rounded-full font-display font-bold transition"
          >
            כל התחומים
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-4 lg:gap-6 lg:h-[680px]">
          {topics.map((t, i) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              className={cn(
                "group relative overflow-hidden rounded-3xl p-8 lg:p-10 flex flex-col justify-between min-h-[280px] transition-all duration-500 hover:scale-[1.01]",
                colorMap[t.color],
                layouts[i],
              )}
            >
              <div className="relative z-10 flex items-start justify-between">
                <span className="font-display font-black text-2xl opacity-50">/{t.number}</span>
                <span className="text-xs uppercase tracking-[0.2em] opacity-60 font-semibold">
                  תחום מחקר
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="font-display text-4xl lg:text-6xl font-black leading-[0.95] mb-3">
                  {t.title}
                </h3>
                <p className="font-body text-base lg:text-lg max-w-md opacity-85 mb-6">
                  {t.tagline}
                </p>
                <div className="inline-flex items-center gap-2 font-display font-bold text-sm group-hover:gap-4 transition-all">
                  <span>גלו עוד</span>
                  <ArrowLeft className="size-4" />
                </div>
              </div>

              {/* facet decor */}
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-paper/15 rounded-full blur-3xl pointer-events-none group-hover:bg-paper/25 transition" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-paper/8 [clip-path:polygon(100%_0,100%_100%,0_0)]" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
