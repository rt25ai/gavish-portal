"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, ArrowLeft, Check } from "lucide-react";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const isSignUp = mode === "sign-up";

  return (
    <div>
      <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
        {isSignUp ? "הצטרפות לקהילה" : "כניסה לחשבון"}
      </p>
      <h1 className="font-display font-black text-display text-navy-900 leading-[0.95] mb-4">
        {isSignUp ? "ברוכים הבאים." : "נעים לראות שוב."}
      </h1>
      <p className="font-body text-lg text-ink/70 mb-10">
        {isSignUp
          ? "האזור הקהילתי פתוח רק לחברי מחזור גביש. נשלח אליכם קישור בדואר."
          : "נשלח אליכם קישור כניסה למייל. ללא סיסמה, ללא הרשמה - רק שלום ומכאן הביתה."}
      </p>

      {sent ? (
        <div className="bg-leaf-500/10 border border-leaf-500/40 rounded-2xl p-6 flex items-start gap-4">
          <div className="size-10 rounded-full bg-leaf-500 text-paper grid place-items-center shrink-0">
            <Check className="size-5" />
          </div>
          <div>
            <p className="font-display font-bold text-lg text-navy-900 mb-1">בדקו את המייל</p>
            <p className="font-body text-sm text-ink/70 leading-relaxed">
              שלחנו לכם קישור כניסה. הוא תקף ל-15 דקות.<br />
              <span className="text-ink/50 italic">(זוהי הדגמה - האזור האישי עוד לא פעיל.)</span>
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          {isSignUp && (
            <div>
              <label className="block font-body text-sm font-semibold text-navy-900 mb-2">שם מלא</label>
              <input
                type="text"
                required
                placeholder="שם פרטי ושם משפחה"
                className="w-full px-5 py-4 rounded-2xl bg-cream border border-transparent focus:border-navy-900 focus:bg-paper outline-none font-body text-base transition placeholder:text-ink/40"
              />
            </div>
          )}
          <div>
            <label className="block font-body text-sm font-semibold text-navy-900 mb-2">דוא״ל</label>
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-ink/40" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full pr-12 pl-5 py-4 rounded-2xl bg-cream border border-transparent focus:border-navy-900 focus:bg-paper outline-none font-body text-base transition placeholder:text-ink/40"
              />
            </div>
          </div>
          {isSignUp && (
            <div>
              <label className="block font-body text-sm font-semibold text-navy-900 mb-2">רשות / עיר</label>
              <input
                type="text"
                required
                placeholder="לדוגמה: עיריית חיפה"
                className="w-full px-5 py-4 rounded-2xl bg-cream border border-transparent focus:border-navy-900 focus:bg-paper outline-none font-body text-base transition placeholder:text-ink/40"
              />
            </div>
          )}

          <button
            type="submit"
            className="group w-full inline-flex items-center justify-between gap-4 px-7 py-4 bg-navy-900 text-paper rounded-full font-display font-bold text-lg hover:bg-navy-700 transition"
          >
            <span>{isSignUp ? "שלחו לי קישור הצטרפות" : "שלחו לי קישור כניסה"}</span>
            <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
          </button>
        </form>
      )}

      <div className="mt-10 pt-8 border-t border-navy-900/10">
        {isSignUp ? (
          <p className="font-body text-base text-ink/70">
            כבר חברים בקהילה?{" "}
            <Link href="/auth/sign-in" className="font-bold text-navy-900 hover:text-leaf-700 underline underline-offset-4">
              כניסה לחשבון
            </Link>
          </p>
        ) : (
          <p className="font-body text-base text-ink/70">
            עוד לא הצטרפתם?{" "}
            <Link href="/auth/sign-up" className="font-bold text-navy-900 hover:text-leaf-700 underline underline-offset-4">
              הצטרפו לקהילה
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
