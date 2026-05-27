"use server";

import { Resend } from "resend";

export type JoinFormState = {
  error?: string;
  success?: string;
} | null;

/** Registrar who receives every join request. */
const REGISTRAR_EMAIL = "noana@rashi.org.il";

export async function submitJoinRequest(
  _prev: JoinFormState,
  formData: FormData,
): Promise<JoinFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const consent = formData.get("consent");

  if (!name || !city || !phone || !email) {
    return { error: "אנא מלאו את כל השדות." };
  }
  if (!consent) {
    return { error: 'יש לאשר העברת פרטים לקרן רש"י כדי להמשיך.' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Key not configured yet — fail safe with a clear message.
    return {
      error: `שליחת הטופס אינה זמינה כרגע. אנא שלחו את הפרטים ישירות אל ${REGISTRAR_EMAIL}.`,
    };
  }

  // Interim sender: Resend's onboarding domain. Swap to a verified Gavish
  // sender via RESEND_FROM once the rashi.org.il domain is verified in Resend.
  const from = process.env.RESEND_FROM ?? "קהילת גביש <onboarding@resend.dev>";

  const lines = [
    `שם מלא: ${name}`,
    `רשות מקומית: ${city}`,
    `טלפון: ${phone}`,
    `אימייל: ${email}`,
    "",
    'הנרשם/ת אישר/ה העברת פרטים לקרן רש"י להמשך הליך ההצטרפות.',
  ];

  const html = `<div dir="rtl" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#1a1a1a">
    <h2 style="margin:0 0 12px">הרשמה חדשה לקהילת גביש</h2>
    <table cellpadding="0" cellspacing="0" style="font-size:15px">
      <tr><td style="padding:2px 8px 2px 0;color:#555">שם מלא:</td><td><strong>${escapeHtml(name)}</strong></td></tr>
      <tr><td style="padding:2px 8px 2px 0;color:#555">רשות מקומית:</td><td>${escapeHtml(city)}</td></tr>
      <tr><td style="padding:2px 8px 2px 0;color:#555">טלפון:</td><td>${escapeHtml(phone)}</td></tr>
      <tr><td style="padding:2px 8px 2px 0;color:#555">אימייל:</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
    </table>
    <p style="margin:16px 0 0;color:#555">הנרשם/ת אישר/ה העברת פרטים לקרן רש"י להמשך הליך ההצטרפות.</p>
  </div>`;

  try {
    const { error } = await resend(apiKey).emails.send({
      from,
      to: REGISTRAR_EMAIL,
      replyTo: email,
      subject: `הרשמה לקהילת גביש - ${name}`,
      text: lines.join("\n"),
      html,
    });

    if (error) {
      console.error("[join] resend error", error);
      return {
        error: `אירעה שגיאה בשליחה. אפשר לפנות ישירות אל ${REGISTRAR_EMAIL}.`,
      };
    }
  } catch (err) {
    console.error("[join] resend threw", err);
    return {
      error: `אירעה שגיאה בשליחה. אפשר לפנות ישירות אל ${REGISTRAR_EMAIL}.`,
    };
  }

  return {
    success: "תודה! הפרטים נשלחו לצוות גביש. ניצור איתכם קשר בקרוב.",
  };
}

function resend(apiKey: string) {
  return new Resend(apiKey);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
