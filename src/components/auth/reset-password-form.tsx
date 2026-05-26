"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { updatePassword, type AuthFormState } from "@/app/auth/actions";

export function ResetPasswordForm({ email }: { email: string }) {
  const [state, formAction] = useActionState<AuthFormState, FormData>(
    updatePassword,
    null,
  );
  const [show, setShow] = useState(false);

  return (
    <div>
      <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
        איפוס סיסמה
      </p>
      <h1 className="font-display font-black text-display text-navy-900 leading-[0.95] mb-4">
        סיסמה חדשה.
      </h1>
      <p className="font-body text-lg text-ink/70 mb-10">
        בחרו סיסמה חדשה לחשבון{" "}
        <span className="font-bold text-navy-900">{email}</span>. מומלץ לפחות
        8 תווים, עם תערובת של אותיות ומספרים.
      </p>

      <form action={formAction} className="space-y-5">
        <PasswordField
          name="password"
          label="סיסמה חדשה"
          placeholder="לפחות 8 תווים"
          show={show}
          onToggle={() => setShow((v) => !v)}
        />
        <PasswordField
          name="confirm"
          label="אישור סיסמה"
          placeholder="אותה סיסמה שוב"
          show={show}
          onToggle={() => setShow((v) => !v)}
        />

        {state?.error && (
          <div className="bg-topic-coral/10 border border-topic-coral/40 rounded-2xl px-5 py-3 font-body text-sm text-topic-coral">
            {state.error}
          </div>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}

function PasswordField({
  name,
  label,
  placeholder,
  show,
  onToggle,
}: {
  name: string;
  label: string;
  placeholder: string;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <label className="block font-body text-sm font-semibold text-navy-900 mb-2">
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-ink/40" />
        <input
          type={show ? "text" : "password"}
          name={name}
          required
          minLength={8}
          autoComplete="new-password"
          placeholder={placeholder}
          className="w-full pr-12 pl-12 py-4 rounded-2xl bg-cream border border-transparent focus:border-navy-900 focus:bg-paper outline-none font-body text-base transition placeholder:text-ink/40"
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={show ? "הסתר סיסמה" : "הצג סיסמה"}
          className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-ink/40 hover:text-navy-900 transition"
        >
          {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
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
      <span>{pending ? "מעדכן..." : "עדכן סיסמה והיכנס"}</span>
      <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
    </button>
  );
}
