import Link from "next/link";
import { CrystalMark } from "@/components/brand/crystal-mark";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <aside className="relative bg-navy-900 text-paper p-10 lg:p-16 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-crystal opacity-60 pointer-events-none" />
        <Link href="/" className="relative flex items-center gap-3 group w-fit">
          <CrystalMark className="size-12 transition-transform duration-500 group-hover:rotate-180" />
          <span className="font-display font-black text-3xl">גביש</span>
        </Link>

        <div className="relative">
          <p className="font-body text-xs tracking-[0.18em] uppercase text-leaf-300/80 font-semibold mb-4">
            קהילה מקצועית · מחזור א׳
          </p>
          <h2 className="font-display font-black text-display leading-[0.92] mb-8">
            כל המשתתפים של גביש.<br />
            <span className="outline-text">במקום אחד.</span>
          </h2>
          <p className="font-body text-lg text-paper/80 max-w-md leading-relaxed">
            פיד מקצועי, ספריית מחקרים, מפגשי המשך, ופלטפורמה לשיתופי פעולה אזוריים - כל מה שצריך כדי שהקבוצה תיהפך לקהילה.
          </p>
        </div>

        <div className="relative font-body text-sm text-paper/55">
          © {new Date().getFullYear()} קרן רש״י · מועצת ארגוני הילדים והנוער
        </div>
      </aside>
      <main className="bg-paper p-10 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
