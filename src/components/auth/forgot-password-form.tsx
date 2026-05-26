"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Mail, ArrowLeft, Check } from "lucide-react";
import {
  requestPasswordReset,
  type AuthFormState,
} from "@/app/auth/actions";

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState<AuthFormState, FormData>(
    requestPasswordReset,
    null,
  );

  if (state?.success) {
    return (
      <div>
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
          איפוס סיסמה
        </p>
        <h1 className="font-display font-black text-display text-navy-900 leading-[0.95] mb-4">
          בדקו את המייל.
        </h1>
        <div className="bg-leaf-500/10 border border-leaf-500/40 rounded-2xl p-6 flex items-start gap-4 mb-8">
          <div className="size-10 rounded-full bg-leaf-500 text-paper grid place-items-center shrink-0">
            <Check className="size-5" />
          </div>
          <p className="font-body text-base text-ink/80 leading-relaxed">
            {state.success}
          </p>
        </div>
        <p className="font-body text-sm text-ink/60">
          <Link
            href="/auth/sign-in"
            className="font-bold text-navy-900 underline underline-offset-4"
          >
            חזרה לכניסה
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
        איפוס סיסמה
      </p>
      <h1 className="font-display font-black text-display text-navy-900 leading-[0.95] mb-4">
        שכחתם סיסמה?
      </h1>
      <p className="font-body text-lg text-ink/70 mb-10">
        הזינו את כתובת האימייל שלכם, ונשלח אליכם קישור לבחירת סיסמה חדשה.
        הקישור תקף לשעה.
      </p>

      <form action={formAction} className="space-y-5">
        <div>
          <label className="block font-body text-sm font-semibold text-navy-900 mb-2">
            דוא״ל
          </label>
          <div className="relative">
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-ink/40" />
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full pr-12 pl-5 py-4 rounded-2xl bg-cream border border-transparent focus:border-navy-900 focus:bg-paper outline-none font-body text-base transition placeholder:text-ink/40"
            />
          </div>
        </div>

        {state?.error && (
          <div className="bg-topic-coral/10 border border-topic-coral/40 rounded-2xl px-5 py-3 font-body text-sm text-topic-coral">
            {state.error}
          </div>
        )}

        <SubmitButton />
      </form>

      <div className="mt-10 pt-8 border-t border-navy-900/10">
        <p className="font-body text-base text-ink/70">
          זוכרים את הסיסמה?{" "}
          <Link
            href="/auth/sign-in"
            className="font-bold text-navy-900 hover:text-leaf-700 underline underline-offset-4"
          >
            חזרה לכניסה
          </Link>
        </p>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group w-full inline-flex items-center justify-between gap-4 px-7 py-4 bg-navy-900 text-paper rounded-full font-display font-bold text-lg hover:bg-navy-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <span>{pending ? "שולח..." : "שלחו לי קישור איפוס"}</span>
      <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
    </button>
  );
}
