/**
 * Domain types for static content used across the portal.
 * No React, no DB - just shapes that describe the program's content.
 */

export type TopicSlug =
  | "data-driven"
  | "human-capital"
  | "informal-policy"
  | "youth-participation";

export type TopicColor = "amber" | "coral" | "teal" | "moss";

export type Topic = {
  slug: TopicSlug;
  number: string;
  title: string;
  tagline: string;
  description: string;
  color: TopicColor;
  insights: { title: string; body: string }[];
  team: string[]; // participant ids
  externalResources: {
    type: "article" | "research" | "podcast";
    title: string;
    source: string;
    href: string;
  }[];
  documents: { title: string; size: string }[];
  podcast: { title: string; duration: string; description: string; audioSrc?: string };
};

export type ParticipantStatus = "community" | "alumni";

export type Participant = {
  id: string;
  name: string;
  role: string;
  city: string;
  topic: TopicSlug;
  quote: string;
  bio: string;
  yearsInRole?: number;
  extraRole?: string;
  status: ParticipantStatus;
};

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  source: string;
};

export type Quote = {
  text: string;
  author: string;
  role: string;
};

export type TimelineEntry = {
  date: string;
  title: string;
  body: string;
};
