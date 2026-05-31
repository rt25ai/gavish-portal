/**
 * The "Communities of Practice" (קהילה מקצועית לומדת) model that underpins Gavish.
 * Source: "המדריך השלם להקמה והובלה של קהילות מקצועיות לומדות בשלטון המקומי"
 * (קרן רש״י ומשרד הפנים) - the three-piece CoP model on p.19 of the guide.
 * Full PDF lives at /docs/learning-communities-model.pdf
 */

export type CopColor = "amber" | "teal" | "coral";

export type CopPillar = {
  /** English label as it appears in the guide */
  en: string;
  /** Hebrew label */
  he: string;
  /** One-line essence of the pillar */
  body: string;
  color: CopColor;
};

export const copIntro = {
  eyebrow: "המודל שמאחורי גביש",
  title: "מהי קהילה מקצועית לומדת?",
  lead:
    "גביש בנויה על מודל ה־Communities of Practice: קבוצת אנשים שחולקים תחום עניין מקצועי, לומדים יחד דרך עשייה משותפת, והופכים ידע אישי לידע של קהילה שלמה. שלושה ממדים נפגשים בה - וכשהם משתלבים, נוצרת קהילה לומדת.",
  pdfHref: "/docs/learning-communities-model.pdf",
  pdfLabel: "המדריך המלא להקמת קהילות לומדות (PDF)",
  pdfNote: "מתוך ‏קרן רש״י ומשרד הפנים · גרסה נגישה",
} as const;

export const copPillars: CopPillar[] = [
  {
    en: "Community",
    he: "קהילה",
    body: "למידה חברתית המבוססת על כבוד הדדי, אמון, ורצון אמיתי לחלוק, לשאול ולהקשיב.",
    color: "amber",
  },
  {
    en: "Practice",
    he: "שינוי והתנסות",
    body: "למידת עמיתים: שיתוף בכלים, רעיונות וחקרי מקרה, מתוך יצירת תוצרים והנגשת ידע מקצועי חדש דרך הקהילה.",
    color: "teal",
  },
  {
    en: "Domain",
    he: "תחום מקצועי",
    body: "תחומי תוכן, זהות ומבנה מקצועי משותף, לצד משמעות וערך ונכונות ללמידה ולחקירה משותפת.",
    color: "coral",
  },
];
