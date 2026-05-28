export type FeedAuthor = {
  fullName: string | null;
  organization: string | null;
  avatarUrl: string | null;
};

export type FeedPost = {
  id: string;
  body: string;
  imageUrl: string | null;
  createdAt: string;
  author: FeedAuthor;
};
