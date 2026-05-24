/**
 * Single source of truth for all placeholder content.
 * After client approval, swap these arrays with real data from Supabase.
 */

export type TopicSlug = "human-capital" | "informal-education" | "youth-tech" | "civic-partnerships";

export type Topic = {
  slug: TopicSlug;
  number: string;
  title: string;
  tagline: string;
  description: string;
  color: "amber" | "coral" | "teal" | "moss";
  insights: { title: string; body: string }[];
  team: string[]; // participant ids
  externalResources: { type: "article" | "research" | "podcast"; title: string; source: string; href: string }[];
  documents: { title: string; size: string }[];
  podcast: { title: string; duration: string; description: string };
};

export type Participant = {
  id: string;
  name: string;
  role: string;
  city: string;
  topic: TopicSlug;
  quote: string;
  bio: string;
};

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  source: string;
};

// ============================================================
// PARTICIPANTS  (18 placeholders - real photos go in /public/participants/)
// ============================================================
export const participants: Participant[] = [
  { id: "p01", name: "מאיה כהן", role: "מנהלת מח׳ נוער", city: "חיפה", topic: "human-capital", quote: "ההון האנושי הוא הנכס הכי יקר שיש למחלקה.", bio: "10 שנות ניהול במחלקת נוער. בוגרת תואר שני בעבודה סוציאלית." },
  { id: "p02", name: "אורי מזרחי", role: "מנהל מח׳ נוער", city: "באר שבע", topic: "human-capital", quote: "להשקיע בעובדים זה להשקיע בנוער.", bio: "מנהל מח׳ נוער 7 שנים, מוביל הכשרות בדרום." },
  { id: "p03", name: "שירה לוי", role: "מנהלת מח׳ נוער", city: "תל אביב-יפו", topic: "informal-education", quote: "החינוך הבלתי פורמלי הוא המעבדה של החברה.", bio: "מובילה תוכניות יזמות לנוער כבר עשור." },
  { id: "p04", name: "יוסי אבישר", role: "מנהל מח׳ נוער", city: "מודיעין", topic: "informal-education", quote: "כשנותנים לנוער מרחב - הם בוראים עולם.", bio: "בוגר התוכנית הלאומית למנהיגות חברתית." },
  { id: "p05", name: "תהילה גולן", role: "מנהלת מח׳ נוער", city: "כפר סבא", topic: "youth-tech", quote: "טכנולוגיה היא שפת האם של הדור הזה.", bio: "מובילה פרויקטי AI ונוער מאז 2022." },
  { id: "p06", name: "אריאל בן-דוד", role: "מנהל מח׳ נוער", city: "רעננה", topic: "youth-tech", quote: "לסגור פערים דיגיטליים זו משימה לאומית.", bio: "מהנדס תוכנה לשעבר, חזר לחינוך לפני 4 שנים." },
  { id: "p07", name: "נעמה רוזן", role: "מנהלת מח׳ נוער", city: "רחובות", topic: "civic-partnerships", quote: "אף רשות לא יכולה לבד.", bio: "מובילה שיתופי פעולה אזוריים." },
  { id: "p08", name: "דוד שוורץ", role: "מנהל מח׳ נוער", city: "פתח תקווה", topic: "civic-partnerships", quote: "השותפות העירונית-עסקית-קהילתית היא העתיד.", bio: "ייסד פורום מנהלי נוער מטרופוליני." },
  { id: "p09", name: "ליאת בר-יוסף", role: "מנהלת מח׳ נוער", city: "אשדוד", topic: "human-capital", quote: "מי שמטפח את הצוות שלו - מטפח את הקהילה.", bio: "מאמנת ארגונית בנוסף לתפקיד." },
  { id: "p10", name: "גיא אדרי", role: "מנהל מח׳ נוער", city: "נתניה", topic: "informal-education", quote: "תנועות הנוער הן עמוד השדרה של ישראל.", bio: "בוגר תנועת הצופים, חניך לשעבר." },
  { id: "p11", name: "רוני קליין", role: "מנהלת מח׳ נוער", city: "הרצליה", topic: "youth-tech", quote: "הילדים מלמדים אותנו על העולם החדש.", bio: "מובילה מעבדות חדשנות לבני נוער." },
  { id: "p12", name: "אסף נחום", role: "מנהל מח׳ נוער", city: "אילת", topic: "civic-partnerships", quote: "פריפריה זה לא מקום - זה הזדמנות.", bio: "10 שנים בדרום, מוביל יזמות נוער חברתית." },
  { id: "p13", name: "מיכל פז", role: "מנהלת מח׳ נוער", city: "ראשון לציון", topic: "human-capital", quote: "פיתוח עובדים הוא בנייה ארוכת טווח.", bio: "MBA במנהל ציבורי, מובילה רפורמה במחלקה." },
  { id: "p14", name: "אביב גרשון", role: "מנהל מח׳ נוער", city: "כרמיאל", topic: "informal-education", quote: "הצפון זקוק לקול ולמודלים חדשים.", bio: "מוביל פרויקטים רב-תרבותיים." },
  { id: "p15", name: "ענת מלכה", role: "מנהלת מח׳ נוער", city: "אשקלון", topic: "youth-tech", quote: "AI הוא לא איום - הוא כלי.", bio: "מורה לשעבר, מובילה הכשרות דיגיטליות." },
  { id: "p16", name: "תומר אזולאי", role: "מנהל מח׳ נוער", city: "בית שמש", topic: "civic-partnerships", quote: "כל קהילה היא רשת שזורה.", bio: "מוביל שיתופי פעולה דתי-חילוני." },
  { id: "p17", name: "הילה ברק", role: "מנהלת מח׳ נוער", city: "נצרת עילית", topic: "human-capital", quote: "צוות מאומן הוא צוות שמשפיע.", bio: "פסיכולוגית חינוכית במקצועה." },
  { id: "p18", name: "יואב פרידמן", role: "מנהל מח׳ נוער", city: "כרמיאל", topic: "informal-education", quote: "החוויה היא המורה הכי טוב.", bio: "מוביל מסעות ובלייה חוויתית לבני נוער." },
];

// ============================================================
// TOPICS
// ============================================================
export const topics: Topic[] = [
  {
    slug: "human-capital",
    number: "01",
    title: "הון אנושי",
    tagline: "האנשים שמובילים את השינוי",
    description:
      "כיצד מטפחים, מכשירים ומשמרים מנהלי נוער ועובדי מחלקה? מסע מעמיק בלב המקצוע שמחזיק על כתפיו את הדור הבא.",
    color: "amber",
    insights: [
      { title: "פערי מקצועיות", body: "ל-58% ממנהלי מחלקות הנוער אין הכשרה פורמלית בתחום ההובלה החינוכית (מינהל חברה ונוער, 2025)." },
      { title: "תחלופה גבוהה", body: "ממוצע משך הכהונה של רכזי נוער ברשות הוא 2.6 שנים - כשליש מהממוצע במגזר הציבורי הרחב." },
      { title: "השקעה חוזרת", body: "כל שקל המושקע בהכשרת עובדי נוער מחזיר 4.7 ש״ח בערך חברתי על פני 5 שנים (מכון ברוקדייל, 2024)." },
    ],
    team: ["p01", "p02", "p09", "p13", "p17"],
    externalResources: [
      { type: "research", title: "סקר מצב מנהיגות מחלקות הנוער 2024", source: "מכון ברוקדייל", href: "#" },
      { type: "article", title: "המורה שמאחורי הקלעים: על אנשי הנוער ברשויות", source: "הארץ", href: "#" },
      { type: "podcast", title: "מנהלים את החברה הישראלית", source: "כאן 11", href: "#" },
    ],
    documents: [
      { title: "מסמך תובנות צוות הון אנושי - גביש 2026", size: "2.4MB" },
      { title: "מצגת ההמלצות לקרן רש״י", size: "8.1MB" },
    ],
    podcast: {
      title: "מה שלא מספרים על מנהלי מחלקות הנוער",
      duration: "27:43",
      description: "פודקאסט שיצרנו עם AI על בסיס המחקר שלנו. שלושה פרקים, קולות אמיתיים מהשטח.",
    },
  },
  {
    slug: "informal-education",
    number: "02",
    title: "חינוך בלתי פורמלי",
    tagline: "המעבדה החברתית של ישראל",
    description:
      "תנועות נוער, מרכזי נוער, פעילויות שכונתיות. איך נראה הדור הבא של החינוך הבלתי פורמלי, ומה תפקיד הרשות?",
    color: "coral",
    insights: [
      { title: "התרחבות הצורך", body: "81% מבני הנוער מבקשים מסגרות פנאי משמעותיות - בהנחה שזה לא חוג נוסף (סקר נוער, 2025)." },
      { title: "פערים גיאוגרפיים", body: "פער של פי 2.6 בהיצע פעילויות בלתי פורמליות בין רשויות אשכול 8-10 לרשויות אשכול 1-4." },
      { title: "השפעת השביעי באוקטובר", body: "72% מהרכזים מדווחים על שינוי בצרכים הרגשיים של בני הנוער מאז 7 באוקטובר 2023 (משרד החינוך, 2025)." },
    ],
    team: ["p03", "p04", "p10", "p14", "p18"],
    externalResources: [
      { type: "research", title: "דו״ח מצב החינוך הבלתי פורמלי 2025", source: "מנהל חברה ונוער", href: "#" },
      { type: "article", title: "כשתנועת הנוער הופכת למקלט", source: "מקור ראשון", href: "#" },
      { type: "podcast", title: "אנשי השטח", source: "Galei Tzahal", href: "#" },
    ],
    documents: [
      { title: "מסמך תובנות חינוך בלתי פורמלי", size: "3.1MB" },
      { title: "מפת מסגרות חינוך בלתי פורמלי לפי רשות", size: "12.4MB" },
    ],
    podcast: {
      title: "הדרך לליבם של בני הנוער",
      duration: "31:12",
      description: "שיחה מקצועית על ההובלה החינוכית בעידן שאחרי. מבט מהזוית של הצוות שחקר.",
    },
  },
  {
    slug: "youth-tech",
    number: "03",
    title: "טכנולוגיה ונוער",
    tagline: "הדור הראשון של AI Native",
    description:
      "בני הנוער של היום הם הדור הראשון שגדל לתוך AI גנרטיבי. מה זה אומר לחינוך, לרווחה, ולמחלקה שלך?",
    color: "teal",
    insights: [
      { title: "AI Native", body: "89% מבני הנוער השתמשו ב-AI גנרטיבי לבית הספר ב-2026 - לעומת 12% ב-2023 (סקר חינוך, אוניברסיטת בר-אילן)." },
      { title: "פערים דיגיטליים", body: "12% מהמשפחות באשכולות החברתיים-כלכליים הנמוכים עדיין ללא גישה למחשב אישי בבית - הפער מצטמצם אך לא נסגר (למ״ס, 2025)." },
      { title: "בריאות נפשית", body: "מתאם של 0.44 בין שימוש כבד ברשתות חברתיות (4+ שעות יומיות) לבין מצוקה רגשית בקרב גילאי 13-15 (משרד הבריאות, 2025)." },
    ],
    team: ["p05", "p06", "p11", "p15"],
    externalResources: [
      { type: "research", title: "נוער AI: דו״ח שנתי", source: "OECD", href: "#" },
      { type: "article", title: "הילדים שגדלים עם AI", source: "Globes", href: "#" },
      { type: "podcast", title: "Tech & Teens", source: "Calcalist", href: "#" },
    ],
    documents: [
      { title: "מסמך תובנות טכנולוגיה ונוער", size: "2.8MB" },
      { title: "Toolkit AI למחלקת נוער", size: "5.6MB" },
    ],
    podcast: {
      title: "המחלקה שדיברה עם AI",
      duration: "24:08",
      description: "ניסוי שטח: מה קורה כשמחלקת נוער משלבת AI ביום-יום שלה.",
    },
  },
  {
    slug: "civic-partnerships",
    number: "04",
    title: "שותפויות עירוניות",
    tagline: "אף אחד לא הולך לבד",
    description:
      "המודל החדש של רשות הוא רשת. מי השותפים האסטרטגיים של מחלקת נוער בשנת 2030?",
    color: "moss",
    insights: [
      { title: "מודל הקבוצה", body: "רשויות שעברו לעבודה בקבוצות שותפים אזוריות הראו עלייה של 41% במדדי השפעה (JDC ישראל, 2025)." },
      { title: "המגזר השלישי", body: "54% מהרשויות מדווחות שלא ממנפות מספיק את שיתוף הפעולה עם עמותות המגזר השלישי בתחום הנוער." },
      { title: "מימון משולב", body: "כל שותפות עירונית-עסקית-מגזר שלישי מחזירה בממוצע ₪2.8 לכל שקל ציבורי שמושקע (קרן רש״י, 2024)." },
    ],
    team: ["p07", "p08", "p12", "p16"],
    externalResources: [
      { type: "research", title: "Civic Partnerships Atlas 2025", source: "JDC ישראל", href: "#" },
      { type: "article", title: "כשהרשות, העמותה והעסק מדברים", source: "TheMarker", href: "#" },
      { type: "podcast", title: "שלישיית הזהב", source: "Civic Hub", href: "#" },
    ],
    documents: [
      { title: "מסמך תובנות שותפויות עירוניות", size: "3.7MB" },
      { title: "Playbook לבניית שותפות אזורית", size: "11.2MB" },
    ],
    podcast: {
      title: "הרשת הסמויה של החברה הישראלית",
      duration: "29:55",
      description: "ארבעה ראיונות, ארבע שותפויות - והשיעורים שהן מלמדות.",
    },
  },
];

// ============================================================
// NATIONAL YOUTH STATS (2026)
// ============================================================
export const stats: Stat[] = [
  { label: "בני נוער בישראל (גילאי 12-17)", value: 1075000, source: "למ״ס · אומדן 2026" },
  { label: "רשויות מקומיות בישראל", value: 257, source: "משרד הפנים 2026" },
  { label: "תנועות נוער מוכרות", value: 14, source: "מועצת ארגוני הילדים והנוער 2026" },
  { label: "שיעור השתתפות במסגרות נוער", value: 58, suffix: "%", source: "מינהל חברה ונוער 2025" },
  { label: "מתנדבי שירות לאומי-אזרחי", value: 21500, source: "רשות השירות הלאומי 2025" },
  { label: "ילדים ובני נוער בסיכון", value: 396000, source: "משרד הרווחה והביטחון החברתי 2024" },
];

// ============================================================
// QUOTES (for /about page)
// ============================================================
export const quotes: { text: string; author: string; role: string }[] = [
  { text: "גביש לימד אותי להפסיק להיות עובדת ולהתחיל להיות מובילה.", author: "מאיה כהן", role: "חיפה" },
  { text: "פתאום הבנתי שאני לא לבד. יש 17 אנשים שמתמודדים בדיוק עם מה שאני.", author: "אורי מזרחי", role: "באר שבע" },
  { text: "התכנים, המומחים, הקבוצה - אבל הדבר הכי גדול היה הזרקור על המקצוע.", author: "שירה לוי", role: "תל אביב-יפו" },
];

// ============================================================
// TIMELINE (for /about page)
// ============================================================
export const timeline = [
  { date: "ספטמבר 2025", title: "מחזור א׳ נפתח", body: "18 מנהלות ומנהלי מח׳ נוער מ-18 רשויות. מסע של 9 חודשים." },
  { date: "נובמבר 2025", title: "מסגרות התוכנית", body: "4 ימי לימוד מרוכזים, מנטורים אישיים, פאנלים עם בכירי המקצוע." },
  { date: "ינואר 2026", title: "צוותי המחקר", body: "המשתתפים נחלקו ל-4 צוותים, כל אחד חקר נושא מקצועי לעומק." },
  { date: "מרץ 2026", title: "סדנאות עומק", body: "סדנאות עם מובילי דעת קהל, אנשי אקדמיה ושטח." },
  { date: "מאי 2026", title: "כנס סיום", body: "תערוכת תובנות, הצגה לקרן רש״י, ולמועצת ארגוני הילדים והנוער." },
  { date: "2026 ואילך", title: "קהילה מקצועית", body: "המעבר מקבוצה לקהילה. הפורטל הזה הוא הצעד הראשון." },
];

// ============================================================
// HELPERS
// ============================================================
export function getTopic(slug: TopicSlug): Topic {
  const t = topics.find((x) => x.slug === slug);
  if (!t) throw new Error(`Topic not found: ${slug}`);
  return t;
}

export function getParticipantsByTopic(slug: TopicSlug): Participant[] {
  return participants.filter((p) => p.topic === slug);
}

export function getParticipant(id: string): Participant | undefined {
  return participants.find((p) => p.id === id);
}

export const topicColorClasses = {
  amber: { bg: "bg-topic-amber", text: "text-topic-amber", border: "border-topic-amber", soft: "bg-topic-amber-soft" },
  coral: { bg: "bg-topic-coral", text: "text-topic-coral", border: "border-topic-coral", soft: "bg-topic-coral-soft" },
  teal:  { bg: "bg-topic-teal",  text: "text-topic-teal",  border: "border-topic-teal",  soft: "bg-topic-teal-soft" },
  moss:  { bg: "bg-topic-moss",  text: "text-topic-moss",  border: "border-topic-moss",  soft: "bg-topic-moss-soft" },
} as const;
