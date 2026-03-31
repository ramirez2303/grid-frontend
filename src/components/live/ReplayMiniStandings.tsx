"use client";

import type { ReplayFrame, ReplayDriverInfo } from "@/types/replay";

interface ReplayMiniStandingsProps {
  frames: ReplayFrame[];
  drivers: ReplayDriverInfo[];
}

export function ReplayMiniStandings({ frames, drivers }: ReplayMiniStandingsProps) {
  const driverPositions = drivers
    .map((d) => {
      const frame = frames.find((f) => f.driverNumber === d.driverNumber);
      return { ...d, x: frame?.x ?? 0, y: frame?.y ?? 0, hasData: !!frame };
    })
    .filter((d) => d.hasData)
    .sort((a, b) => b.x - a.x);

  return (
    <div className="rounded-xl bg-grid-surface border border-white/[0.06] overflow-hidden">
      <div className="px-3 py-2 border-b border-white/[0.06]">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-grid-text-muted">Posiciones</h3>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {driverPositions.map((d, i) => (
          <div key={d.driverNumber} className="flex items-center gap-2 px-3 py-1.5 border-b border-white/[0.02]">
            <span className="w-5 text-xs font-bold text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
              {i + 1}
            </span>
            <span className="h-4 w-1 rounded-full" style={{ background: d.teamColor }} />
            <span className="text-xs font-medium text-grid-text">{d.abbreviation}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
