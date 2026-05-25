"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Accessibility,
  AlertCircle,
  Contrast,
  Droplet,
  ExternalLink,
  Eye,
  FileText,
  Heading,
  Highlighter,
  Keyboard,
  Link as LinkIcon,
  Minus,
  MousePointer,
  MousePointer2,
  Pause,
  Plus,
  RotateCcw,
  Sun,
  Type,
  X,
} from "lucide-react";

type ToggleKey =
  | "readableFont"
  | "highlightLinks"
  | "highlightHeadings"
  | "highContrast"
  | "blackYellow"
  | "invert"
  | "sepia"
  | "monochrome"
  | "bigCursor"
  | "blackCursor"
  | "pauseAnimations"
  | "keyboardNav";

type A11yState = {
  fontSize: number;
} & Record<ToggleKey, boolean>;

const DEFAULT_STATE: A11yState = {
  fontSize: 0,
  readableFont: false,
  highlightLinks: false,
  highlightHeadings: false,
  highContrast: false,
  blackYellow: false,
  invert: false,
  sepia: false,
  monochrome: false,
  bigCursor: false,
  blackCursor: false,
  pauseAnimations: false,
  keyboardNav: false,
};

const CLASS_MAP: Record<ToggleKey, string> = {
  readableFont: "a11y-readable-font",
  highlightLinks: "a11y-highlight-links",
  highlightHeadings: "a11y-highlight-headings",
  highContrast: "a11y-high-contrast",
  blackYellow: "a11y-black-yellow",
  invert: "a11y-invert",
  sepia: "a11y-sepia",
  monochrome: "a11y-monochrome",
  bigCursor: "a11y-big-cursor",
  blackCursor: "a11y-black-cursor",
  pauseAnimations: "a11y-pause-animations",
  keyboardNav: "a11y-keyboard-nav",
};

const STORAGE_KEY = "gavish-a11y-state";

const MIN_FONT = -3;
const MAX_FONT = 5;

const COORDINATOR_EMAIL = "accessibility@rashi.org.il";

type ToggleItem = {
  key: ToggleKey;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const TEXT_ITEMS: ToggleItem[] = [
  { key: "readableFont", label: "גופן קריא", Icon: Type },
  { key: "highlightLinks", label: "הדגשת קישורים", Icon: LinkIcon },
  { key: "highlightHeadings", label: "הדגשת כותרות", Icon: Heading },
];

const COLOR_ITEMS: ToggleItem[] = [
  { key: "highContrast", label: "ניגודיות גבוהה", Icon: Contrast },
  { key: "blackYellow", label: "שחור צהוב", Icon: Highlighter },
  { key: "invert", label: "היפוך צבעים", Icon: Eye },
  { key: "sepia", label: "ספיה", Icon: Sun },
  { key: "monochrome", label: "מונוכרום", Icon: Droplet },
];

const MOTION_ITEMS: ToggleItem[] = [
  { key: "bigCursor", label: "סמן גדול", Icon: MousePointer },
  { key: "blackCursor", label: "סמן שחור", Icon: MousePointer2 },
  { key: "pauseAnimations", label: "ביטול הבהובים", Icon: Pause },
  { key: "keyboardNav", label: "ניווט מקלדת", Icon: Keyboard },
];

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<A11yState>;
        setState({ ...DEFAULT_STATE, ...parsed });
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    (Object.keys(CLASS_MAP) as ToggleKey[]).forEach((key) => {
      html.classList.toggle(CLASS_MAP[key], state[key]);
    });
    html.style.setProperty("--a11y-font-scale", String(1 + state.fontSize * 0.1));
    html.classList.toggle("a11y-font-scaled", state.fontSize !== 0);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, mounted]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const toggle = useCallback((key: ToggleKey) => {
    setState((s) => {
      const next = { ...s, [key]: !s[key] };
      if (key === "blackYellow" && next.blackYellow) {
        next.highContrast = false;
        next.invert = false;
        next.sepia = false;
        next.monochrome = false;
      }
      if (key === "highContrast" && next.highContrast) {
        next.blackYellow = false;
        next.invert = false;
        next.sepia = false;
        next.monochrome = false;
      }
      if (key === "invert" && next.invert) {
        next.highContrast = false;
        next.blackYellow = false;
        next.sepia = false;
        next.monochrome = false;
      }
      if (key === "sepia" && next.sepia) {
        next.highContrast = false;
        next.blackYellow = false;
        next.invert = false;
        next.monochrome = false;
      }
      if (key === "monochrome" && next.monochrome) {
        next.highContrast = false;
        next.blackYellow = false;
        next.invert = false;
        next.sepia = false;
      }
      if (key === "bigCursor" && next.bigCursor) next.blackCursor = false;
      if (key === "blackCursor" && next.blackCursor) next.bigCursor = false;
      return next;
    });
  }, []);

  const adjustFont = useCallback((delta: number) => {
    setState((s) => ({
      ...s,
      fontSize: Math.max(MIN_FONT, Math.min(MAX_FONT, s.fontSize + delta)),
    }));
  }, []);

  const reset = useCallback(() => setState(DEFAULT_STATE), []);

  const anyActive =
    state.fontSize !== 0 ||
    (Object.keys(CLASS_MAP) as ToggleKey[]).some((k) => state[k]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="פתיחת תפריט נגישות"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="a11y-trigger fixed bottom-5 left-5 z-[100] grid size-10 place-items-center rounded-full bg-navy-900 text-paper shadow-md shadow-navy-900/25 ring-1 ring-paper/80 transition hover:scale-105 hover:bg-navy-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf-500"
      >
        <Accessibility className="size-5" />
        {anyActive ? (
          <span
            aria-hidden
            className="absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-paper bg-topic-amber"
          />
        ) : null}
      </button>

      {open ? (
        <div
          className="a11y-overlay fixed inset-0 z-[200] flex items-stretch justify-start"
          dir="rtl"
        >
          <button
            type="button"
            aria-label="סגירת תפריט נגישות"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="תפריט הנגשת אתר"
            className="relative mr-auto h-full w-full max-w-md overflow-y-auto bg-paper text-ink shadow-2xl"
          >
            <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-ink/10 bg-paper px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-leaf-500/15 text-leaf-700">
                  <Accessibility className="size-5" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold text-navy-900">
                    תפריט נגישות
                  </h2>
                  <p className="text-xs text-ink/60">פורטל גביש - קרן רש״י</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="סגירה (Esc)"
                className="grid size-10 place-items-center rounded-full bg-ink/5 text-ink/70 transition hover:bg-ink/10 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-leaf-500"
              >
                <X className="size-5" />
              </button>
            </header>

            <div className="space-y-7 px-5 py-6">
              <FontControls
                value={state.fontSize}
                onIncrease={() => adjustFont(1)}
                onDecrease={() => adjustFont(-1)}
              />

              <ToggleGroup
                title="טקסט וקריאות"
                items={TEXT_ITEMS}
                state={state}
                onToggle={toggle}
              />

              <ToggleGroup
                title="צבע וניגודיות"
                items={COLOR_ITEMS}
                state={state}
                onToggle={toggle}
                note="פעולה אחת בקבוצה זו בלבד בכל פעם."
              />

              <ToggleGroup
                title="סמן ותנועה"
                items={MOTION_ITEMS}
                state={state}
                onToggle={toggle}
              />

              <div className="space-y-2 border-t border-ink/10 pt-5">
                <button
                  type="button"
                  onClick={reset}
                  disabled={!anyActive}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm font-medium text-ink transition hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RotateCcw className="size-4" />
                  איפוס כל ההגדרות
                </button>

                <a
                  href="/accessibility"
                  className="flex w-full items-center justify-between gap-2 rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm font-medium text-ink transition hover:bg-ink/5"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="size-4" />
                    הצהרת הנגישות המלאה
                  </span>
                  <ExternalLink className="size-4 text-ink/40" />
                </a>

                <a
                  href={`mailto:${COORDINATOR_EMAIL}?subject=${encodeURIComponent(
                    "דיווח על בעיית נגישות - פורטל גביש"
                  )}`}
                  className="flex w-full items-center justify-between gap-2 rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm font-medium text-ink transition hover:bg-ink/5"
                >
                  <span className="flex items-center gap-2">
                    <AlertCircle className="size-4" />
                    דיווח על בעיית נגישות
                  </span>
                  <ExternalLink className="size-4 text-ink/40" />
                </a>
              </div>

              <p className="text-center text-[11px] leading-relaxed text-ink/45">
                רכזת נגישות: מיה אפשטיין · 08-9146603
                <br />
                מענה לפניות תוך 45 ימי עסקים.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function FontControls({
  value,
  onIncrease,
  onDecrease,
}: {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  const percent = Math.round((1 + value * 0.1) * 100);
  return (
    <section>
      <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-ink/55">
        גודל גופן
      </h3>
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-ink/10 bg-cream px-3 py-3">
        <button
          type="button"
          onClick={onDecrease}
          disabled={value <= MIN_FONT}
          aria-label="הקטנת גופן"
          className="grid size-11 place-items-center rounded-full bg-paper text-ink transition hover:bg-leaf-50 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-leaf-500"
        >
          <Minus className="size-4" />
        </button>
        <div className="flex-1 text-center">
          <div className="font-display text-2xl font-bold text-navy-900 tabular">
            {percent}%
          </div>
          <div className="text-[11px] text-ink/55">
            {value === 0 ? "ברירת מחדל" : value > 0 ? `הוגדל ב-${value}` : `הוקטן ב-${-value}`}
          </div>
        </div>
        <button
          type="button"
          onClick={onIncrease}
          disabled={value >= MAX_FONT}
          aria-label="הגדלת גופן"
          className="grid size-11 place-items-center rounded-full bg-paper text-ink transition hover:bg-leaf-50 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-leaf-500"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </section>
  );
}

function ToggleGroup({
  title,
  items,
  state,
  onToggle,
  note,
}: {
  title: string;
  items: ToggleItem[];
  state: A11yState;
  onToggle: (key: ToggleKey) => void;
  note?: string;
}) {
  return (
    <section>
      <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-ink/55">
        {title}
      </h3>
      {note ? <p className="mb-3 text-[11px] text-ink/50">{note}</p> : null}
      <div className="grid grid-cols-3 gap-2">
        {items.map(({ key, label, Icon }) => {
          const active = state[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => onToggle(key)}
              aria-pressed={active}
              className={
                "flex flex-col items-center gap-2 rounded-2xl border px-2 py-3 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-leaf-500 " +
                (active
                  ? "border-leaf-500 bg-leaf-500/15 text-navy-900 shadow-sm"
                  : "border-ink/10 bg-paper text-ink/80 hover:border-ink/25 hover:bg-ink/5")
              }
            >
              <span
                className={
                  "grid size-9 place-items-center rounded-full transition " +
                  (active ? "bg-leaf-500 text-paper" : "bg-ink/5 text-ink/70")
                }
              >
                <Icon className="size-4" />
              </span>
              <span className="text-[12px] font-medium leading-tight">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
