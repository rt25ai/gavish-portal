export function DataHero() {
  return (
    <section className="bg-paper-mesh pt-32 pb-16 lg:pt-44 lg:pb-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-1/4 w-[40vmin] h-[40vmin] bg-leaf-500/15 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 left-1/4 w-[40vmin] h-[40vmin] bg-leaf-700/12 blur-3xl rounded-full" />
        <div aria-hidden className="hidden lg:block absolute top-10 left-10 w-32 h-44 bg-stripes-soft opacity-80 [mask-image:linear-gradient(135deg,black,transparent_70%)]" />
      </div>
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-6">
          נתוני זהב · חינוך בלתי-פורמלי בישראל
        </p>
        <h1 className="font-display font-black text-jumbo text-navy-900 leading-[0.88]">
          נתונים,<br />
          <span className="outline-text">במספרים.</span>
        </h1>
        <p className="mt-10 font-body text-xl text-ink/80 max-w-3xl leading-relaxed">
          הנתונים הם נקודת ההתחלה של כל שיחה מקצועית. כל המספרים כאן מקורם בלמ״ס, OECD, מינהל חברה ונוער, מרכז המחקר והמידע של הכנסת, מכון ברוקדייל, ומכון דיאלוג. הנתונים מתעדכנים בכל רבעון.
        </p>
      </div>
    </section>
  );
}
