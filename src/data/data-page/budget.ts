/**
 * Data deck section 02 - תקציב, תקנים ותשואה.
 * Headline budget numbers + Education Ministry positions stats.
 */

export const budgetHeadline: {
  total: string;
  totalLabel: string;
  pctOfEd: string;
  pctOfEdLabel: string;
  supplemental: string;
  supplementalLabel: string;
  coreInformal: string;
  coreInformalLabel: string;
  source: string;
} = {
  total: "₪1.77B",
  totalLabel: "סה״כ תקציב חב״פ",
  pctOfEd: "2%",
  pctOfEdLabel: "מתקציב משרד החינוך",
  supplemental: "₪1.2B",
  supplementalLabel: "תכניות תוספתיות (קייטנות, צהרונים)",
  coreInformal: "₪800M",
  coreInformalLabel: "לחב״פ גרידא (מתוך ~₪52B תקציב חינוך)",
  source: "מקור: מרכז המחקר והמידע של הכנסת, 2020",
};

export const positionsBreakdown: {
  positions: { value: string; body: string; source: string };
  hours: { value: string; body: string; source: string };
  returnOnPosition: { value: string; body: string; source: string };
} = {
  positions: {
    value: "5,200",
    body: "תקנים לארגוני נוער (מול כ-3M תקנים בחינוך הפורמלי בכל א׳-יב׳)",
    source: "משרד החינוך, 2017",
  },
  hours: {
    value: "4M",
    body: "שעות פעילות בשנה שמייצרים ארגוני הנוער מתוך אותם 5,200 תקנים",
    source: "משרד החינוך, 2017",
  },
  returnOnPosition: {
    value: "+67%",
    body: "תשואה לתקן של ארגוני הנוער לעומת תקן מקביל בחינוך הפורמלי",
    source: "חישוב על בסיס נתוני משרד החינוך",
  },
};
