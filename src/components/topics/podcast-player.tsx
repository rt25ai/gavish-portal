"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Real audio player for a single topic podcast (NotebookLM Audio Overview).
 * Header (format badge + title) + play/pause + seekable progress + live time.
 * One card per podcast; topics render two (deep-dive + brief).
 */
export function PodcastPlayer({
  src,
  title,
  badge,
  description,
  fallbackDuration,
  accentBg,
  accentOnLight,
}: {
  src: string;
  title: string;
  badge: string;
  description: string;
  fallbackDuration: string;
  accentBg: string;
  accentOnLight: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
    } else {
      el.pause();
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Number(e.target.value);
    setCurrent(el.currentTime);
  };

  const fmt = (s: number) => {
    if (!Number.isFinite(s) || s <= 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-paper/10 backdrop-blur rounded-3xl p-7 lg:p-10">
      <div className="flex items-center gap-3 mb-5">
        <span className={cn("inline-flex px-3 py-1 rounded-full text-xs font-body font-semibold tracking-wide", accentBg, accentOnLight ? "text-navy-900" : "text-paper")}>
          {badge}
        </span>
        <h3 className="font-display font-bold text-xl lg:text-2xl text-paper">{title}</h3>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />
        <button
          type="button"
          onClick={toggle}
          className={cn(
            "size-20 rounded-full grid place-items-center transition shrink-0 hover:scale-105",
            accentBg,
            accentOnLight ? "text-navy-900" : "text-paper",
          )}
          aria-label={playing ? `השהה: ${title}` : `נגן: ${title}`}
        >
          {playing ? <Pause className="size-9" /> : <Play className="size-9 pr-1" />}
        </button>
        <div className="flex-1 w-full">
          <p className="font-body text-base lg:text-lg text-paper/85 leading-relaxed mb-4">{description}</p>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={current}
            onChange={seek}
            aria-label={`מיקום בפודקאסט: ${title}`}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-paper/20 accent-paper mb-3"
          />
          <p className="font-body text-sm text-paper/50 uppercase tracking-wider tabular-nums">
            {fmt(current)} / {duration ? fmt(duration) : fallbackDuration || "—"} · נוצר עם NotebookLM
          </p>
        </div>
      </div>
    </div>
  );
}
