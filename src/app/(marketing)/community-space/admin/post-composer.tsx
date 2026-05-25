"use client";

import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { ImagePlus, Send, X } from "lucide-react";
import { createPost, type CreatePostState } from "./actions";

export function PostComposer() {
  const [state, formAction] = useActionState<CreatePostState, FormData>(
    createPost,
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewUrl(null);
      setFileName(null);
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  function clearImage() {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setPreviewUrl(null);
    setFileName(null);
  }

  function pickFile() {
    fileInputRef.current?.click();
  }

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label className="block font-body text-sm font-semibold text-navy-900 mb-2">
          תוכן הפוסט
        </label>
        <textarea
          name="body"
          required
          rows={8}
          maxLength={5000}
          placeholder="מה רוצים לחלוק עם הקהילה?"
          className="w-full px-5 py-4 rounded-2xl bg-paper border border-navy-900/15 focus:border-navy-900 outline-none font-body text-base transition placeholder:text-ink/40 resize-y"
        />
      </div>

      <div>
        <label className="block font-body text-sm font-semibold text-navy-900 mb-2">
          תמונה (אופציונלי)
        </label>

        <input
          ref={fileInputRef}
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative rounded-2xl overflow-hidden border border-navy-900/15 bg-paper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="" className="w-full max-h-[400px] object-contain" />
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-3 left-3 size-9 rounded-full bg-navy-900/90 text-paper grid place-items-center hover:bg-navy-900 transition"
              aria-label="הסר תמונה"
            >
              <X className="size-4" />
            </button>
            {fileName && (
              <p className="absolute bottom-3 right-3 px-3 py-1.5 bg-paper/95 rounded-full font-body text-xs text-ink/70 max-w-[60%] truncate">
                {fileName}
              </p>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={pickFile}
            className="flex items-center justify-center gap-3 w-full px-5 py-8 rounded-2xl bg-paper border-2 border-dashed border-navy-900/20 hover:border-navy-900/50 transition"
          >
            <ImagePlus className="size-6 text-navy-700" />
            <span className="font-body text-base text-ink/70">בחרו תמונה (עד 5MB)</span>
          </button>
        )}
      </div>

      {state?.error && (
        <div className="bg-topic-coral/10 border border-topic-coral/40 rounded-2xl px-5 py-3 font-body text-sm text-topic-coral">
          {state.error}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center gap-3 px-8 py-4 bg-navy-900 text-paper rounded-full font-display font-bold text-lg hover:bg-navy-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <Send className="size-5" />
      <span>{pending ? "מפרסם..." : "פרסום לפיד"}</span>
    </button>
  );
}
