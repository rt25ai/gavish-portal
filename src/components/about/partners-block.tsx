import { RashiLogo } from "@/components/brand/rashi-logo";
import { IgudLogo } from "@/components/brand/igud-logo";

export function PartnersBlock() {
  return (
    <section className="bg-navy-900 text-paper py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-crystal opacity-60" />
      {/* Ambient glows */}
      <div aria-hidden className="absolute -top-32 right-1/4 w-[40vmin] h-[40vmin] bg-leaf-500/15 blur-3xl rounded-full pointer-events-none" />
      <div aria-hidden className="absolute -bottom-32 left-1/4 w-[50vmin] h-[50vmin] bg-topic-amber/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-leaf-300/80 font-semibold mb-4">
          השותפים מאחורי גביש
        </p>
        <h2 className="font-display text-display font-black leading-[0.95] mb-16">
          שני גופים,<br />
          <span className="outline-text">חזון אחד.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* === Rashi Foundation === */}
          <article className="group relative overflow-hidden rounded-3xl border border-paper/15 bg-gradient-to-br from-paper via-paper to-leaf-50 transition-all duration-700 hover:border-leaf-500/60">
            {/* Decorative facets */}
            <div aria-hidden className="absolute top-0 right-0 w-40 h-40 bg-leaf-500/15 [clip-path:polygon(100%_0,100%_100%,0_0)] transition-opacity group-hover:opacity-80" />
            <div aria-hidden className="absolute -top-24 -left-24 w-72 h-72 bg-leaf-500/20 blur-3xl rounded-full" />
            <div aria-hidden className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-leaf-500 via-leaf-300 to-leaf-500" />

            {/* Hover shimmer */}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-transparent via-leaf-500/0 to-leaf-500/0 group-hover:via-leaf-500/8 group-hover:to-leaf-500/0 transition-all duration-1000 pointer-events-none" />

            <div className="relative p-10 lg:p-14">
              <div className="flex items-center gap-3 mb-10 font-body text-xs uppercase tracking-[0.18em] text-leaf-700 font-bold">
                <span className="size-2 rounded-full bg-leaf-500 [animation:pulse_2s_ease-in-out_infinite]" />
                <span>שותף מייסד</span>
              </div>

              <div className="h-28 mb-10 flex items-center transition-transform duration-700 group-hover:scale-[1.03] origin-right">
                <RashiLogo className="h-28 w-auto" />
              </div>

              <h3 className="font-display font-black text-4xl text-navy-900 mb-5">קרן רש״י</h3>
              <p className="font-body text-lg text-ink/85 leading-relaxed">
                קרן פילנתרופית-חברתית הפועלת מאז 1984 לצמצום פערים ויצירת הזדמנויות שוויוניות לילדים ובני נוער בישראל. במוקד פעילותה: השכלה, רווחה, בריאות, ופיתוח קהילה ומנהיגות.
              </p>

              <div className="mt-10 pt-8 border-t border-navy-900/10 flex items-center justify-between font-body text-sm">
                <span className="text-navy-700/70">פעילה מאז</span>
                <span className="font-display font-black text-3xl text-leaf-700 tabular">1984</span>
              </div>
            </div>
          </article>

          {/* === Igud Manhalei HaNoar === */}
          <article className="group relative overflow-hidden rounded-3xl border border-paper/15 bg-gradient-to-br from-paper via-paper to-leaf-50 transition-all duration-700 hover:border-leaf-500/60">
            <div aria-hidden className="absolute -top-20 -right-12 w-60 h-60 bg-leaf-500/18 blur-3xl rounded-full" />
            <div aria-hidden className="absolute -bottom-16 -left-12 w-60 h-60 bg-leaf-700/15 blur-3xl rounded-full" />
            <div aria-hidden className="absolute top-0 right-0 w-40 h-40 bg-leaf-500/12 [clip-path:polygon(100%_0,100%_100%,0_0)]" />
            {/* signature stripes - the brand pattern */}
            <div aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-stripes-soft opacity-60 [mask-image:linear-gradient(90deg,black,transparent)]" />

            <div aria-hidden className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-leaf-700 via-leaf-500 to-leaf-700" />

            <div className="relative p-10 lg:p-14">
              <div className="flex items-center gap-3 mb-10 font-body text-xs uppercase tracking-[0.18em] text-leaf-700 font-bold">
                <span className="size-2 rounded-full bg-leaf-500 [animation:pulse_2s_ease-in-out_infinite]" />
                <span>שותף מקצועי</span>
              </div>

              <div className="h-28 mb-10 flex items-center transition-transform duration-700 group-hover:scale-[1.03] origin-right">
                <IgudLogo className="h-28 w-auto" />
              </div>

              <h3 className="font-display font-black text-4xl text-navy-900 mb-5">איגוד מנהלי מחלקות הנוער</h3>
              <p className="font-body text-lg text-ink/85 leading-relaxed">
                ארגון הגג של מנהלות ומנהלי מחלקות הנוער ברשויות המקומיות בישראל. הקול המקצועי של המנהלים, ומסגרת התומכת בהתפתחות הקהילה המקצועית, פיתוח מדיניות וחילופי ידע בין רשויות.
              </p>

              <div className="mt-10 pt-8 border-t border-navy-900/10 flex items-center justify-between font-body text-sm">
                <span className="text-navy-700/70">רשויות מקומיות</span>
                <span className="font-display font-black text-3xl text-leaf-700 tabular">257</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
