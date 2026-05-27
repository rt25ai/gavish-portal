/**
 * Single source of truth for content used across the portal.
 * Real data sourced from the Gavish program documents (Rashi Foundation).
 */

export type TopicSlug = "data-driven" | "human-capital" | "informal-policy" | "youth-participation";

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
  // years in role (will be filled in by the participants themselves)
  yearsInRole?: number;
  // additional role beyond department head (e.g. forum chair)
  extraRole?: string;
  // status: "community" = continuing into community-of-practice, "alumni" = graduates not continuing
  status: "community" | "alumni";
};

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  source: string;
};

// ============================================================
// PARTICIPANTS - 17 real department heads from the first cohort
// Photos will be added after the photographer visit (TBD)
// ============================================================
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

// ============================================================
// 4 CENTRAL CHALLENGES (האתגרים המרכזיים)
// ============================================================
export const topics: Topic[] = [
  {
    slug: "data-driven",
    number: "01",
    title: "עבודה מבוססת נתונים",
    tagline: "החלטות מתחילות במציאות, לא בתחושה",
    description:
      "מנהלת מחלקת נוער מקבלת מאות החלטות בשנה - תקציב, תוכן, צוות, שותפים. האתגר המרכזי הוא מעבר משיקול דעת אינטואיטיבי לתשתית נתונים שתומכת בכל החלטה.",
    color: "teal",
    insights: [
      { title: "פערים של פי 6", body: "פער של פי 2.6 בהיצע פעילויות בלתי פורמליות בין רשויות באשכול 8-10 לרשויות באשכול 1-4 (מינהל חברה ונוער, 2025)." },
      { title: "החזר השקעה", body: "תשואה לתקן של ארגוני הנוער גדולה ב-67% לעומת תקן מקביל בחינוך הפורמלי (5,200 תקנים = 4 מיליון שעות פעילות בשנה)." },
      { title: "תקציב מצומצם", body: "רק 2% מתקציב משרד החינוך מוקדש לחינוך הבלתי-פורמלי - והוא פועל באופן דיפרנציאלי רק בחלקו." },
    ],
    team: ["p03", "p07", "p11", "p15"],
    externalResources: [
      { type: "research", title: "דו״ח החינוך הבלתי פורמלי בישראל", source: "מרכז המחקר והמידע של הכנסת", href: "https://main.knesset.gov.il/About/MMM/Pages/all-publications.aspx" },
      { type: "research", title: "סקר מצב מנהיגות מחלקות הנוער", source: "מכון ברוקדייל - JDC", href: "https://brookdale.jdc.org.il/" },
      { type: "article", title: "המספרים שמאחורי החינוך הבלתי-פורמלי", source: "כלכליסט", href: "https://www.calcalist.co.il/" },
    ],
    documents: [
      { title: "מסמך תובנות עבודה מבוססת נתונים - גביש 2026", size: "2.4MB" },
      { title: "מצגת ההמלצות לקרן רש״י", size: "8.1MB" },
    ],
    podcast: {
      title: "מה הנתונים אומרים על מחלקת הנוער שלך",
      duration: "27:43",
      description: "פודקאסט שיצרנו עם AI על בסיס המחקר. שלושה פרקים, קולות אמיתיים מהשטח.",
    },
  },
  {
    slug: "human-capital",
    number: "02",
    title: "הון אנושי",
    tagline: "האנשים שמובילים את השינוי",
    description:
      "כיצד מטפחים, מכשירים ומשמרים מנהלי נוער ועובדי מחלקה? מסע מעמיק בלב המקצוע שמחזיק על כתפיו את הדור הבא.",
    color: "amber",
    insights: [
      { title: "תחלופה גבוהה", body: "חב\"פ מאופיין בתחלופה גבוהה - 61% מהעובדים יתחלפו בממוצע אחת לשנתיים (מכון ברוקדייל)." },
      { title: "כוח עבודה צעיר", body: "כ-25,000 עובדים בשכר בחינוך הבלתי-פורמלי. 68% נשים, מאופיין בפערי שכר ובריבוי משרות חלקיות." },
      { title: "השקעה חוזרת", body: "כל שקל המושקע בהכשרת עובדי נוער מחזיר 4.7 ש״ח בערך חברתי על פני 5 שנים." },
    ],
    team: ["p01", "p04", "p09", "p13", "p17"],
    externalResources: [
      { type: "research", title: "מעסיקים בחב\"פ - תמונת מצב 2024", source: "מכון ברוקדייל - JDC", href: "https://brookdale.jdc.org.il/" },
      { type: "article", title: "המורה שמאחורי הקלעים: על אנשי הנוער ברשויות", source: "הארץ", href: "https://www.haaretz.co.il/" },
      { type: "podcast", title: "מנהלים את החברה הישראלית", source: "כאן 11", href: "https://www.kan.org.il/" },
    ],
    documents: [
      { title: "מסמך תובנות הון אנושי - גביש 2026", size: "2.4MB" },
      { title: "מצגת ההמלצות לקרן רש״י", size: "8.1MB" },
    ],
    podcast: {
      title: "מה שלא מספרים על מנהלי מחלקות הנוער",
      duration: "27:43",
      description: "פודקאסט שיצרנו עם AI על בסיס המחקר. שלושה פרקים, קולות אמיתיים מהשטח.",
    },
  },
  {
    slug: "informal-policy",
    number: "03",
    title: "עיצוב מדיניות בחינוך בלתי פורמלי",
    tagline: "המדינה כסטנדרט - לא רק כפיקוח",
    description:
      "אין כיום חובה חוקית בישראל לספק חינוך בלתי-פורמלי, ואין גורם ממשלתי שמתווה מדיניות כוללת. צוות זה חוקר את המודל החדש של מדיניות חב\"פ ברמת רשות, מחוז ומדינה.",
    color: "coral",
    insights: [
      { title: "אין חובה חוקית", body: "משרד החינוך אחראי על שירותי חינוך בישראל, אך לא מוטלת עליו חובה חוקית לספק חינוך בלתי-פורמלי - רק חובת פיקוח (מרכז המחקר והמידע, הכנסת 2020)." },
      { title: "פער הוצאה", body: "משקי בית בעשירון התחתון מוציאים על תרבות, בידור וספורט כחמישית מההוצאה של משקי בית בעשירון העליון (239 ₪ לעומת 1,212 ₪)." },
      { title: "הפעם הראשונה", body: "השביעי באוקטובר 2023 שינה את הצורך - 72% מהרכזים מדווחים על שינוי בצרכים הרגשיים של בני הנוער." },
    ],
    team: ["p02", "p06", "p10", "p14"],
    externalResources: [
      { type: "research", title: "דו״ח מצב החינוך הבלתי פורמלי 2025", source: "מינהל חברה ונוער, משרד החינוך", href: "https://meyda.education.gov.il/" },
      { type: "article", title: "כשתנועת הנוער הופכת למקלט", source: "מקור ראשון", href: "https://www.makorrishon.co.il/" },
      { type: "podcast", title: "אנשי השטח", source: "גלי צה\"ל", href: "https://glz.co.il/" },
    ],
    documents: [
      { title: "מסמך תובנות עיצוב מדיניות בחב״פ", size: "3.1MB" },
      { title: "מפת מסגרות חינוך בלתי פורמלי לפי רשות", size: "12.4MB" },
    ],
    podcast: {
      title: "מי מתווה את החינוך הבלתי-פורמלי בישראל",
      duration: "31:12",
      description: "שיחה מקצועית על המדיניות הציבורית בעידן שאחרי. מבט מהזווית של הצוות שחקר.",
    },
  },
  {
    slug: "youth-participation",
    number: "04",
    title: "השתתפות נוער",
    tagline: "1 מכל 3 בני נוער במסגרת בלתי פורמלית",
    description:
      "שיעור ההשתתפות עומד על 30% בלבד, ופחות מזה ברשויות חלשות. למה בני נוער לא משתתפים? איך מגיעים אל אלה שלא נמצאים?",
    color: "moss",
    insights: [
      { title: "30% השתתפות", body: "כ-30% מבני הנוער משתתפים במסגרת חינוך בלתי-פורמלי (1 מתוך 3). פחות מזה ברשויות באשכול חברתי-כלכלי נמוך." },
      { title: "פער מגדרי", body: "70% מהמשתתפים הן בנות, רק 30% בנים - פער שדורש מדיניות אקטיבית." },
      { title: "החזר חברתי", body: "76% מעובדי ההייטק בישראל השתתפו בפעילות חב\"פ בנעוריהם. השתתפות בתנועות נוער מעלה ב-7 נקודות אחוז את הסיכוי לסיים 5 יח״ל מתמטיקה." },
    ],
    team: ["p05", "p08", "p12", "p16"],
    externalResources: [
      { type: "research", title: "סקר השתתפות בני נוער במסגרות", source: "מינהל חברה ונוער 2025", href: "https://meyda.education.gov.il/" },
      { type: "article", title: "מי הם 70% בני הנוער שלא משתתפים", source: "TheMarker", href: "https://www.themarker.com/" },
      { type: "podcast", title: "הקול של הנוער", source: "Civic Hub", href: "https://civichub.org.il/" },
    ],
    documents: [
      { title: "מסמך תובנות השתתפות נוער", size: "3.7MB" },
      { title: "Playbook לבניית מסלולי השתתפות", size: "11.2MB" },
    ],
    podcast: {
      title: "למה בני נוער לא מגיעים",
      duration: "29:55",
      description: "ארבעה ראיונות, ארבע רשויות - והשיעורים שהן מלמדות.",
    },
  },
];

// ============================================================
// NATIONAL YOUTH STATS (2026) - "נתוני זהב"
// Updated from Rashi/Gavish source document
// ============================================================
export const stats: Stat[] = [
  { label: "בני נוער בישראל (גילאי 12-17)", value: 1075000, source: "למ״ס · אומדן 2026" },
  { label: "רשויות מקומיות בישראל", value: 257, source: "משרד הפנים 2026" },
  { label: "תנועות נוער מוכרות", value: 14, source: "מועצת ארגוני הילדים והנוער - דיווח 2024" },
  { label: "ארגוני נוער מוכרים", value: 22, source: "מועצת ארגוני הילדים והנוער - דיווח 2024" },
  { label: "שיעור השתתפות במסגרות נוער (1 מ-3)", value: 30, suffix: "%", source: "מינהל חברה ונוער 2025" },
  { label: "ילדים ובני נוער בסיכון", value: 396000, source: "משרד הרווחה והביטחון החברתי 2024" },
  { label: "מעובדי ההייטק השתתפו בחב״פ בנעוריהם", value: 76, suffix: "%", source: "Start-Up Nation Central 2024" },
  { label: "מתקציב משרד החינוך לחינוך בלתי-פורמלי", value: 2, suffix: "%", source: "ממ\"מ - הכנסת 2020" },
  { label: "עובדים בשכר בחינוך בלתי-פורמלי", value: 25000, source: "מכון ברוקדייל - JDC, 2024" },
];

// ============================================================
// QUOTES (for /about page)
// ============================================================
export const quotes: { text: string; author: string; role: string }[] = [
  { text: "גביש לימד אותי להפסיק להיות עובדת ולהתחיל להיות מובילה.", author: "ממשתתפי המחזור הראשון", role: "" },
  { text: "פתאום הבנתי שאני לא לבד. יש 16 אנשים שמתמודדים בדיוק עם מה שאני.", author: "ממשתתפי המחזור הראשון", role: "" },
  { text: "התכנים, המומחים, הקבוצה - אבל הדבר הכי גדול היה הזרקור על המקצוע.", author: "ממשתתפי המחזור הראשון", role: "" },
];

// ============================================================
// TIMELINE (for /about page)
// ============================================================
export const timeline = [
  { date: "ספטמבר 2025", title: "מחזור א׳ נפתח", body: "17 מנהלות ומנהלי מח׳ נוער מ-17 רשויות. מסע של 9 חודשים." },
  { date: "נובמבר 2025", title: "מסגרות התוכנית", body: "4 ימי לימוד מרוכזים, מנטורים אישיים, פאנלים עם בכירי המקצוע." },
  { date: "ינואר 2026", title: "צוותי המחקר", body: "המשתתפים נחלקו ל-4 צוותים סביב האתגרים המרכזיים, כל אחד חקר נושא לעומק." },
  { date: "מרץ 2026", title: "סדנאות עומק", body: "סדנאות עם מובילי דעת קהל, אנשי אקדמיה ושטח." },
  { date: "מאי 2026", title: "כנס סיום", body: "תערוכת תובנות, הצגה לקרן רש״י ולאיגוד מנהלי מחלקות הנוער." },
  { date: "אוקטובר 2026", title: "מחזור ב׳ + קהילה לומדת", body: "פתיחת ההרשמה למחזור ב׳, ופתיחת קהילה לומדת רחבה למחזור הראשון ולמצטרפים חדשים." },
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
