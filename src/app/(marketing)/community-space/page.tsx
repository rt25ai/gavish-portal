import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Calendar, MessageCircle, FolderOpen, Users, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "האזור הקהילתי",
  description: "המרחב הסגור של חברי הקהילה — feed, לוח אירועים, ספריית קבצים והודעות פנים-קהילתיות.",
};

const featureCards = [
  { icon: MessageCircle, title: "פיד מקצועי", body: "שאלות, תובנות, שיתופים בין חברי הקהילה." },
  { icon: Calendar, title: "לוח אירועים", body: "מפגשי המשך, סדנאות, וכנסים מקצועיים." },
  { icon: FolderOpen, title: "ספריית קבצים", body: "מסמכי המחקר, מצגות, וכלים שימושיים." },
  { icon: Users, title: "פרופילים מקצועיים", body: "התחברו עם עמיתים, מצאו מנטור או מנטית." },
];

export default function CommunitySpacePage() {
  return (
    <>
      <section className="relative bg-paper pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/3 w-[40vmin] h-[40vmin] bg-topic-amber/15 blur-3xl rounded-full" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10 text-center">
          <div className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 bg-navy-900 text-paper rounded-full font-body text-sm font-semibold">
            <Lock className="size-4" />
            אזור סגור · רק לחברי הקהילה
          </div>
          <h1 className="font-display font-black text-jumbo text-navy-900 leading-[0.88]">
            האזור<br />
            <span className="outline-text">הקהילתי.</span>
          </h1>
          <p className="mt-10 font-body text-xl text-ink/80 max-w-2xl mx-auto leading-relaxed">
            מרחב מקצועי פנים-קהילתי, מאובטח, לבוגרות ולבוגרי גביש. כאן תוכלו לשמור על קשר, לחלוק תובנות ולהמשיך לצמוח ביחד.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/sign-up" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-navy-900 text-paper rounded-full font-display font-bold text-lg hover:bg-navy-700 transition">
              הצטרפו לקהילה
              <ArrowLeft className="size-5" />
            </Link>
            <Link href="/auth/sign-in" className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-navy-900/20 hover:border-navy-900 rounded-full font-display font-bold text-lg transition">
              כניסה לחשבון קיים
            </Link>
          </div>
        </div>
      </section>

      {/* Preview features — blurred */}
      <section className="bg-cream py-20 lg:py-28 relative">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4 text-center">
            הצצה למה שמחכה לכם
          </p>
          <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-16 text-center">
            ארבעה מרחבים.<br />
            <span className="outline-text">קהילה אחת.</span>
          </h2>

          {/* Blurred feature cards */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {featureCards.map((f, i) => {
                const Icon = f.icon;
                return (
                  <article key={i} className="bg-paper rounded-3xl p-8 border border-navy-900/8 relative overflow-hidden">
                    <div className="size-14 rounded-2xl bg-leaf-500/15 grid place-items-center text-leaf-700 mb-6">
                      <Icon className="size-7" />
                    </div>
                    <h3 className="font-display font-black text-2xl text-navy-900 mb-3">{f.title}</h3>
                    <p className="font-body text-base text-ink/70 leading-relaxed">{f.body}</p>
                    <div className="absolute inset-0 bg-paper/40 backdrop-blur-[3px] pointer-events-none" />
                  </article>
                );
              })}
            </div>

            {/* Lock overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-navy-900 text-paper rounded-full p-6 shadow-[0_20px_60px_-20px_rgba(15,30,71,0.55)]">
                <Lock className="size-10" />
              </div>
            </div>
          </div>

          <p className="mt-12 text-center font-body text-base text-ink/55 max-w-xl mx-auto">
            הגישה לאזור הקהילתי תיפתח לחברי המחזור הראשון בסיום התוכנית. אם אתם מאושרים — תקבלו מייל עם קישור להצטרפות.
          </p>
        </div>
      </section>
    </>
  );
}
