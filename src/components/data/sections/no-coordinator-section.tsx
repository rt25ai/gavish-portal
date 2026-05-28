import { noCoordinatorQuotes } from "@/data/data-page/quotes";

export function NoCoordinatorSection() {
  const [primary, secondary] = noCoordinatorQuotes;

  return (
    <section className="bg-paper py-20 lg:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <p className="font-body text-xs uppercase tracking-[0.18em] text-navy-700/70 font-semibold mb-3">
          06 · אין גורם מתכלל
        </p>
        <h2 className="font-display font-black text-4xl lg:text-5xl text-navy-900 leading-[0.95] mb-10">
          אין חובה חוקית בישראל<br />
          <span className="outline-text">לחינוך בלתי-פורמלי.</span>
        </h2>
        <blockquote className="border-r-4 border-leaf-500 pr-6 lg:pr-10 mb-10">
          <p className="font-body text-xl lg:text-2xl text-ink/90 leading-relaxed mb-6">
            &ldquo;{primary.text}&rdquo;
          </p>
          <footer className="font-body text-sm text-ink/60 uppercase tracking-wider">
            {primary.attribution}
          </footer>
        </blockquote>
        <blockquote className="border-r-4 border-navy-900/30 pr-6 lg:pr-10">
          <p className="font-body text-lg text-ink/85 leading-relaxed mb-4">
            &ldquo;{secondary.text}&rdquo;
          </p>
          <footer className="font-body text-sm text-ink/60 uppercase tracking-wider">
            {secondary.attribution}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
