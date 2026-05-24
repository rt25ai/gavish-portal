import Link from "next/link";
import { RashiLogo } from "@/components/brand/rashi-logo";
import { CouncilLogo } from "@/components/brand/council-logo";
import { CrystalMark } from "@/components/brand/crystal-mark";

export function SiteFooter() {
  return (
    <footer className="bg-navy-900 text-paper relative overflow-hidden">
      <div className="absolute inset-0 bg-crystal opacity-50" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <CrystalMark className="size-12" />
              <span className="font-display font-black text-4xl">גביש</span>
            </div>
            <p className="text-paper/70 max-w-md text-lg leading-relaxed">
              קהילת מנהלי הנוער של קרן רש״י.<br />
              מקצוע, מחקר, השפעה.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display font-bold text-paper/50 text-xs uppercase tracking-[0.2em] mb-4">ניווט</h3>
            <ul className="space-y-3 font-body">
              <li><Link href="/about" className="hover:text-leaf-300 transition">אודות גביש</Link></li>
              <li><Link href="/topics" className="hover:text-leaf-300 transition">תחומי המחקר</Link></li>
              <li><Link href="/community" className="hover:text-leaf-300 transition">חברי הקהילה</Link></li>
              <li><Link href="/data" className="hover:text-leaf-300 transition">נתוני נוער בישראל</Link></li>
              <li><Link href="/community-space" className="hover:text-leaf-300 transition">האזור הקהילתי</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="font-display font-bold text-paper/50 text-xs uppercase tracking-[0.2em] mb-4">בשיתוף</h3>
            <div className="space-y-6">
              <div className="bg-paper/8 backdrop-blur rounded-2xl p-5 hover:bg-paper/12 transition">
                <RashiLogo className="h-12 w-auto" monochrome />
              </div>
              <div className="bg-paper/8 backdrop-blur rounded-2xl p-5 hover:bg-paper/12 transition">
                <CouncilLogo className="h-16 w-auto" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-paper/15 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center text-paper/55 text-sm">
          <p>© {new Date().getFullYear()} קרן רש״י · כל הזכויות שמורות</p>
          <p className="italic text-paper/40">תוכן הדגמה — ייעודכן בהמשך</p>
          <div className="flex gap-5">
            <a href="mailto:gavish@rashi.org.il" className="hover:text-leaf-300 transition">צרו קשר</a>
            <Link href="/.well-known/security.txt" className="hover:text-leaf-300 transition">אבטחה</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
