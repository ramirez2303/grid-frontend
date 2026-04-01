"use client";

import { useApi } from "@/hooks/useApi";
import { getCircuitTrackData } from "@/lib/api";

interface CircuitCornerListProps {
  circuitId: string;
}

export function CircuitCornerList({ circuitId }: CircuitCornerListProps) {
  const { data: track } = useApi(() => getCircuitTrackData(circuitId));

  const named = track?.corners.filter((c) => c.name) ?? [];
  if (named.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-widest text-grid-text-muted mb-3" style={{ fontFamily: "var(--font-display)" }}>
        Curvas Famosas
      </h3>
      <div className="flex flex-wrap gap-2">
        {named.map((c) => (
          <div key={c.number} className="flex items-center gap-2 rounded-lg bg-grid-surface border border-white/[0.06] px-3 py-1.5">
            <span className="text-xs font-bold text-team-mclaren" style={{ fontFamily: "var(--font-mono)" }}>T{c.number}</span>
            <span className="text-xs text-grid-text">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
