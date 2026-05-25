import type { ReactNode } from "react";
import { LEGAL_UPDATED_AT_HE } from "@/lib/legal-meta";

type TocItem = { id: string; label: string };

type LegalShellProps = {
  title: string;
  intro?: string;
  toc: TocItem[];
  children: ReactNode;
};

export function LegalShell({ title, intro, toc, children }: LegalShellProps) {
  return (
    <div className="bg-paper text-ink">
      <header className="relative overflow-hidden bg-gradient-to-b from-leaf-50 via-paper to-paper">
        <div aria-hidden className="absolute inset-0 bg-crystal opacity-30" />
        <div className="relative mx-auto max-w-[1100px] px-6 lg:px-10 pt-16 lg:pt-24 pb-10 lg:pb-14">
          <p className="text-leaf-700 font-display font-bold text-xs uppercase tracking-[0.25em] mb-4">
            מסמכי תקנון ותקינה
          </p>
          <h1 className="font-display font-black text-4xl lg:text-6xl leading-[1.05] text-navy-900">
            {title}
          </h1>
          {intro ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
              {intro}
            </p>
          ) : null}
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-leaf-300/60 bg-paper/80 px-4 py-1.5 text-sm text-ink/70 backdrop-blur">
            <span className="size-1.5 rounded-full bg-leaf-500" />
            עודכן לאחרונה: {LEGAL_UPDATED_AT_HE}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-14">
          <aside className="lg:col-span-1">
            <nav aria-label="תוכן עניינים" className="lg:sticky lg:top-24">
              <details className="lg:hidden mb-6 group" open>
                <summary className="cursor-pointer font-display font-bold text-sm uppercase tracking-[0.15em] text-ink/60 py-2 border-b border-ink/10">
                  תוכן עניינים
                </summary>
                <TocList toc={toc} />
              </details>
              <div className="hidden lg:block">
                <h2 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-ink/50 mb-4">
                  תוכן עניינים
                </h2>
                <TocList toc={toc} />
              </div>
            </nav>
          </aside>

          <article className="legal-prose lg:col-span-3">
            {children}
          </article>
        </div>
      </div>
    </div>
  );
}

function TocList({ toc }: { toc: TocItem[] }) {
  return (
    <ol className="mt-3 space-y-2 text-sm font-body">
      {toc.map((item, i) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="block text-ink/70 hover:text-leaf-700 transition py-1"
          >
            <span className="inline-block w-6 text-ink/40 tabular-nums">
              {i + 1}.
            </span>
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );
}
