/**
 * "מודל העבודה" - the broader learning-communities-in-local-government model
 * that Gavish is built on, plus headline results from קרן רש״י's accompanying
 * evaluation research (מחקר הערכה מלווה, תרצה מרגולין, תשפ״ג / 2023).
 *
 * Source PDFs (in /public/docs):
 *  - learning-communities-evaluation-summary.pdf  (מצגת מסכמת - ממצאי מחקר ההערכה)
 *  - learning-communities-findings-2023.pdf        (ממצאים מרכזיים - סוף תשפ״ג)
 */

export const learningModelIntro = {
  eyebrow: "מודל העבודה · מחקר הערכה מלווה",
  title: "קהילות לומדות בשלטון המקומי",
  lead:
    "גביש היא חלק ממהלך רחב של קרן רש״י לפיתוח קהילות מקצועיות לומדות בשלטון המקומי. המהלך כולו לווה במחקר הערכה שבחן לאורך זמן את יישום המודל ואת השפעתו - על הרשויות, על הקהילות ועל האנשים שמובילים אותן. אלה התובנות המרכזיות שעלו ממנו.",
} as const;

export type ModelGoal = { num: string; title: string; body: string };

export const modelGoals: ModelGoal[] = [
  {
    num: "01",
    title: "חיזוק היכולות המקצועיות של הרשויות",
    body: "שיפור השירות וקידום מובילוּת מקצועית, מתוך תפיסה של אחריות משותפת.",
  },
  {
    num: "02",
    title: "בניית יכולות הרשות המקומית",
    body: "ביסוס יכולות הרשות באמצעות חיזוק ההון האנושי שמוביל אותה.",
  },
  {
    num: "03",
    title: "פיתוח קהילות מקצועיות לומדות",
    body: "קהילות שמקדמות את ההון האנושי ברשויות המקומיות לאורך זמן.",
  },
];

export const modelFindings: string[] = [
  "השתתפות מתמשכת ומחויבות הדדית ליעדים, לתהליך ולתוצרים - גם כשהדרך מורכבת.",
  "שלוש קהילות מקצועיות פעילות, עם נכונות גבוהה להשפיע על המרחב המקצועי.",
  "שיפור מובהק ביחסי האמון בין חברי הקהילה, ולמידה הדדית גם מעבר למפגשים הפורמליים.",
  "שביעות רצון גבוהה מהתכנים והמפגשים, לצד רצון לחולל שינוי בעקבות הידע הקהילתי.",
  "חברי הקהילות משתפים ידע, כלים ותכנים עם עמיתים, כפופים וממונים ברשות.",
];

export type ModelDoc = { href: string; label: string; sub: string };

export const modelDocs: ModelDoc[] = [
  {
    href: "/docs/learning-communities-evaluation-summary.pdf",
    label: "מצגת ממצאי מחקר ההערכה",
    sub: "סיכום מלא · מצגת",
  },
  {
    href: "/docs/learning-communities-findings-2023.pdf",
    label: "ממצאים מרכזיים - סוף תשפ״ג",
    sub: "דוח ממצאים · ספטמבר 2023",
  },
];
