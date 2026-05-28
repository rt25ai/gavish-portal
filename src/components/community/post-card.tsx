import Image from "next/image";
import { UserAvatar } from "@/components/community/user-avatar";
import { formatHebrewRelativeDate } from "@/lib/format-date";
import type { FeedPost } from "@/server/posts/types";

export function PostCard({ post }: { post: FeedPost }) {
  const author = post.author.fullName ?? "חבר/ת קהילה";
  const org = post.author.organization;
  const when = formatHebrewRelativeDate(post.createdAt);

  return (
    <li className="bg-paper rounded-3xl border border-navy-900/8 overflow-hidden">
      <div className="p-6 lg:p-7">
        <div className="flex items-center gap-3 mb-4">
          <UserAvatar
            name={author}
            avatarUrl={post.author.avatarUrl ?? null}
            size="lg"
          />
          <div>
            <p className="font-display font-bold text-navy-900 text-base leading-tight">
              {author}
            </p>
            <p className="font-body text-xs text-ink/55">
              {org ? `${org} · ` : ""}
              {when}
            </p>
          </div>
        </div>
        <p className="font-body text-base text-ink/85 whitespace-pre-wrap leading-relaxed">
          {post.body}
        </p>
      </div>
      {post.imageUrl && (
        <div className="relative w-full aspect-[16/9] bg-cream">
          <Image
            src={post.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 820px) 100vw, 820px"
          />
        </div>
      )}
    </li>
  );
}
