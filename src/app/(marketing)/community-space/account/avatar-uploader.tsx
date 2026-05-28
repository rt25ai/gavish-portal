"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { Trash2, Upload } from "lucide-react";
import { UserAvatar } from "@/components/community/user-avatar";
import { StatusBanner } from "@/components/community/ui/status-banner";
import { resizeImageToSquare } from "@/lib/resize-image";
import { removeAvatar, uploadAvatar, type AccountFormState } from "./actions";

const AVATAR_MAX_PX = 512;
const AVATAR_JPEG_QUALITY = 0.85;

export function AvatarUploader({
  fullName,
  avatarUrl,
}: {
  fullName: string;
  avatarUrl: string | null;
}) {
  const [avatarState, avatarAction, avatarPending] = useActionState<AccountFormState, FormData>(
    uploadAvatar,
    null,
  );

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [resizing, setResizing] = useState(false);
  const [pendingRemove, startRemove] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  // After the server responds, drop the preview blob URL.
  // profile.avatarUrl reflects the new value via revalidatePath.
  useEffect(() => {
    if (avatarState && previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      if (fileRef.current) fileRef.current.value = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarState]);

  const displayedAvatar = previewUrl ?? avatarUrl;
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
      const resized = await resizeImageToSquare(file, AVATAR_MAX_PX, AVATAR_JPEG_QUALITY);

      // Preview the shrunken blob, not the original File - keeps memory low.
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
    <section>
      <h2 className="font-display font-black text-xl text-navy-900 mb-2">תמונת פרופיל</h2>
      <p className="font-body text-sm text-ink/65 mb-6">
        תוצג ליד השם שלך בפיד הקהילתי. תמונות גדולות יכווצו אוטומטית.
      </p>

      <div className="flex items-center gap-6 flex-wrap">
        <UserAvatar name={fullName} avatarUrl={displayedAvatar} size="2xl" />

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
          {avatarUrl && (
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
  );
}
