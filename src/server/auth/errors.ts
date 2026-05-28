/**
 * Maps Supabase auth error messages to user-facing Hebrew strings.
 * Keeps copy out of action handlers so messages stay consistent.
 */
export function translateAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login")) return "אימייל או סיסמה שגויים.";
  if (m.includes("already registered") || m.includes("already exists"))
    return "כתובת האימייל הזו כבר רשומה. נסו להיכנס.";
  if (m.includes("email not confirmed"))
    return "החשבון טרם אושר. בדקו את המייל לקישור האישור.";
  if (m.includes("rate limit"))
    return "יותר מדי ניסיונות. נסו שוב בעוד כמה דקות.";
  return "אירעה שגיאה. נסו שוב.";
}
