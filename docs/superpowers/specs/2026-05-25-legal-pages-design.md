# Legal Pages — Gavish Portal

**Date:** 2026-05-25
**Status:** approved by user, implementation in progress

## Goal

Add 3 mandatory legal pages to Gavish portal (sub-portal of Rashi Foundation), aligned with the latest Israeli legal requirements:

- `/terms` — תקנון
- `/accessibility` — הצהרת נגישות
- `/privacy` — מדיניות פרטיות

## Legal context

| Requirement | Source | Applies to |
|---|---|---|
| Disclosure of: collected data, mandatory vs voluntary, retention, location, third parties, rights, data transfer abroad | חוק הגנת הפרטיות, תיקון 13 (in force Aug 2025) | privacy page |
| Explicit, specific, revocable consent | תיקון 13 | privacy + terms |
| Site accessible at WCAG 2.0 AA / IS 5568 + published accessibility statement with named coordinator | חוק שוויון זכויות לאנשים עם מוגבלות + תקנות + IS 5568 | accessibility page |
| Opt-in marketing consent disclosed | חוק התקשורת תיקון 40, 2008 | terms page |

## Architecture

```
src/app/(marketing)/
├─ terms/page.tsx
├─ accessibility/page.tsx
└─ privacy/page.tsx

src/components/legal/
└─ legal-shell.tsx           # shared wrapper: title, ToC, prose

src/lib/
└─ legal-meta.ts             # LEGAL_UPDATED_AT + contact constants

src/components/nav/
└─ site-footer.tsx           # +3 legal links + updated date
```

## LegalShell contract

```ts
type LegalShellProps = {
  title: string;
  updatedAt: string;       // formatted Hebrew date
  toc: { id: string; label: string }[];
  children: React.ReactNode;
};
```

Renders:
- hero strip w/ title + עודכן: date badge
- two-column layout on lg+: sticky ToC (1/4) + prose article (3/4)
- single-column on mobile, ToC collapses to `<details>`
- `<article>` w/ `prose-headings:font-display`, RTL, anchored h2

## Content principles

- Original Hebrew text, structure aligned to Israeli law sections
- Same contacts as Rashi Foundation (Gavish operates under Rashi)
  - General/terms/privacy: gavish@rashi.org.il · 08-9146629 · כפר בן שמן
  - Accessibility coordinator: מיה אפשטיין · accessibility@rashi.org.il · 08-9146603
- Disclose what Gavish actually does, not generic boilerplate:
  - Data via Supabase auth (email, full_name, organization)
  - User posts + images in community area
  - Hosted on Vercel, DB on Supabase (EU/US)
  - Session cookie only — no Analytics, no ad pixels

## Footer changes

Add row above © (RTL flex, paper/55 color):
```
תקנון · הצהרת נגישות · מדיניות פרטיות · עודכן: 25.05.2026
```

## Tikun 13 disclosures (privacy page must include)

- [ ] Type of data collected (separated by category)
- [ ] For each: mandatory or voluntary
- [ ] Purpose for each category (specific, not generic)
- [ ] Retention period (numeric)
- [ ] Storage location (which jurisdiction)
- [ ] Third-party processors (named)
- [ ] Transfer abroad (yes/no + safeguard)
- [ ] User rights: access, correct, delete, port, withdraw consent
- [ ] Contact for rights requests + SLA (30 days)
- [ ] Consent: explicit, specific, revocable

## IS 5568 disclosures (accessibility page must include)

- [ ] Commitment statement
- [ ] Standard cited (IS 5568, AA)
- [ ] How site is accessible (concrete list)
- [ ] What is NOT yet accessible (honest disclosure)
- [ ] Accessibility coordinator: name + email + phone
- [ ] How to report a problem + SLA

## Out of scope

- Cookie consent banner (only session cookie, exempt under Israeli interpretation)
- Multi-language (Hebrew only)
- PDF downloads
- 3rd-party accessibility widget (semantic HTML + keyboard nav cover IS 5568 AA)

## Verification

- `npm run build` green
- Visit each page in dev: visual + ToC anchors + tab order
- Lighthouse a11y per page
- Mobile width: no horizontal scroll
- `git add` only files we touched; commit; push origin master
