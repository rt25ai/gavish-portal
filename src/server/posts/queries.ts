import "server-only";
import { createClient } from "@/server/supabase/server";
import type { FeedPost } from "./types";

type PostRow = {
  id: string;
  body: string;
  image_url: string | null;
  created_at: string;
  profiles: {
    full_name: string | null;
    organization: string | null;
    avatar_url: string | null;
  } | null;
};

type FeedOptions = {
  limit: number;
  includeImage?: boolean;
};

/**
 * Fetches the most recent posts joined with their author's profile.
 * `includeImage` is on by default; set to false for thumbnail feeds
 * (home page) that only need text + author.
 */
export async function listFeed({ limit, includeImage = true }: FeedOptions): Promise<FeedPost[]> {
  const supabase = await createClient();
  const select = includeImage
    ? "id, body, image_url, created_at, profiles(full_name, organization, avatar_url)"
    : "id, body, created_at, profiles(full_name, organization, avatar_url)";

  const { data } = await supabase
    .from("posts")
    .select(select)
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<PostRow[]>();

  return (data ?? []).map((row) => ({
    id: row.id,
    body: row.body,
    imageUrl: row.image_url ?? null,
    createdAt: row.created_at,
    author: {
      fullName: row.profiles?.full_name ?? null,
      organization: row.profiles?.organization ?? null,
      avatarUrl: row.profiles?.avatar_url ?? null,
    },
  }));
}
