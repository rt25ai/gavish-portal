/**
 * Profile shapes used by server and client. Source of truth for the
 * `profiles` table row that the rest of the app reads from.
 */

export type ProfileRole = "user" | "admin";

export type ProfileBasics = {
  fullName: string;
  organization: string | null;
  title: string | null;
  avatarUrl: string | null;
};

export type ProfileWithRole = ProfileBasics & {
  role: ProfileRole;
};
