import type { Participant } from "./types";

/**
 * 17 real department heads from the first cohort.
 * Photos will be added after the photographer visit (TBD).
 */
export const participants: Participant[] = [
  { id: "p01", name: "שי ששון", role: "מנהל מחלקת נוער", city: "—", topic: "human-capital", quote: "", bio: "", status: "community" },
  { id: "p02", name: "תמר ראש", role: "מנהלת מחלקת נוער", city: "—", topic: "informal-policy", quote: "", bio: "", status: "community" },
  { id: "p03", name: "ענת אסא", role: "מנהלת מחלקת נוער", city: "—", topic: "data-driven", quote: "", bio: "", status: "community" },
  { id: "p04", name: "שי כהן", role: "מנהל מחלקת נוער", city: "—", topic: "human-capital", quote: "", bio: "", status: "community" },
  { id: "p05", name: "שירה גולדפיין", role: "מנהלת מחלקת נוער", city: "—", topic: "youth-participation", quote: "", bio: "", status: "community" },
  { id: "p06", name: "יוסי גמליאל", role: "מנהל מחלקת נוער", city: "—", topic: "informal-policy", quote: "", bio: "", status: "community" },
  { id: "p07", name: "יניב ויסמונסקי", role: "מנהל מחלקת נוער", city: "—", topic: "data-driven", quote: "", bio: "", status: "community" },
  { id: "p08", name: "הילה תדהר", role: "מנהלת מחלקת נוער", city: "—", topic: "youth-participation", quote: "", bio: "", status: "community" },
  { id: "p09", name: "אורטל אזולאי כהן", role: "מנהלת מחלקת נוער", city: "—", topic: "human-capital", quote: "", bio: "", status: "community" },
  { id: "p10", name: "עמוס צ'ייקובסקי", role: "מנהל מחלקת נוער", city: "—", topic: "informal-policy", quote: "", bio: "", status: "community" },
  { id: "p11", name: "קטי דהרי", role: "מנהלת מחלקת נוער", city: "—", topic: "data-driven", quote: "", bio: "", status: "community" },
  { id: "p12", name: "מאור בניטה", role: "מנהל מחלקת נוער", city: "—", topic: "youth-participation", quote: "", bio: "", status: "community" },
  { id: "p13", name: "אביב זמיר", role: "מנהל מחלקת נוער", city: "—", topic: "human-capital", quote: "", bio: "", status: "community" },
  { id: "p14", name: "סופיה בן הרוש", role: "מנהלת מחלקת נוער", city: "—", topic: "informal-policy", quote: "", bio: "", status: "community" },
  { id: "p15", name: "מיטל שבת", role: "מנהלת מחלקת נוער", city: "—", topic: "data-driven", quote: "", bio: "", status: "community" },
  { id: "p16", name: "אביעד כהן", role: "מנהל מחלקת נוער", city: "—", topic: "youth-participation", quote: "", bio: "", status: "community" },
  { id: "p17", name: "תהילה דומב", role: "מנהלת מחלקת נוער", city: "—", topic: "human-capital", quote: "", bio: "", status: "community" },
];

export function getParticipant(id: string): Participant | undefined {
  return participants.find((p) => p.id === id);
}
