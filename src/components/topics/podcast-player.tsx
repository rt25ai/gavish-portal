"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Real audio player for a topic's NotebookLM podcast.
 * Play/pause + seekable progress bar + live time readout.
 * Renders the inner card only; the surrounding section stays in the page.
 */
export function PodcastPlayer({
  src,
  description,
  fallbackDuration,
  accentBg,
  accentOnLight,
}: {
  src: string;
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
    <div className="bg-paper/10 backdrop-blur rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row gap-8 items-start lg:items-center">
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
          "size-24 rounded-full grid place-items-center transition shrink-0 hover:scale-105",
          accentBg,
          accentOnLight ? "text-navy-900" : "text-paper",
        )}
        aria-label={playing ? "השהה פודקאסט" : "נגן פודקאסט"}
      >
        {playing ? <Pause className="size-10" /> : <Play className="size-10 pr-1" />}
      </button>
      <div className="flex-1 w-full">
        <p className="font-body text-lg text-paper/85 leading-relaxed mb-5">{description}</p>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={current}
          onChange={seek}
          aria-label="מיקום בפודקאסט"
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-paper/20 accent-paper mb-3"
        />
        <p className="font-body text-sm text-paper/50 uppercase tracking-wider tabular-nums">
          {fmt(current)} / {duration ? fmt(duration) : fallbackDuration} · נוצר עם NotebookLM על בסיס המחקר
        </p>
      </div>
    </div>
  );
}
