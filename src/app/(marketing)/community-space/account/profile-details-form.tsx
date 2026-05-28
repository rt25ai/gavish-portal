"use client";

import { useActionState } from "react";
import { Briefcase, Building2, User as UserIcon } from "lucide-react";
import { LabeledField } from "@/components/community/ui/labeled-field";
import { StatusBanner } from "@/components/community/ui/status-banner";
import { SubmitButton } from "@/components/community/ui/submit-button";
import { updateProfile, type AccountFormState } from "./actions";

export type ProfileDetailsValues = {
  fullName: string;
  organization: string | null;
  title: string | null;
  email: string;
};

export function ProfileDetailsForm({ values }: { values: ProfileDetailsValues }) {
  const [state, action] = useActionState<AccountFormState, FormData>(updateProfile, null);

  return (
    <section>
      <h2 className="font-display font-black text-xl text-navy-900 mb-2">פרטים אישיים</h2>
      <p className="font-body text-sm text-ink/65 mb-6">
        השם והרשות מופיעים על כל פוסט שלכם בפיד.
      </p>

      <form action={action} className="space-y-5 max-w-xl">
        <LabeledField
          label="שם מלא"
          name="full_name"
          defaultValue={values.fullName}
          required
          placeholder="שם פרטי ושם משפחה"
          icon={<UserIcon className="size-5 text-ink/40" />}
        />
        <LabeledField
          label="תפקיד"
          name="title"
          defaultValue={values.title ?? ""}
          placeholder="לדוגמה: רכז/ת חינוך, מנהל/ת מחלקת נוער"
          icon={<Briefcase className="size-5 text-ink/40" />}
        />
        <LabeledField
          label="רשות / ארגון"
          name="organization"
          defaultValue={values.organization ?? ""}
          placeholder="לדוגמה: עיריית חיפה"
          icon={<Building2 className="size-5 text-ink/40" />}
        />

        <div>
          <label className="block font-body text-sm font-semibold text-navy-900 mb-2">
            אימייל
          </label>
          <div className="px-5 py-4 rounded-2xl bg-cream/50 border border-transparent font-body text-base text-ink/60">
            {values.email}
          </div>
          <p className="font-body text-xs text-ink/50 mt-2">
            לא ניתן לשנות אימייל מכאן.
          </p>
        </div>

        <StatusBanner state={state} />

        <SubmitButton idleLabel="שמירת פרטים" pendingLabel="שומר..." />
      </form>
    </section>
  );
}
