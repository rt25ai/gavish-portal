import type { Stat } from "./types";

/**
 * National youth stats for the 2026 cycle.
 * Sources kept inline so they render straight on the data page.
 */
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
