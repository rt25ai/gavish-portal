import Link from "next/link";
import { RashiLogo } from "@/components/brand/rashi-logo";
import { IgudLogo } from "@/components/brand/igud-logo";
import { CrystalMark } from "@/components/brand/crystal-mark";
import { LEGAL_UPDATED_AT_SHORT } from "@/lib/legal-meta";

export function SiteFooter() {
  return (
    <footer className="bg-navy-900 text-paper relative overflow-hidden">
      <div className="absolute inset-0 bg-crystal opacity-50" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <CrystalMark className="size-14" />
              <span className="font-display font-black text-4xl">גביש</span>
            </div>
            <p className="text-paper/70 max-w-md text-lg leading-relaxed">
              קהילה מקצועית לומדת למנהלי מחלקות הנוער ברשויות.<br />
              ביוזמת קרן רש״י ואיגוד מנהלי מחלקות הנוער.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display font-bold text-paper/50 text-xs uppercase tracking-[0.2em] mb-4">ניווט</h3>
            <ul className="space-y-3 font-body">
              <li><Link href="/about" className="hover:text-leaf-300 transition">אודות גביש</Link></li>
              <li><Link href="/topics" className="hover:text-leaf-300 transition">האתגרים המרכזיים</Link></li>
              <li><Link href="/community" className="hover:text-leaf-300 transition">חברי הקהילה</Link></li>
              <li><Link href="/data" className="hover:text-leaf-300 transition">נתוני זהב</Link></li>
              <li><Link href="/join" className="hover:text-leaf-300 transition">הצטרפות לקהילה</Link></li>
              <li><Link href="/community-space" className="hover:text-leaf-300 transition">האזור הקהילתי</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="font-display font-bold text-paper/50 text-xs uppercase tracking-[0.2em] mb-5">בשיתוף</h3>

            {/* Rashi card */}
            <div className="group relative mb-4 overflow-hidden rounded-2xl border border-paper/15 bg-gradient-to-br from-paper/95 via-paper/90 to-leaf-50/90 backdrop-blur-sm transition hover:border-leaf-500/60">
              <div aria-hidden className="absolute -top-12 -left-12 w-32 h-32 bg-leaf-500/25 blur-2xl rounded-full transition-opacity group-hover:opacity-80" />
              <div aria-hidden className="absolute top-0 right-0 w-20 h-20 bg-leaf-500/10 [clip-path:polygon(100%_0,100%_100%,0_0)]" />
              <div aria-hidden className="absolute bottom-2 right-2 size-2 rounded-full bg-leaf-500/50 [animation:pulse_3s_ease-in-out_infinite]" />
              <div className="relative p-6 flex items-center justify-center min-h-[120px]">
                <RashiLogo className="h-16 w-auto relative z-10 transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-paper/0 to-paper/0 group-hover:from-leaf-500/5 transition-all duration-500 pointer-events-none" />
            </div>

            {/* Igud Manhalei HaNoar card */}
            <div className="group relative overflow-hidden rounded-2xl border border-paper/15 bg-gradient-to-br from-paper/95 via-paper/90 to-leaf-50/90 backdrop-blur-sm transition hover:border-leaf-500/60">
              <div aria-hidden className="absolute -top-12 -right-12 w-32 h-32 bg-leaf-500/20 blur-2xl rounded-full" />
              <div aria-hidden className="absolute inset-y-0 right-0 w-12 bg-stripes-soft opacity-50" />
              <div className="relative p-6 flex items-center justify-center min-h-[140px]">
                <IgudLogo className="h-24 w-auto relative z-10 transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-paper/15 space-y-5 text-paper/55 text-sm">
          <nav aria-label="קישורים משפטיים" className="flex flex-wrap gap-x-6 gap-y-2 items-center">
            <Link href="/terms" className="hover:text-leaf-300 transition">תקנון</Link>
            <span aria-hidden className="text-paper/25">·</span>
            <Link href="/accessibility" className="hover:text-leaf-300 transition">הצהרת נגישות</Link>
            <span aria-hidden className="text-paper/25">·</span>
            <Link href="/privacy" className="hover:text-leaf-300 transition">מדיניות פרטיות</Link>
            <span aria-hidden className="text-paper/25">·</span>
            <span className="text-paper/40">עודכן: {LEGAL_UPDATED_AT_SHORT}</span>
          </nav>
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <p>© {new Date().getFullYear()} קרן רש״י · כל הזכויות שמורות</p>
            <p className="italic text-paper/40">תוכן הדגמה - ייעודכן בהמשך</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
