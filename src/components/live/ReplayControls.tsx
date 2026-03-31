"use client";

import { Play, Pause, RotateCcw } from "lucide-react";

interface ReplayControlsProps {
  isPlaying: boolean;
  speed: number;
  currentIndex: number;
  totalTimestamps: number;
  onPlay: () => void;
  onPause: () => void;
  onSpeedChange: (speed: number) => void;
  onSeek: (index: number) => void;
  onRestart: () => void;
}

const speeds = [1, 2, 4, 8, 16];

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function ReplayControls({ isPlaying, speed, currentIndex, totalTimestamps, onPlay, onPause, onSpeedChange, onSeek, onRestart }: ReplayControlsProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-grid-surface border border-white/[0.06] px-4 py-3">
      <button onClick={isPlaying ? onPause : onPlay} className="flex h-9 w-9 items-center justify-center rounded-full bg-team-mclaren text-black hover:bg-team-mclaren/80 transition-colors">
        {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
      </button>

      <button onClick={onRestart} className="text-grid-text-muted hover:text-grid-text transition-colors">
        <RotateCcw size={16} />
      </button>

      <span className="text-xs text-grid-text tabular-nums w-16" style={{ fontFamily: "var(--font-mono)" }}>
        {formatTime(currentIndex)}
      </span>

      <input
        type="range"
        min={0}
        max={Math.max(totalTimestamps - 1, 0)}
        value={currentIndex}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="flex-1 h-1 bg-grid-card rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-team-mclaren"
      />

      <span className="text-xs text-grid-text-muted tabular-nums w-16 text-right" style={{ fontFamily: "var(--font-mono)" }}>
        {formatTime(totalTimestamps)}
      </span>

      <div className="flex gap-1">
        {speeds.map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${
              speed === s ? "bg-team-mclaren text-black" : "text-grid-text-muted hover:text-grid-text"
            }`}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}
