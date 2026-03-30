"use client";

import { use, useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { getTeam, getConstructorStandings, getDriverStandings, getCalendar, getResults } from "@/lib/api";
import { TeamHeader } from "@/components/dashboard/TeamHeader";
import { DriverSummaryCard } from "@/components/dashboard/DriverSummaryCard";
import { TeamHistory } from "@/components/dashboard/TeamHistory";
import { SeasonResults } from "@/components/dashboard/SeasonResults";
import { HeadToHead } from "@/components/dashboard/HeadToHead";
import { SectionReveal } from "@/components/ui/SectionReveal";

import type { RaceWithResults } from "@/types/api";

interface PageProps {
  params: Promise<{ teamId: string }>;
}

export default function TeamDetailPage({ params }: PageProps) {
  const { teamId } = use(params);
  const { data: team, loading: teamLoading, error } = useApi(() => getTeam(teamId));
  const { data: constructorStandings } = useApi(getConstructorStandings);
  const { data: driverStandings } = useApi(getDriverStandings);
  const { data: calendar } = useApi(getCalendar);
  const [results, setResults] = useState<RaceWithResults[]>([]);

  const standing = constructorStandings?.find((s) => s.teamId === teamId);

  useEffect(() => {
    if (!calendar) return;
    const completedRounds = calendar.filter((r) => r.hasResults).map((r) => r.round);
    Promise.all(completedRounds.map((round) => getResults(round).catch(() => null)))
      .then((res) => setResults(res.filter((r): r is RaceWithResults => r !== null)));
  }, [calendar]);

  if (teamLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
        <p className="text-lg text-grid-text">Equipo no encontrado</p>
        <p className="text-sm text-grid-text-muted">{error}</p>
      </div>
    );
  }

  const driverIds = team.drivers.map((d) => d.id);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">
      <TeamHeader team={team} points={standing?.points ?? 0} position={standing?.position ?? 0} />

      <SectionReveal>
        <h2 className="text-xl tracking-wider text-grid-text mb-4" style={{ fontFamily: "var(--font-display)" }}>
          PILOTOS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {team.drivers.map((driver, i) => (
            <DriverSummaryCard
              key={driver.id}
              driver={driver}
              standing={driverStandings?.find((s) => s.driverId === driver.id)}
              teamColor={team.colorPrimary}
              index={i}
            />
          ))}
        </div>
      </SectionReveal>

      {driverStandings && results.length > 0 && (
        <SectionReveal delay={0.1}>
          <HeadToHead
            drivers={team.drivers}
            standings={driverStandings}
            results={results}
            teamColor={team.colorPrimary}
          />
        </SectionReveal>
      )}

      {calendar && results.length > 0 && (
        <SectionReveal delay={0.15}>
          <SeasonResults
            calendar={calendar}
            results={results}
            driverIds={driverIds}
            teamColor={team.colorPrimary}
          />
        </SectionReveal>
      )}

      <SectionReveal delay={0.2}>
        <TeamHistory team={team} />
      </SectionReveal>
    </div>
  );
}
