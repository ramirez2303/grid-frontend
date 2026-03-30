"use client";

import { DriverImage } from "@/components/ui/DriverImage";

import type { RaceWithResults } from "@/types/api";

interface CircuitRaceResultProps {
  result: RaceWithResults;
}

const positionColors: Record<number, string> = { 1: "#FFD700", 2: "#C0C0C0", 3: "#CD7F32" };

export function CircuitRaceResult({ result }: CircuitRaceResultProps) {
  const podium = result.results.slice(0, 3);
  const rest = result.results.slice(3, 10);

  return (
    <div>
      <h2 className="text-xl tracking-wider text-grid-text mb-4" style={{ fontFamily: "var(--font-display)" }}>
        RESULTADO 2026
      </h2>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 mb-6">
        {[podium[1], podium[0], podium[2]].map((r, i) => {
          if (!r) return null;
          const pos = [2, 1, 3][i]!;
          const color = positionColors[pos] ?? "#55555F";
          return (
            <div key={r.driverId} className="flex flex-col items-center">
              <DriverImage driverId={r.driverId} firstName={r.firstName} lastName={r.lastName} teamColor={r.teamColor} size="md" />
              <p className="text-sm font-bold text-grid-text mt-2">{r.lastName}</p>
              <p className="text-xs text-grid-text-muted">{r.teamName}</p>
              <span className="text-lg font-bold mt-1" style={{ fontFamily: "var(--font-display)", color }}>
                P{pos}
              </span>
              <span className="text-xs text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
                {r.time}
              </span>
            </div>
          );
        })}
      </div>

      {/* Rest */}
      <div className="flex flex-wrap justify-center gap-2">
        {rest.map((r) => (
          <div key={r.driverId} className="flex items-center gap-2 rounded-lg bg-grid-surface border border-white/[0.06] px-3 py-2">
            <span className="text-xs font-bold text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
              P{r.position}
            </span>
            <span className="h-3 w-1 rounded-full" style={{ background: r.teamColor }} />
            <span className="text-sm text-grid-text">{r.abbreviation}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
