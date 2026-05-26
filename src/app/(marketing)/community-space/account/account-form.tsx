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

const AVATAR_MAX_PX = 512;
const AVATAR_JPEG_QUALITY = 0.85;

export function AccountForm({ profile }: { profile: AccountFormProfile }) {
  const [detailsState, detailsAction] = useActionState<AccountFormState, FormData>(
    updateProfile,
    null,
  );
  const [avatarState, avatarAction, avatarPending] = useActionState<AccountFormState, FormData>(
    uploadAvatar,
    null,
  );

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [resizing, setResizing] = useState(false);
  const [pendingRemove, startRemove] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  // אחרי שהשרת חזר — לנקות preview/blob URL. profile.avatarUrl מתעדכן מ-revalidatePath.
  useEffect(() => {
    if (avatarState && previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      if (fileRef.current) fileRef.current.value = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarState]);

  const displayedAvatar = previewUrl ?? profile.avatarUrl;
  const isWorking = resizing || avatarPending;

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    setLocalError(null);
    setResizing(true);

    try {
      const resized = await resizeImageToAvatar(file, AVATAR_MAX_PX, AVATAR_JPEG_QUALITY);

      // preview קטן מה-blob שכבר עבר downscale — בטוח לזיכרון.
      setPreviewUrl(URL.createObjectURL(resized));

      const fd = new FormData();
      fd.append("avatar", resized, "avatar.jpg");
      avatarAction(fd);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "קריאת התמונה נכשלה.";
      setLocalError(`לא הצלחנו לעבד את התמונה: ${msg}`);
      if (fileRef.current) fileRef.current.value = "";
    } finally {
      setResizing(false);
    }
  }

  function handleRemove() {
    setLocalError(null);
    startRemove(async () => {
      const result = await removeAvatar();
      if (result?.error) setLocalError(result.error);
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
          תוצג ליד השם שלך בפיד הקהילתי. תמונות גדולות יכווצו אוטומטית.
        </p>

        <div className="flex items-center gap-6 flex-wrap">
          <UserAvatar
            name={profile.fullName}
            avatarUrl={displayedAvatar}
            size="2xl"
          />

          <div className="flex items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              name="avatar"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={isWorking}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 text-paper rounded-full font-display font-bold text-sm hover:bg-navy-700 transition disabled:opacity-60"
            >
              <Upload className="size-4" />
              {resizing ? "מעבד..." : avatarPending ? "מעלה..." : "העלאת תמונה"}
            </button>
            {profile.avatarUrl && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={pendingRemove || isWorking}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-navy-900/15 font-body font-semibold text-sm text-navy-900 hover:bg-navy-900/5 transition disabled:opacity-60"
              >
                <Trash2 className="size-4" />
                {pendingRemove ? "מסיר..." : "הסירו תמונה"}
              </button>
            )}
          </div>
        </div>

        <StatusBanner state={avatarState} fallbackError={localError} />
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

// מקבל File / Blob, מחזיר JPEG מכווץ לריבוע <= maxSize x maxSize.
// משתמש ב-createImageBitmap + canvas → מבטיח שאת התמונה הגדולה השרת רק
// רואה ב-downscaled, ושה-preview ב-DOM הוא ה-blob הקטן (לא ה-File המקורי).
async function resizeImageToAvatar(file: File, maxSize: number, quality: number): Promise<Blob> {
  if (typeof createImageBitmap !== "function") {
    throw new Error("דפדפן ישן מדי לעיבוד תמונות.");
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("פורמט הקובץ לא נתמך.");
  }

  try {
    const ratio = Math.min(maxSize / bitmap.width, maxSize / bitmap.height, 1);
    const w = Math.max(1, Math.round(bitmap.width * ratio));
    const h = Math.max(1, Math.round(bitmap.height * ratio));

    // העדפה ל-OffscreenCanvas (לא נוגע ב-DOM). Fallback ל-canvas רגיל.
    if (typeof OffscreenCanvas !== "undefined") {
      const off = new OffscreenCanvas(w, h);
      const ctx = off.getContext("2d");
      if (!ctx) throw new Error("canvas context לא זמין.");
      ctx.drawImage(bitmap, 0, 0, w, h);
      return await off.convertToBlob({ type: "image/jpeg", quality });
    }

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas context לא זמין.");
    ctx.drawImage(bitmap, 0, 0, w, h);
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("הקובץ ריק."))),
        "image/jpeg",
        quality,
      );
    });
  } finally {
    bitmap.close();
  }
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
