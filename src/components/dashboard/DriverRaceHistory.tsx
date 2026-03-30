"use client";

import type { CalendarRace, RaceWithResults } from "@/types/api";

interface DriverRaceHistoryProps {
  calendar: CalendarRace[];
  results: RaceWithResults[];
  driverId: string;
  teamColor: string;
}

export function DriverRaceHistory({ calendar, results, driverId, teamColor }: DriverRaceHistoryProps) {
  const completedRaces = calendar.filter((r) => r.hasResults);

  if (completedRaces.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl tracking-wider text-grid-text mb-4" style={{ fontFamily: "var(--font-display)" }}>
        CARRERA POR CARRERA
      </h2>
      <div className="overflow-x-auto rounded-xl bg-grid-surface border border-white/[0.06]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] text-xs uppercase tracking-wider text-grid-text-muted">
              <th className="py-3 px-3 text-left">Ronda</th>
              <th className="py-3 px-3 text-left">GP</th>
              <th className="py-3 px-3 text-center">Grid</th>
              <th className="py-3 px-3 text-center">Pos</th>
              <th className="py-3 px-3 text-right">Pts</th>
            </tr>
          </thead>
          <tbody>
            {completedRaces.map((race) => {
              const raceResult = results.find((r) => r.round === race.round);
              const dResult = raceResult?.results.find((r) => r.driverId === driverId);
              const pos = dResult?.position;
              const isPodium = pos !== null && pos !== undefined && pos <= 3;

              return (
                <tr key={race.round} className="border-b border-white/[0.04]">
                  <td className="py-2.5 px-3 text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
                    R{race.round}
                  </td>
                  <td className="py-2.5 px-3 text-grid-text">
                    {race.name.replace(" Grand Prix", "")}
                  </td>
                  <td className="py-2.5 px-3 text-center text-grid-text-secondary" style={{ fontFamily: "var(--font-mono)" }}>
                    {dResult?.gridPosition ?? "—"}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-block w-8 rounded text-center text-xs font-bold py-0.5 ${
                        isPodium ? "text-white" : "text-grid-text-secondary"
                      }`}
                      style={isPodium ? { background: teamColor } : undefined}
                    >
                      {pos ? `P${pos}` : "DNF"}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>
                    {dResult?.points ?? 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
