import { RashiLogo } from "@/components/brand/rashi-logo";
import { CouncilLogo } from "@/components/brand/council-logo";

export function PartnersBlock() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
          השותפים מאחורי גביש
        </p>
        <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-16">
          שני גופים, חזון אחד.
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          <article className="bg-paper rounded-3xl p-10 lg:p-12 border border-navy-900/8">
            <div className="h-24 mb-8 flex items-center">
              <RashiLogo className="h-24 w-auto" />
            </div>
            <h3 className="font-display font-black text-3xl text-navy-900 mb-4">קרן רש״י</h3>
            <p className="font-body text-lg text-ink/80 leading-relaxed">
              קרן פילנתרופית-חברתית הפועלת מאז 1984 לצמצום פערים ויצירת הזדמנויות שוויוניות לילדים ובני נוער בישראל. במוקד פעילותה: השכלה, רווחה, בריאות, ופיתוח קהילה ומנהיגות.
            </p>
          </article>
          <article className="bg-paper rounded-3xl p-10 lg:p-12 border border-navy-900/8">
            <div className="h-24 mb-8 flex items-center">
              <CouncilLogo className="h-28 w-auto" />
            </div>
            <h3 className="font-display font-black text-3xl text-navy-900 mb-4">מועצת ארגוני הילדים והנוער</h3>
            <p className="font-body text-lg text-ink/80 leading-relaxed">
              גוף הגג של תנועות הנוער וארגוני הילדים הציוניים בישראל. מאגד 14 תנועות ופועל לחיזוק החינוך הבלתי פורמלי, פיתוח מנהיגות צעירה, וקידום מדיניות לטובת ילדים ובני נוער.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
