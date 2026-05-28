"use client";

import type { ReactNode } from "react";

/**
 * Standard labelled text input used across community-space forms.
 * Icon slot sits inset on the right (RTL leading edge).
 */
export function LabeledField({
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
  icon?: ReactNode;
}) {
  const padRight = icon ? "pr-12" : "pr-5";
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
          className={`w-full ${padRight} pl-5 py-4 rounded-2xl bg-cream border border-transparent focus:border-navy-900 focus:bg-paper outline-none font-body text-base transition placeholder:text-ink/40`}
        />
      </div>
    </div>
  );
}
