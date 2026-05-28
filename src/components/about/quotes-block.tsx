import { quotes } from "@/data/about";

export function QuotesBlock() {
  return (
    <section className="bg-paper-mesh-soft py-24 lg:py-36 relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
          קולות מהשטח
        </p>
        <h2 className="font-display text-display font-black text-navy-900 leading-[0.95] mb-16">
          מה אומרים<br /><span className="outline-text">המשתתפים.</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {quotes.map((q, i) => (
            <figure key={i} className="bg-cream rounded-3xl p-8 lg:p-10 relative">
              <span className="absolute -top-4 right-8 font-display font-black text-7xl text-leaf-500 leading-none">״</span>
              <blockquote className="font-display font-bold text-2xl lg:text-3xl text-navy-900 leading-tight mb-6">
                {q.text}
              </blockquote>
              <figcaption>
                <p className="font-display font-bold text-base text-ink">{q.author}</p>
                <p className="font-body text-sm text-ink/55">{q.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
