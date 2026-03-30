"use client";

import { useApi } from "@/hooks/useApi";
import { getLastRaceResult } from "@/lib/api";
import { getCountryFlag } from "@/lib/countryFlags";
import { PodiumCard } from "./PodiumCard";

export function LastRaceResult() {
  const { data: race, loading, error } = useApi(getLastRaceResult);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mclaren" />
      </div>
    );
  }

  if (error || !race) return null;

  const podium = race.results.slice(0, 3);
  const rest = race.results.slice(3, 10);

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="h-6 w-1 rounded-full bg-team-ferrari" />
        <div>
          <h2
            className="text-2xl sm:text-3xl tracking-wider text-grid-text"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {getCountryFlag(race.country)} {race.name}
          </h2>
          <p className="text-sm text-grid-text-muted">{race.circuitName} — Ronda {race.round}</p>
        </div>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-2 sm:gap-6 mb-6">
        {podium[1] && <PodiumCard result={podium[1]} index={1} />}
        {podium[0] && <PodiumCard result={podium[0]} index={0} />}
        {podium[2] && <PodiumCard result={podium[2]} index={2} />}
      </div>

      {/* Rest of results P4-P10 */}
      <div className="flex flex-wrap justify-center gap-2">
        {rest.map((r) => (
          <div
            key={r.driverId}
            className="flex items-center gap-2 rounded-lg bg-grid-surface border border-white/[0.06] px-3 py-2"
          >
            <span className="text-xs font-bold text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
              P{r.position}
            </span>
            <span className="h-3 w-1 rounded-full" style={{ background: r.teamColor }} />
            <span className="text-sm font-medium text-grid-text">{r.abbreviation}</span>
            <span className="text-xs text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
              {r.time ?? r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
