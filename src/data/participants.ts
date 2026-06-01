import type { Participant } from "./types";

export const participants: Participant[] = [
  { id: "p01", name: "שי ששון", role: "מנהל מחלקת נוער - גוש עציון", city: "נוקדים", topic: "human-capital", quote: "להרגיש כל רגע שאתה חי את החלום ולהיות משמעותי זה החיים", bio: "", status: "community" },
  { id: "p02", name: "תמר ראש", role: "מנהלת מחלקת ילדים ונוער מועצה אזורית יואב", city: "מזכרת בתיה", topic: "informal-policy", quote: "ללכת עם הלב ותחושת השליחות", bio: "", status: "community" },
  { id: "p03", name: "ענת אסא", role: "מנהלת מחלקת נוער גן יבנה", city: "גן יבנה", topic: "data-driven", quote: "בכל מפגש, ללמוד, לשתף, להשפיע ולגדול בכל יום מחדש", bio: "", status: "community" },
  { id: "p04", name: "שי כהן", role: "סגן אגף הנוער והצעירים - עיריית ראשון לציון", city: "ראשון לציון", topic: "human-capital", quote: "חשיבה משותפת", bio: "", status: "community" },
  { id: "p05", name: "שירה גולדפיין", role: "מנהלת מחלקת הנוער במועצה מקומית אפרת", city: "ירושלים", topic: "youth-participation", quote: "אם עושים משהו לעשות באהבה ובמקצועיות", bio: "", status: "community" },
  { id: "p06", name: "יוסי גמליאל", role: "מנהל מחלקת נוער - בית שמש", city: "בית שמש", topic: "informal-policy", quote: "אופטימיות, לדעת ללכת בין הטיפות", bio: "", status: "community" },
  { id: "p07", name: "יניב ויסמונסקי", role: "מנהל מחלקת הנוער נס ציונה", city: "גדרה", topic: "data-driven", quote: "מקסימום נצליח", bio: "", status: "community" },
  { id: "p08", name: "הילה תדהר", role: "מנהלת מחלקת הנוער - צפת", city: "קיבוץ אורטל", topic: "youth-participation", quote: "בחיים אתה יכול לבחור להתעסק בעצמך, ואתה יכול לבחור לעשות דברים גדולים", bio: "", status: "community" },
  { id: "p09", name: "אורטל אזולאי-כהן", role: "מנהלת מחלקת הנוער בבאר שבע", city: "באר שבע", topic: "human-capital", quote: "מקסימום נצליח", bio: "", status: "community" },
  { id: "p10", name: "עמוס צ'ייקובסקי", role: "מנהל מחלקת נוער - פרדסיה", city: "צופים", topic: "informal-policy", quote: "אמור מעט ועשה הרבה", bio: "", status: "community" },
  { id: "p11", name: "קטי דהרי", role: "מנהלת מחלקת נוער בבת ים", city: "עזר", topic: "data-driven", quote: "במקום שאין אנשים השתדל להיות איש", bio: "", status: "community" },
  { id: "p12", name: "מאור בניטה", role: "מנהל מחלקת הנוער בדימונה", city: "דימונה", topic: "youth-participation", quote: "כל ילד.ה ונער.ה זכאים להזדמנויות שוות על מנת לממש את הפוטנציאל הגלום בתוכם.ן", bio: "", status: "community" },
  { id: "p13", name: "אביב זמיר", role: "מנהל מחלקה - נהריה", city: "נהריה", topic: "human-capital", quote: "מעט מן האור דוחה הרבה מן החושך", bio: "", status: "community" },
  { id: "p14", name: "סופיה בן הרוש טוביאנה", role: "מנהלת מחלקת נוער יהוד-מונוסון", city: "יבנה", topic: "informal-policy", quote: "הדרך הנכונה לחנך בני אדם היא להיות להם לדוגמא", bio: "", status: "community" },
  { id: "p15", name: "מיטל שבת", role: "מנהלת מחלקת נוער חדרה", city: "—", topic: "data-driven", quote: "", bio: "", status: "community" },
  { id: "p16", name: "אביעד כהן", role: "מנהל מחלקת נוער - חבל יבנה", city: "גני טל", topic: "youth-participation", quote: "לא באנו לדבר 'על', באנו לעשות 'את'", bio: "", status: "community" },
  { id: "p17", name: "תהילה דומב", role: "מנהלת יחידת נוער - מועצה מקומית אלקנה", city: "אורנית", topic: "human-capital", quote: "כל מה שילד צריך זה מבוגר אחד שיאמין בו", bio: "", status: "community" },
  { id: "p18", name: "שירין סעיד", role: "מנהלת מחלקת נוער וחינוך בלתי פורמלי - ענה", city: "עכו", topic: "informal-policy", quote: "אם אתה חולם במשהו אז אתה עושה את זה", bio: "", status: "community" },
  { id: "p19", name: "אמיר אבקסיס", role: "מנהל אגף נוער וצעירים - מעלות תרשיחא", city: "מעלות תרשיחא", topic: "human-capital", quote: "כל נער ונערה ראויים למקום של שייכות, צמיחה והגשמה.", bio: "", status: "community" },
  { id: "p20", name: "חגית אמסלם", role: "מנהלת מחלקת נוער גדרה", city: "גדרה", topic: "youth-participation", quote: "להיות מודל לחיקוי", bio: "", status: "community" },
];

export function getParticipant(id: string): Participant | undefined {
  return participants.find((p) => p.id === id);
}
