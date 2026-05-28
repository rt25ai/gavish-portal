import "server-only";
import { createClient } from "@/server/supabase/server";
import type { ProfileBasics, ProfileRole } from "./types";

/**
 * Reads the currently-authenticated user and (optionally) a slice of
 * their profile row. Centralised so action handlers don't repeat the
 * getUser + .from("profiles") dance with slightly different selects.
 */

export type AuthedUser = { id: string; email: string | null };

export async function getCurrentUser(): Promise<AuthedUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return { id: user.id, email: user.email ?? null };
}

export async function getProfileRole(userId: string): Promise<ProfileRole | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();
  return (data?.role as ProfileRole | undefined) ?? null;
}

export async function getProfileBasics(userId: string): Promise<ProfileBasics | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("full_name, organization, title, avatar_url")
    .eq("id", userId)
    .single();
  if (!data) return null;
  return {
    fullName: data.full_name ?? "",
    organization: data.organization ?? null,
    title: data.title ?? null,
    avatarUrl: data.avatar_url ?? null,
  };
}

export type ProfileSummary = {
  fullName: string | null;
  role: ProfileRole | null;
};

export async function getProfileSummary(userId: string): Promise<ProfileSummary | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", userId)
    .single();
  if (!data) return null;
  return {
    fullName: data.full_name ?? null,
    role: (data.role as ProfileRole | undefined) ?? null,
  };
}

export type NavProfile = {
  fullName: string;
  isAdmin: boolean;
  avatarUrl: string | null;
};

export async function getNavProfile(): Promise<NavProfile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, avatar_url")
    .eq("id", user.id)
    .single();

  return {
    fullName: profile?.full_name ?? user.email ?? "",
    isAdmin: profile?.role === "admin",
    avatarUrl: profile?.avatar_url ?? null,
  };
}
