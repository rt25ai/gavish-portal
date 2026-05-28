/**
 * Site origin used to build absolute URLs for email links
 * (verification, password reset). Reads NEXT_PUBLIC_SITE_URL
 * and falls back to localhost for dev.
 */
export function requireOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
