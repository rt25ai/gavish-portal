"use client";

import { AlertCircle, Check } from "lucide-react";

export type BannerState = {
  error?: string;
  success?: string;
} | null;

/**
 * Inline success/error banner used after Server Action form submissions.
 * Same surface for the account form, post composer, and admin user list.
 */
export function StatusBanner({
  state,
  fallbackError,
}: {
  state: BannerState;
  fallbackError?: string | null;
}) {
  const error = state?.error ?? fallbackError ?? null;
  const success = state?.success ?? null;
  if (!error && !success) return null;

  if (error) {
    return (
      <div className="mt-4 flex items-start gap-3 bg-topic-coral/10 border border-topic-coral/40 rounded-2xl px-5 py-3">
        <AlertCircle className="size-5 text-topic-coral shrink-0 mt-0.5" />
        <p className="font-body text-sm text-topic-coral">{error}</p>
      </div>
    );
  }
  return (
    <div className="mt-4 flex items-start gap-3 bg-leaf-500/10 border border-leaf-500/40 rounded-2xl px-5 py-3">
      <Check className="size-5 text-leaf-700 shrink-0 mt-0.5" />
      <p className="font-body text-sm text-leaf-700">{success}</p>
    </div>
  );
}
