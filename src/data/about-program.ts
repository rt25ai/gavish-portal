/**
 * Content for the "מהלך הליווי" block on the /about page (ProgramOverview).
 * Source: official Gavish wrapper-program one-pager (קרן רש״י).
 * Plain data only — no React, no styling.
 */

export const programIntro = {
  eyebrow: "התוכנית",
  title: "מהלך ליווי מקצועי למנהלי מחלקות נוער ברשויות המקומיות",
  goalLabel: "מטרת המהלך",
  goal: "פיתוח, מקצוע ורישות ההון האנושי למובילי התחום ברשויות המקומיות - לשם הרחבת ההשפעה והקיימוּת של המערך לחינוך בלתי פורמלי בשלטון המקומי.",
};

/** Two intro cards: who it's for + group composition. */
export const audienceCard = {
  label: "למי זה מתאים?",
  body: "מנהלי ומנהלות מחלקות הנוער ברשויות המקומיות בהן קרן רש״י פועלת, במסגרת תחום רשויות ותחום חינוך לחיים.",
};

export const groupCard = {
  label: "הרכב ומאפייני הקבוצה",
  stat: "20",
  statSuffix: "כ-",
  statLine: "מנהלי ומנהלות מחלקות נוער מרשויות שונות",
  body: "קבוצה מגוונת מבחינת אופי המשתתפים והרשויות המקומיות מהן הם מגיעים.",
};

export const background = {
  label: "רקע",
  body: "קרן רש״י רואה בחינוך הבלתי פורמלי רכיב מרכזי במתן הזדמנויות לכל ילד וילדה למוביליות חברתית, ופועלת במגוון דרכים לקדם את שגשוגו של התחום. אחת מהן היא יצירת מערך הכשרה וקהילה מקצועית לומדת לקידום ההון האנושי העוסק בחינוך הבלתי פורמלי ברשויות המקומיות בישראל.",
};

/** "מה כוללת תכנית המעטפת?" — the five pillars of the wrapper program. */
export const envelopePillars = [
  {
    title: "משאבים",
    body: "3 אפיקי השקעה (משתנה בין היישובים): תקציב ומשאבים המושקעים ע״י קרן רש״י בכל אחד ממערכי המהלכים - מוניסקייל, חינוך לחיים ותחום רשויות, וכן מענקי יישום להפעלה ספציפית של תכניות.",
    icon: "resources" as const,
  },
  {
    title: "מיצוי משאבים",
    body: "סיוע של קרן רש״י באיתור ומיצוי משאבי חינוך לחיים ברשות.",
    icon: "magnet" as const,
  },
  {
    title: "קורס הכשרה וקהילה מקצועית לומדת",
    body: "הכשרה בת 6 מפגשים וקהילה מקצועית לומדת, במיקוד על פיתוח מקצועי בעולם החינוך הבלתי פורמלי (חב״פ).",
    icon: "course" as const,
  },
  {
    title: "מנטורינג",
    body: "מנטורינג עם חונכים מהעולם העסקי / חברתי, למול צורך והתאמה.",
    icon: "mentor" as const,
  },
  {
    title: "ליווי והנחיה מקצועית למול צורך ממוקד",
    body: "ליווי על ידי מנחים מקצועיים בעולמות הרשויות המקומיות, מיצוי משאבים, פיתוח ידע, מחקר, ניהול ומנהיגות.",
    icon: "guidance" as const,
  },
];

/** "אשכולות ההכשרה — באילו תכנים נתמקד?" — four content clusters. */
export const trainingClusters = [
  { title: "פיתוח אישי ומקצועי", note: "במיקוד שלומוּת", color: "amber" as const },
  { title: "פיתוח מקצועי-פדגוגי", note: "בשדה החינוך הבלתי פורמלי, בדרך למוביליות חברתית", color: "coral" as const },
  { title: "תפיסת עבודה רשותית", note: "לבנייה והובלה ברשות המקומית", color: "teal" as const },
  { title: "מנהיגות וניהול", note: "פיתוח מיומנויות בעולם החברתי-חינוכי", color: "moss" as const },
];

/** "איך זה יעבוד?" — the two-part meeting structure. */
export const meetingFlow = [
  {
    tag: "TOP DOWN",
    num: "01",
    body: "חלקו הראשון של המפגש יוקדש לחשיפה וללימוד של נושא חדש, בכפוף לסילבוס.",
  },
  {
    tag: "BOTTOM UP",
    num: "02",
    body: "חלקו השני של המפגש יוקדש ללמידת עמיתים מובנית בנושא שייבחר על ידי חברי הקהילה מראש, כאחד מנושאי הליבה שלה.",
  },
];

/** "מבנה המפגשים" — the four meeting spaces. */
export const meetingSpaces = [
  { kind: "פיזי", detail: "סמינר דו-יומי · 5 מפגשים יומיים", meta: "09:00-18:30", icon: "seminar" as const },
  { kind: "וירטואלי", detail: "3 מפגשי זום ממוקדים לאורך השנה", meta: "Zoom", icon: "virtual" as const },
  { kind: "1:1", detail: "ליווי ע״י מנטורים מצוות התכנית", meta: "אישי", icon: "oneonone" as const },
  { kind: "בין המפגשים", detail: "ווטסאפ וצוותי עבודה", meta: "רציף", icon: "between" as const },
];

export const sourceNote = {
  text: "מבוסס על המידע הרשמי של תכנית גביש, קרן רש״י",
  href: "https://rashi.org.il/programs/gavish/",
  hrefLabel: "rashi.org.il/programs/gavish",
};
