import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // `next` is the standard (used by reset-password flow); `redirect`
  // kept as fallback for older email links already in inboxes.
  const next =
    searchParams.get("next") ?? searchParams.get("redirect") ?? "/community-space";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(
    `${origin}/auth/sign-in?error=callback_failed`,
  );
}
