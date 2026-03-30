"use client";

import { DriverImage } from "@/components/ui/DriverImage";

import type { TeamDriverSummary, DriverStanding, RaceWithResults } from "@/types/api";

interface HeadToHeadProps {
  drivers: TeamDriverSummary[];
  standings: DriverStanding[];
  results: RaceWithResults[];
  teamColor: string;
}

interface ComparisonStat {
  label: string;
  values: [number, number];
}

export function HeadToHead({ drivers, standings, results, teamColor }: HeadToHeadProps) {
  if (drivers.length < 2) return null;
  const [d1, d2] = drivers as [TeamDriverSummary, TeamDriverSummary];
  const s1 = standings.find((s) => s.driverId === d1.id);
  const s2 = standings.find((s) => s.driverId === d2.id);

  let raceAhead: [number, number] = [0, 0];
  for (const race of results) {
    const r1 = race.results.find((r) => r.driverId === d1.id);
    const r2 = race.results.find((r) => r.driverId === d2.id);
    if (!r1 || !r2) continue;
    const p1 = r1.position ?? 99;
    const p2 = r2.position ?? 99;
    if (p1 < p2) raceAhead = [raceAhead[0] + 1, raceAhead[1]];
    else if (p2 < p1) raceAhead = [raceAhead[0], raceAhead[1] + 1];
  }

  const stats: ComparisonStat[] = [
    { label: "Puntos", values: [s1?.points ?? 0, s2?.points ?? 0] },
    { label: "Victorias", values: [s1?.wins ?? 0, s2?.wins ?? 0] },
    { label: "Delante en carrera", values: raceAhead },
  ];

  return (
    <div>
      <h2 className="text-xl tracking-wider text-grid-text mb-4" style={{ fontFamily: "var(--font-display)" }}>
        HEAD TO HEAD
      </h2>
      <div className="rounded-xl bg-grid-surface border border-white/[0.06] p-5">
        {/* Driver headers */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <DriverImage driverId={d1.id} firstName={d1.firstName} lastName={d1.lastName} teamColor={teamColor} size="md" />
            <span className="text-sm font-bold text-grid-text">{d1.lastName}</span>
          </div>
          <span className="text-xs text-grid-text-muted uppercase tracking-widest">VS</span>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-grid-text">{d2.lastName}</span>
            <DriverImage driverId={d2.id} firstName={d2.firstName} lastName={d2.lastName} teamColor={teamColor} size="md" />
          </div>
        </div>

        {/* Comparison bars */}
        <div className="space-y-4">
          {stats.map((stat) => {
            const total = stat.values[0] + stat.values[1];
            const pct1 = total > 0 ? (stat.values[0] / total) * 100 : 50;
            return (
              <div key={stat.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>{stat.values[0]}</span>
                  <span className="text-[10px] uppercase tracking-widest text-grid-text-muted">{stat.label}</span>
                  <span className="text-sm font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>{stat.values[1]}</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden bg-grid-card">
                  <div className="h-full rounded-l-full" style={{ width: `${pct1}%`, background: teamColor }} />
                  <div className="h-full rounded-r-full" style={{ width: `${100 - pct1}%`, background: `${teamColor}40` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
