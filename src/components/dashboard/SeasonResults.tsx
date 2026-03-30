"use client";

import type { CalendarRace, RaceWithResults } from "@/types/api";

interface SeasonResultsProps {
  calendar: CalendarRace[];
  results: RaceWithResults[];
  driverIds: string[];
  teamColor: string;
}

const positionColors: Record<number, string> = { 1: "#FFD700", 2: "#C0C0C0", 3: "#CD7F32" };

export function SeasonResults({ calendar, results, driverIds, teamColor }: SeasonResultsProps) {
  const completedRaces = calendar.filter((r) => r.hasResults);

  return (
    <div>
      <h2 className="text-xl tracking-wider text-grid-text mb-4" style={{ fontFamily: "var(--font-display)" }}>
        TEMPORADA 2026
      </h2>
      <div className="overflow-x-auto rounded-xl bg-grid-surface border border-white/[0.06]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] text-xs uppercase tracking-wider text-grid-text-muted">
              <th className="py-3 px-3 text-left">Ronda</th>
              <th className="py-3 px-3 text-left">GP</th>
              {driverIds.map((id) => (
                <th key={id} className="py-3 px-3 text-center">{id.slice(0, 3).toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {completedRaces.map((race) => {
              const raceResult = results.find((r) => r.round === race.round);
              return (
                <tr key={race.round} className="border-b border-white/[0.04]">
                  <td className="py-2.5 px-3 text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
                    R{race.round}
                  </td>
                  <td className="py-2.5 px-3 text-grid-text">{race.name.replace(" Grand Prix", "")}</td>
                  {driverIds.map((driverId) => {
                    const dResult = raceResult?.results.find((r) => r.driverId === driverId);
                    const pos = dResult?.position;
                    const medalColor = pos ? positionColors[pos] : undefined;
                    return (
                      <td key={driverId} className="py-2.5 px-3 text-center">
                        <span
                          className="inline-block w-9 rounded text-center text-xs font-bold py-1"
                          style={{
                            background: medalColor ?? (pos ? `${teamColor}20` : "transparent"),
                            color: medalColor ? "#000" : (pos ? "var(--color-grid-text)" : "var(--color-grid-text-muted)"),
                          }}
                        >
                          {pos ? `P${pos}` : dResult ? "DNF" : "—"}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
