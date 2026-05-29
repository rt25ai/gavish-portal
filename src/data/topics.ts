import { participants } from "./participants";
import type { Participant, Topic, TopicSlug } from "./types";

/**
 * 4 central challenges (האתגרים המרכזיים) explored by the first cohort.
 */
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
      title: "נתונים במקום תחושות בטן",
      duration: "11:42",
      description: "פודקאסט שיצרנו עם NotebookLM על בסיס המחקר ומקורות הכנסת. שיחה בין שני מנחים על המעבר מאינטואיציה לתשתית נתונים.",
      audioSrc: "/podcasts/data-driven.m4a",
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
      title: "המשבר השקוף של עובדי החינוך הבלתי-פורמלי",
      duration: "13:24",
      description: "פודקאסט שיצרנו עם NotebookLM על בסיס המחקר ונתוני מכון ברוקדייל. שיחה על תחלופה, שימור וטיפוח ההון האנושי.",
      audioSrc: "/podcasts/human-capital.m4a",
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
      title: "המדינה כסטנדרט, לא רק כפיקוח",
      duration: "15:50",
      description: "פודקאסט שיצרנו עם NotebookLM על בסיס המחקר ומקורות הכנסת. שיחה על מדיניות חינוך בלתי-פורמלי ברמת רשות, מחוז ומדינה.",
      audioSrc: "/podcasts/informal-policy.m4a",
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
      duration: "14:52",
      description: "פודקאסט שיצרנו עם NotebookLM על בסיס המחקר. שיחה על שיעור ההשתתפות, הפער המגדרי, והדרך להגיע אל מי שלא נמצא.",
      audioSrc: "/podcasts/youth-participation.m4a",
    },
  },
];

export function getTopic(slug: TopicSlug): Topic {
  const t = topics.find((x) => x.slug === slug);
  if (!t) throw new Error(`Topic not found: ${slug}`);
  return t;
}

export function getParticipantsByTopic(slug: TopicSlug): Participant[] {
  return participants.filter((p) => p.topic === slug);
}
