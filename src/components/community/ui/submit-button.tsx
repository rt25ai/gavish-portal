"use client";

import { useFormStatus } from "react-dom";

/**
 * Pill submit button bound to the surrounding `<form>`'s pending status.
 * Drop into any account / admin form.
 */
export function SubmitButton({
  idleLabel,
  pendingLabel,
}: {
  idleLabel: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center px-7 py-3.5 bg-navy-900 text-paper rounded-full font-display font-bold text-base hover:bg-navy-700 transition disabled:opacity-60"
    >
      {pending ? pendingLabel : idleLabel}
    </button>
  );
}
