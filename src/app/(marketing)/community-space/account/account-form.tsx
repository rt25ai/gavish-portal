"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { Check, AlertCircle, Upload, Trash2, User as UserIcon, Building2, Briefcase } from "lucide-react";
import { UserAvatar } from "@/components/community/user-avatar";
import {
  updateProfile,
  uploadAvatar,
  removeAvatar,
  type AccountFormState,
} from "./actions";

export type AccountFormProfile = {
  fullName: string;
  organization: string | null;
  title: string | null;
  avatarUrl: string | null;
  email: string;
};

export function AccountForm({ profile }: { profile: AccountFormProfile }) {
  const [detailsState, detailsAction] = useActionState<AccountFormState, FormData>(
    updateProfile,
    null,
  );
  const [avatarState, avatarAction] = useActionState<AccountFormState, FormData>(
    uploadAvatar,
    null,
  );

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pendingRemove, startRemove] = useTransition();
  const [removeError, setRemoveError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const avatarFormRef = useRef<HTMLFormElement>(null);

  // אחרי שהשרת חזר (success או error) — מנקים את ה-preview וה-blob URL.
  // ב-success ה-profile.avatarUrl כבר מתעדכן דרך revalidatePath.
  useEffect(() => {
    if (avatarState && previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      if (fileRef.current) fileRef.current.value = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarState]);

  const displayedAvatar = previewUrl ?? profile.avatarUrl;

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    setPreviewUrl(URL.createObjectURL(file));
    avatarFormRef.current?.requestSubmit();
  }

  function handleRemove() {
    setRemoveError(null);
    startRemove(async () => {
      const result = await removeAvatar();
      if (result?.error) setRemoveError(result.error);
      setPreviewUrl(null);
      if (fileRef.current) fileRef.current.value = "";
    });
  }

  return (
    <div className="space-y-12">
      {/* תמונת פרופיל */}
      <section>
        <h2 className="font-display font-black text-xl text-navy-900 mb-2">תמונת פרופיל</h2>
        <p className="font-body text-sm text-ink/65 mb-6">
          תוצג ליד השם שלך בפיד הקהילתי. JPEG / PNG / WebP, עד 3MB.
        </p>

        <div className="flex items-center gap-6 flex-wrap">
          <UserAvatar
            name={profile.fullName}
            avatarUrl={displayedAvatar}
            size="2xl"
          />

          <form
            ref={avatarFormRef}
            action={avatarAction}
            encType="multipart/form-data"
            className="flex items-center gap-3"
          >
            <input
              ref={fileRef}
              type="file"
              name="avatar"
              accept="image/jpeg,image/png,image/webp"
              onChange={onFileChange}
              className="hidden"
            />
            <UploadButton onClick={() => fileRef.current?.click()} />
            {profile.avatarUrl && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={pendingRemove}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-navy-900/15 font-body font-semibold text-sm text-navy-900 hover:bg-navy-900/5 transition disabled:opacity-60"
              >
                <Trash2 className="size-4" />
                {pendingRemove ? "מסיר..." : "הסירו תמונה"}
              </button>
            )}
          </form>
        </div>

        <StatusBanner state={avatarState} fallbackError={removeError} />
      </section>

      <div className="border-t border-navy-900/8" />

      {/* פרטים אישיים */}
      <section>
        <h2 className="font-display font-black text-xl text-navy-900 mb-2">פרטים אישיים</h2>
        <p className="font-body text-sm text-ink/65 mb-6">
          השם והרשות מופיעים על כל פוסט שלכם בפיד.
        </p>

        <form action={detailsAction} className="space-y-5 max-w-xl">
          <Field
            label="שם מלא"
            name="full_name"
            defaultValue={profile.fullName}
            required
            placeholder="שם פרטי ושם משפחה"
            icon={<UserIcon className="size-5 text-ink/40" />}
          />
          <Field
            label="תפקיד"
            name="title"
            defaultValue={profile.title ?? ""}
            placeholder="לדוגמה: רכז/ת חינוך, מנהל/ת מחלקת נוער"
            icon={<Briefcase className="size-5 text-ink/40" />}
          />
          <Field
            label="רשות / ארגון"
            name="organization"
            defaultValue={profile.organization ?? ""}
            placeholder="לדוגמה: עיריית חיפה"
            icon={<Building2 className="size-5 text-ink/40" />}
          />

          <div>
            <label className="block font-body text-sm font-semibold text-navy-900 mb-2">
              אימייל
            </label>
            <div className="px-5 py-4 rounded-2xl bg-cream/50 border border-transparent font-body text-base text-ink/60">
              {profile.email}
            </div>
            <p className="font-body text-xs text-ink/50 mt-2">
              לא ניתן לשנות אימייל מכאן.
            </p>
          </div>

          <StatusBanner state={detailsState} />

          <SaveButton />
        </form>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required = false,
  placeholder,
  icon,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-body text-sm font-semibold text-navy-900 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2">{icon}</span>
        )}
        <input
          type="text"
          name={name}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          className={`w-full ${icon ? "pr-12" : "pr-5"} pl-5 py-4 rounded-2xl bg-cream border border-transparent focus:border-navy-900 focus:bg-paper outline-none font-body text-base transition placeholder:text-ink/40`}
        />
      </div>
    </div>
  );
}

function UploadButton({ onClick }: { onClick: () => void }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 text-paper rounded-full font-display font-bold text-sm hover:bg-navy-700 transition disabled:opacity-60"
    >
      <Upload className="size-4" />
      {pending ? "מעלה..." : "העלאת תמונה"}
    </button>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center px-7 py-3.5 bg-navy-900 text-paper rounded-full font-display font-bold text-base hover:bg-navy-700 transition disabled:opacity-60"
    >
      {pending ? "שומר..." : "שמירת פרטים"}
    </button>
  );
}

function StatusBanner({
  state,
  fallbackError,
}: {
  state: AccountFormState;
  fallbackError?: string | null;
}) {
  const error = state?.error ?? fallbackError ?? null;
  const success = state?.success ?? null;
  if (!error && !success) return null;

  if (error) {
    return (
      <div className="mt-4 flex items-start gap-3 bg-topic-coral/10 border border-topic-coral/40 rounded-2xl px-5 py-3">
        <AlertCircle className="size-5 text-topic-coral shrink-0 mt-0.5" />
        <p className="font-body text-sm text-topic-coral">{error}</p>
      </div>
    );
  }
  return (
    <div className="mt-4 flex items-start gap-3 bg-leaf-500/10 border border-leaf-500/40 rounded-2xl px-5 py-3">
      <Check className="size-5 text-leaf-700 shrink-0 mt-0.5" />
      <p className="font-body text-sm text-leaf-700">{success}</p>
    </div>
  );
}
