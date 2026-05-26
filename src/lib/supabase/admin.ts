import "server-only";
import { createClient as createServiceClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. Bypasses RLS.
 * Server-only — never imported into client components.
 * Use exclusively inside Server Actions that have first verified the
 * caller's identity + role via the regular server client.
 */
export function createAdminClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  );
}
