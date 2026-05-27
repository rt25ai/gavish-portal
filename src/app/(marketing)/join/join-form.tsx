"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Mail, MapPin, Phone, User, Check } from "lucide-react";
import { submitJoinRequest, type JoinFormState } from "./actions";

export function JoinForm() {
  const [state, formAction] = useActionState<JoinFormState, FormData>(
    submitJoinRequest,
    null,
  );

  if (state?.success) {
    return (
      <div
        className="lg:col-span-7 bg-cream-mesh rounded-3xl p-8 lg:p-10 border border-navy-900/8 flex items-start gap-4"
        role="status"
      >
        <div className="size-10 rounded-full bg-leaf-500 text-paper grid place-items-center shrink-0">
          <Check className="size-5" />
        </div>
        <div>
          <p className="font-display font-bold text-xl text-navy-900 mb-2">הפרטים נשלחו.</p>
          <p className="font-body text-base text-ink/75 leading-relaxed">{state.success}</p>
        </div>
      </div>
    );
  }

  return (
    <form
      className="lg:col-span-7 bg-cream-mesh rounded-3xl p-8 lg:p-10 border border-navy-900/8 space-y-5"
      aria-label="טופס הרשמה לקהילת גביש"
      action={formAction}
    >
      {/* Honeypot — hidden from humans, bots fill it; submissions with it set are dropped server-side. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, width: 0, overflow: "hidden" }}>
        <label htmlFor="company">אל תמלאו שדה זה</label>
        <input id="company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block font-body text-sm font-semibold text-navy-900 mb-2">
          <span className="inline-flex items-center gap-1.5"><User className="size-4" /> שם מלא</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          placeholder="שם פרטי ומשפחה"
          className="w-full bg-paper rounded-2xl border border-navy-900/10 px-4 py-3 font-body text-navy-900 placeholder:text-ink/35 focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20"
        />
      </div>

      <div>
        <label htmlFor="city" className="block font-body text-sm font-semibold text-navy-900 mb-2">
          <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" /> רשות מקומית</span>
        </label>
        <input
          id="city"
          type="text"
          name="city"
          required
          placeholder="שם הרשות בה אתם פועלים"
          className="w-full bg-paper rounded-2xl border border-navy-900/10 px-4 py-3 font-body text-navy-900 placeholder:text-ink/35 focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block font-body text-sm font-semibold text-navy-900 mb-2">
            <span className="inline-flex items-center gap-1.5"><Phone className="size-4" /> טלפון</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            inputMode="tel"
            required
            placeholder="050-0000000"
            className="w-full bg-paper rounded-2xl border border-navy-900/10 px-4 py-3 font-body text-navy-900 placeholder:text-ink/35 focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-body text-sm font-semibold text-navy-900 mb-2">
            <span className="inline-flex items-center gap-1.5"><Mail className="size-4" /> אימייל</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="name@city.gov.il"
            className="w-full bg-paper rounded-2xl border border-navy-900/10 px-4 py-3 font-body text-navy-900 placeholder:text-ink/35 focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20"
          />
        </div>
      </div>

      <div>
        <label className="flex items-start gap-2 font-body text-sm text-ink/75">
          <input type="checkbox" name="consent" required className="mt-1 shrink-0 size-4 accent-leaf-500" />
          <span>אני מאשר/ת העברת פרטים לקרן רש&quot;י להמשך הליך ההצטרפות.</span>
        </label>
        <p className="mt-3 font-body text-sm">
          <Link href="/about" className="text-leaf-700 underline hover:text-navy-900">
            קראו עוד על התוכנית
          </Link>
        </p>
      </div>

      {state?.error && (
        <div className="bg-topic-coral/10 border border-topic-coral/40 rounded-2xl px-5 py-3 font-body text-sm text-topic-coral">
          {state.error}
        </div>
      )}

      <SubmitButton />

      <p className="text-center font-body text-xs text-ink/55 pt-2">
        בכפוף ל<Link href="/privacy" className="underline">מדיניות הפרטיות</Link> ו<Link href="/terms" className="underline">תנאי השימוש</Link>.
      </p>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-navy-900 text-paper font-semibold rounded-full py-4 font-body hover:bg-navy-700 transition disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "שולח..." : "שליחת פרטים"}
    </button>
  );
}
