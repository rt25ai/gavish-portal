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
      { type: "research", title: "פילוח תקציב משרד החינוך על חינוך בלתי-פורמלי לילדים ולנוער", source: "מרכז המחקר והמידע של הכנסת", href: "https://fs.knesset.gov.il/globaldocs/MMM/ed1e1e53-8821-e611-80d5-00155d0acbc2/2_ed1e1e53-8821-e611-80d5-00155d0acbc2_11_10100.pdf" },
      { type: "research", title: "דיפרנציאליות בתקצוב משרד החינוך של חינוך בלתי-פורמלי", source: "מרכז המחקר והמידע של הכנסת", href: "https://fs.knesset.gov.il/globaldocs/MMM/6219ea96-c4a3-e911-80f1-00155d0a9536/2_6219ea96-c4a3-e911-80f1-00155d0a9536_11_17651.pdf" },
      { type: "research", title: "ילדים בישראל - לקט נתונים לרגל יום הילד הבין-לאומי 2024", source: "הלשכה המרכזית לסטטיסטיקה", href: "https://www.cbs.gov.il/he/mediarelease/DocLib/2024/363/11_24_363b.pdf" },
    ],
    documents: [
      { title: "מסמך תובנות עבודה מבוססת נתונים - גביש 2026", size: "2.4MB" },
      { title: "מצגת ההמלצות לקרן רש״י", size: "8.1MB" },
    ],
    podcasts: [
      {
        format: "deep-dive",
        title: "נתונים במקום תחושות בטן",
        duration: "11:42",
        description: "שיחה מעמיקה בין שני מנחים על בסיס המחקר ומקורות הכנסת - המעבר מאינטואיציה לתשתית נתונים, הפערים בין רשויות וההחזר על ההשקעה.",
        audioSrc: "/podcasts/data-driven.m4a",
      },
      {
        format: "brief",
        title: "נתונים במקום תחושות בטן - תקציר",
        duration: "1:50",
        description: "תקציר קצר וישר לעניין: שלוש הנקודות המרכזיות של האתגר בכמה דקות.",
        audioSrc: "/podcasts/data-driven-brief.m4a",
      },
    ],
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
      { type: "research", title: "חינוך בלתי פורמלי בישראל: עדויות מהשדה וסיכום תהליך למידה", source: "האקדמיה הלאומית הישראלית למדעים", href: "https://education.academy.ac.il/SystemFiles/23007.pdf" },
      { type: "research", title: "תעסוקה ופיתוח הון אנושי - מחקרים ונתונים", source: "מכון מאיירס-ג'וינט-ברוקדייל", href: "https://brookdale.jdc.org.il/category/employment/" },
      { type: "research", title: "חינוך בלתי פורמלי - סקירת ספרות", source: "בית הספר לחינוך, אוניברסיטת בר-אילן", href: "https://meyda.education.gov.il/files/noar/informal_education1.pdf" },
    ],
    documents: [
      { title: "מסמך תובנות הון אנושי - גביש 2026", size: "2.4MB" },
      { title: "מצגת ההמלצות לקרן רש״י", size: "8.1MB" },
    ],
    podcasts: [
      {
        format: "deep-dive",
        title: "המשבר השקוף של עובדי החינוך הבלתי-פורמלי",
        duration: "13:24",
        description: "שיחה מעמיקה בין שני מנחים על בסיס המחקר ונתוני מכון ברוקדייל - תחלופה, שימור וטיפוח ההון האנושי.",
        audioSrc: "/podcasts/human-capital.m4a",
      },
      {
        format: "brief",
        title: "המשבר השקוף - תקציר",
        duration: "1:30",
        description: "תקציר קצר וישר לעניין: שלוש הנקודות המרכזיות של האתגר בכמה דקות.",
        audioSrc: "/podcasts/human-capital-brief.m4a",
      },
    ],
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
      { type: "research", title: "חינוך בלתי פורמלי העונה על צרכיה וייחודה של החברה הערבית בישראל", source: "מרכז המחקר והמידע של הכנסת", href: "https://fs.knesset.gov.il/23/Committees/23_ci_bg_581721.pdf" },
      { type: "research", title: "פעילות החינוך הבלתי-פורמלי בצל נגיף הקורונה", source: "מרכז המחקר והמידע של הכנסת", href: "https://fs.knesset.gov.il/23/Committees/23_cs_bg_576095.pdf" },
      { type: "podcast", title: "מחקר בשלוש קריאות - הפודקאסט של מרכז המחקר והמידע", source: "מרכז המחקר והמידע של הכנסת", href: "https://podcasts.apple.com/il/podcast/id1579289638" },
    ],
    documents: [
      { title: "מסמך תובנות עיצוב מדיניות בחב״פ", size: "3.1MB" },
      { title: "מפת מסגרות חינוך בלתי פורמלי לפי רשות", size: "12.4MB" },
    ],
    podcasts: [
      {
        format: "deep-dive",
        title: "המדינה כסטנדרט, לא רק כפיקוח",
        duration: "15:50",
        description: "שיחה מעמיקה בין שני מנחים על בסיס המחקר ומקורות הכנסת - מדיניות חינוך בלתי-פורמלי ברמת רשות, מחוז ומדינה.",
        audioSrc: "/podcasts/informal-policy.m4a",
      },
      {
        format: "brief",
        title: "המדינה כסטנדרט - תקציר",
        duration: "1:54",
        description: "תקציר קצר וישר לעניין: שלוש הנקודות המרכזיות של האתגר בכמה דקות.",
        audioSrc: "/podcasts/informal-policy-brief.m4a",
      },
    ],
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
      { type: "research", title: "תנועות וארגוני הנוער: קידום חינוך ערכי", source: "מועצת ארגוני הילדים והנוער", href: "https://coyo.org.il/%D7%AA%D7%A0%D7%95%D7%A2%D7%95%D7%AA-%D7%95%D7%90%D7%A8%D7%92%D7%95%D7%A0%D7%99-%D7%94%D7%A0%D7%95%D7%A2%D7%A8/" },
      { type: "article", title: "הקיצוץ לתנועות הנוער מסוכן משנדמה לנו", source: "מוסף כלכליסט", href: "https://newmedia.calcalist.co.il/magazine-29-02-24/m03.html" },
      { type: "research", title: "ילדים ובני נוער - מחקרים ונתונים", source: "מכון מאיירס-ג'וינט-ברוקדייל", href: "https://brookdale.jdc.org.il/category/children-and-youth/" },
    ],
    documents: [
      { title: "מסמך תובנות השתתפות נוער", size: "3.7MB" },
      { title: "Playbook לבניית מסלולי השתתפות", size: "11.2MB" },
    ],
    podcasts: [
      {
        format: "deep-dive",
        title: "למה בני נוער לא מגיעים",
        duration: "14:52",
        description: "שיחה מעמיקה בין שני מנחים על בסיס המחקר - שיעור ההשתתפות, הפער המגדרי, והדרך להגיע אל מי שלא נמצא.",
        audioSrc: "/podcasts/youth-participation.m4a",
      },
      {
        format: "brief",
        title: "למה בני נוער לא מגיעים - תקציר",
        duration: "1:40",
        description: "תקציר קצר וישר לעניין: שלוש הנקודות המרכזיות של האתגר בכמה דקות.",
        audioSrc: "/podcasts/youth-participation-brief.m4a",
      },
    ],
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
