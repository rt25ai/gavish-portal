/**
 * Standard shape for `useActionState` returns on auth/profile forms.
 * One spot avoids duplicate types scattered across actions.
 */
export type FormState = {
  error?: string;
  success?: string;
} | null;
