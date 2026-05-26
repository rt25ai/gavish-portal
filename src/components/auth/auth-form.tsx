"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Mail, ArrowLeft, Check, Lock, User as UserIcon, Building2 } from "lucide-react";
import { signIn, signUp, type AuthFormState } from "@/app/auth/actions";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const isSignUp = mode === "sign-up";
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") ?? "/community-space";

  const action = isSignUp ? signUp : signIn;
  const [state, formAction] = useActionState<AuthFormState, FormData>(
    action,
    null,
  );

  if (isSignUp && state?.success) {
    return (
      <div>
        <p className="font-body text-sm tracking-[0.18em] uppercase text-navy-700/70 font-semibold mb-4">
          הצטרפות לקהילה
        </p>
        <h1 className="font-display font-black text-display text-navy-900 leading-[0.95] mb-4">
          בדקו את המייל.
        </h1>
        <div className="bg-leaf-500/10 border border-leaf-500/40 rounded-2xl p-6 flex items-start gap-4">
          <div className="size-10 rounded-full bg-leaf-500 text-paper grid place-items-center shrink-0">
            <Check className="size-5" />
          </div>
          <p className="font-body text-base text-ink/80 leading-relaxed">
            {state.success}
          </p>
        </div>
        <p className="mt-8 font-body text-sm text-ink/60">
          לאחר אישור המייל - <Link href="/auth/sign-in" className="font-bold text-navy-900 underline underline-offset-4">היכנסו לחשבון</Link>.
        </p>
      </div>
    );
  }

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
          ? "האזור הקהילתי הוא המרחב המקצועי של בוגרי גביש. צרו חשבון כדי להצטרף."
          : "היכנסו עם האימייל והסיסמה שלכם."}
      </p>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="redirect" value={redirectTarget} />

        {isSignUp && (
          <Field label="שם מלא" name="full_name" required icon={<UserIcon className="size-5 text-ink/40" />} placeholder="שם פרטי ושם משפחה" />
        )}

        <Field label="דוא״ל" name="email" type="email" required icon={<Mail className="size-5 text-ink/40" />} placeholder="you@example.com" autoComplete="email" />

        <Field label="סיסמה" name="password" type="password" required icon={<Lock className="size-5 text-ink/40" />} placeholder={isSignUp ? "לפחות 8 תווים" : "הסיסמה שלכם"} minLength={isSignUp ? 8 : undefined} autoComplete={isSignUp ? "new-password" : "current-password"} />

        {!isSignUp && (
          <div className="-mt-2 text-end">
            <Link href="/auth/forgot-password" className="font-body text-sm text-navy-700 hover:text-navy-900 underline underline-offset-4">
              שכחתי סיסמה
            </Link>
          </div>
        )}

        {isSignUp && (
          <Field label="רשות / עיר" name="organization" icon={<Building2 className="size-5 text-ink/40" />} placeholder="לדוגמה: עיריית חיפה" />
        )}

        {state?.error && (
          <div className="bg-topic-coral/10 border border-topic-coral/40 rounded-2xl px-5 py-3 font-body text-sm text-topic-coral">
            {state.error}
          </div>
        )}

        <SubmitButton label={isSignUp ? "צרו חשבון" : "כניסה לחשבון"} />
      </form>

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

function Field({
  label,
  name,
  type = "text",
  required = false,
  icon,
  placeholder,
  minLength,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  icon?: React.ReactNode;
  placeholder?: string;
  minLength?: number;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block font-body text-sm font-semibold text-navy-900 mb-2">{label}</label>
      <div className="relative">
        {icon && <span className="absolute right-4 top-1/2 -translate-y-1/2">{icon}</span>}
        <input
          type={type}
          name={name}
          required={required}
          minLength={minLength}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full ${icon ? "pr-12" : "pr-5"} pl-5 py-4 rounded-2xl bg-cream border border-transparent focus:border-navy-900 focus:bg-paper outline-none font-body text-base transition placeholder:text-ink/40`}
        />
      </div>
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group w-full inline-flex items-center justify-between gap-4 px-7 py-4 bg-navy-900 text-paper rounded-full font-display font-bold text-lg hover:bg-navy-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <span>{pending ? "רגע..." : label}</span>
      <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
    </button>
  );
}
