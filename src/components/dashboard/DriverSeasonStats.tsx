"use client";

import { Trophy, Flag, Award, Zap, CircleX } from "lucide-react";

import type { DriverStanding, RaceWithResults } from "@/types/api";

interface DriverSeasonStatsProps {
  standing: DriverStanding | undefined;
  results: RaceWithResults[];
  driverId: string;
  teamColor: string;
}

export function DriverSeasonStats({ standing, results, driverId, teamColor }: DriverSeasonStatsProps) {
  let podiums = 0;
  let dnfs = 0;
  let fastestLaps = 0;

  for (const race of results) {
    const dResult = race.results.find((r) => r.driverId === driverId);
    if (!dResult) continue;
    if (dResult.position !== null && dResult.position <= 3) podiums++;
    if (dResult.status && dResult.status !== "Finished") dnfs++;
    if (dResult.fastestLap) fastestLaps++;
  }

  const stats = [
    { icon: Trophy, label: "Victorias", value: standing?.wins ?? 0 },
    { icon: Award, label: "Podios", value: podiums },
    { icon: Flag, label: "Puntos", value: standing?.points ?? 0 },
    { icon: Zap, label: "Fastest Laps", value: fastestLaps },
    { icon: CircleX, label: "DNFs", value: dnfs },
  ];

  return (
    <div>
      <h2 className="text-xl tracking-wider text-grid-text mb-4" style={{ fontFamily: "var(--font-display)" }}>
        TEMPORADA 2026
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-grid-surface border border-white/[0.06] p-5 text-center">
            <stat.icon size={20} className="mx-auto mb-3" style={{ color: teamColor }} />
            <p className="text-4xl font-bold text-grid-text" style={{ fontFamily: "var(--font-display)" }}>
              {stat.value}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-grid-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
