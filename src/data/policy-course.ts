/**
 * Course module: "השפעה ומדיניות - הובלה אסטרטגית בזירת הנוער"
 * A summary of the policy & influence session the cohort studied, by Liat Cohen Raviv.
 *
 * Source presentation is NOT published; this is a structured summary of the
 * concepts and frameworks taught, rebuilt as native portal content.
 *
 * No React, no DB - content shapes only.
 */

export type CourseColor = "teal" | "amber" | "coral" | "moss";

/* ---------- module intro ---------- */

export const courseMeta = {
  eyebrow: "תוכן מהקורס · מודול מדיניות",
  title: "השפעה ומדיניות.",
  subtitle: "הובלה אסטרטגית בזירת הנוער במרחב הישראלי",
  lead:
    "מנהלת מחלקת נוער יכולה לזהות נכון מה הנוער צריך - ועדיין לא להצליח להזיז את המערכת. המודול הזה עוסק בפער הזה: איך מתרגמים צורך אמיתי מהשטח לכדי מדיניות, משאבים והחלטות. סיכום התכנים שעברנו עם ליאת כהן רביב.",
  /** the framing question that opens the session */
  framing:
    "העבודה שלנו - היא בעיקר בקבלת ההחלטות, או שהיא מתחילה דווקא אחרי שההחלטות התקבלו? יכולת ההשפעה תלויה בהבנת הזירה, בזיהוי האינטרסים, ובבניית מהלך שמחבר צורך אמיתי למשאבים ולהחלטות.",
  author: "ליאת כהן רביב",
} as const;

/* ---------- manager challenges (2026) ---------- */

export const challengesIntro = {
  eyebrow: "נקודת הפתיחה",
  title: "7 האתגרים של מנהלי מחלקות נוער.",
  body:
    "מנהלי מחלקות הנוער קמים עם תחושת שליחות, אך פועלים בתוך מציאות מורכבת ומשתנה. לפני שמדברים על השפעה - כדאי לזהות את האתגרים. וברוב המקרים, אלה לא כשלים ניהוליים אישיים אלא מאפיינים של הזירה.",
} as const;

export const courseChallenges: { title: string; body: string }[] = [
  {
    title: "עמימות תפקידית",
    body: "חוסר בהירות ארגונית גורם לפעולה בתגובה למציאות במקום מתוך תפיסה אסטרטגית.",
  },
  {
    title: "תלות בפוליטיקה רשותית",
    body: "סדרי עדיפויות, הנהגה ומשאבים משתנים - ומשפיעים ישירות על יכולת הפעולה.",
  },
  {
    title: "קושי לתרגם צורך למדיניות",
    body: "גם כשמזהים בעיה, חסרה היכולת לבנות קואליציה שתתרגם אותה למדיניות ולמשאבים.",
  },
  {
    title: "מחסור במדידה",
    body: "קושי להוכיח אפקטיביות ולבסס הצלחה באמצעות נתונים.",
  },
  {
    title: "שינוי בצרכי הנוער",
    body: "שינוי דרמטי בצרכים - שחיקה, בדידות, קשיי שייכות וזהות, אלימות - ללא שינוי מבני.",
  },
  {
    title: "מניהול תוכניות להובלת אקו-סיסטם",
    body: "המעבר מהפעלת תוכניות לניהול רשתות, שותפויות, דאטה וחוסן קהילתי.",
  },
  {
    title: "שחיקה ועומס מתמשך",
    body: "תשישות והצפה, וקושי לייצר הישגים במצבי קצה שהפכו תמידיים.",
  },
];

/* ---------- policy vs politics ---------- */

export const policyVsPolitics = {
  eyebrow: "המושגים",
  title: "מדיניות ופוליטיקה.",
  politics: {
    term: "פוליטיקה",
    body: "מאבק על משאבים, כוח וסדרי עדיפויות.",
  },
  policy: {
    term: "מדיניות",
    body: "הדרך שבה סדרי עדיפויות מתורגמים לכללים ולפעולות שמעצבות מציאות.",
  },
  insight:
    "החלטות לא מתקבלות רק על בסיס צורך - אלא על בסיס אינטרסים, כוח וסדרי עדיפויות. התפקיד שלכם הוא לקחת את מה שאתם יודעים שנכון לבני הנוער, ולתרגם אותו כך שהמערכת תבחר להשקיע בו.",
} as const;

/** What only the youth-department manager does - their unique value. */
export const managerRole = {
  title: "מה רק מנהל המחלקה עושה.",
  points: [
    { title: "מייצר תנאים לפעולה", body: "תפקיד של השפעה, לא רק של הפעלה." },
    { title: "מזהה צרכים אמיתיים", body: "ומתרגם אותם לשפה מערכתית." },
    { title: "מתכלל ומחבר", body: "שותפים, משאבים והחלטות - ליצירת אימפקט ושינוי בפועל." },
  ],
} as const;

/* ---------- power-interest matrix ---------- */

export const matrixIntro = {
  eyebrow: "כלי עבודה",
  title: "מטריצת כוח-עניין.",
  body:
    "לפני שמובילים מהלך - ממפים את בעלי העניין. שתי שאלות פשוטות: למי יש השפעה על ההחלטה (שמות, לא תפקידים), ולמי יש עניין בה (כמה זה חשוב לו). הצלבת השתיים נותנת ארבע אסטרטגיות יחס.",
  axisPower: "כוח / השפעה",
  axisInterest: "עניין",
} as const;

export type MatrixCell = {
  /** grid position */
  power: "high" | "low";
  interest: "high" | "low";
  title: string;
  tag: string;
  actions: string[];
  color: CourseColor;
};

export const powerInterestMatrix: MatrixCell[] = [
  {
    power: "high",
    interest: "high",
    title: "עבדו צמוד",
    tag: "כוח גבוה · עניין גבוה",
    color: "coral",
    actions: ["שתפו פעולה", "הקשיבו וקבלו מהם השראה", "בנו אמון עמוק", "רתמו לתהליך ההחלטות"],
  },
  {
    power: "high",
    interest: "low",
    title: "שמרו מרוצים",
    tag: "כוח גבוה · עניין נמוך",
    color: "amber",
    actions: ["עדכנו במועד", "שמרו על קשר", "אל תעמיסו פרטים", "מצאו נקודת חיבור"],
  },
  {
    power: "low",
    interest: "high",
    title: "שגרירים פוטנציאליים",
    tag: "כוח נמוך · עניין גבוה",
    color: "teal",
    actions: ["יידעו ושתפו", "תנו להם קול", "הפעילו לפעילות", "הפכו לשותפים ומפיצים"],
  },
  {
    power: "low",
    interest: "low",
    title: "מעקב מינימלי",
    tag: "כוח נמוך · עניין נמוך",
    color: "teal",
    actions: ["עקבו מדי פעם", "קבעו עדכונים", "השקיעו רק כשצריך"],
  },
];

/* ---------- decision-to-impact storyline ---------- */

export const storylineIntro = {
  eyebrow: "מהחלטה לאימפקט",
  title: "סטוריליין של ביצוע.",
  body: "ארבע שאלות שמתרגמות החלטה לשינוי בפועל - מהמשמעות ועד למדידה.",
} as const;

export type StoryStep = {
  num: string;
  q: string;
  label: string;
  questions: string[];
  color: CourseColor;
};

export const storylineSteps: StoryStep[] = [
  {
    num: "1",
    q: "למה?",
    label: "ייעוד",
    color: "coral",
    questions: ["למה זה חשוב עכשיו?", "למה התפקיד שלנו משמעותי?", "מה הערך הייחודי שלנו?"],
  },
  {
    num: "2",
    q: "לאן?",
    label: "חזון",
    color: "amber",
    questions: ["מהי תמונת העתיד שאנחנו מבקשים ליצור עבור בני הנוער?"],
  },
  {
    num: "3",
    q: "איך?",
    label: "תכנון ודרך פעולה",
    color: "teal",
    questions: [
      "איפה ומתי? יעדים, מוקדים, סדרי עדיפויות ולוחות זמנים.",
      "עם מה? כוחות, נכסים, משאבים ושותפויות קיימות.",
      "עם מי? חלוקת אחריות בין בעלי התפקידים והממשקים.",
    ],
  },
  {
    num: "4",
    q: "כמה?",
    label: "תוצאות",
    color: "moss",
    questions: ["מה נמדוד כדי לדעת שהצלחנו?", "מדדי הצלחה", "כיצד נדע בזמן אמת שנדרש תיקון מסלול?"],
  },
];

/* ---------- closing insights ---------- */

export const closingInsights: { title: string; body: string }[] = [
  {
    title: "מומנטום כמנוף",
    body: "יש אירועים ותהליכים בזירה שניתן למנף לקידום מדיניות. שנת בחירות יוצרת צורך בהישגים מהירים ופתיחות ליוזמות; משבר יוצר לגיטימציה לפעולה נחושה וגיוס משאבים ייעודי.",
  },
  {
    title: "חזון אדפטיבי",
    body: "ניפוץ מיתוס: חזון טוב הוא חזון אדפטיבי. הכיוון ברור ויציב - אך הדרך לממש אותו מתעדכנת ברציפות בהתאם למציאות, להזדמנויות ולאילוצים.",
  },
];
