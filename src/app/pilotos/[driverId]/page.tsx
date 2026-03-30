"use client";

import { use, useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { getDriver, getDriverStandings, getCalendar, getResults } from "@/lib/api";
import { DriverHeader } from "@/components/dashboard/DriverHeader";
import { DriverSeasonStats } from "@/components/dashboard/DriverSeasonStats";
import { DriverRaceHistory } from "@/components/dashboard/DriverRaceHistory";
import { DriverCareerStats } from "@/components/dashboard/DriverCareerStats";
import { SectionReveal } from "@/components/ui/SectionReveal";

import type { RaceWithResults } from "@/types/api";

interface PageProps {
  params: Promise<{ driverId: string }>;
}

export default function DriverDetailPage({ params }: PageProps) {
  const { driverId } = use(params);
  const { data: driver, loading, error } = useApi(() => getDriver(driverId));
  const { data: standings } = useApi(getDriverStandings);
  const { data: calendar } = useApi(getCalendar);
  const [results, setResults] = useState<RaceWithResults[]>([]);

  const standing = standings?.find((s) => s.driverId === driverId);

  useEffect(() => {
    if (!calendar) return;
    const completedRounds = calendar.filter((r) => r.hasResults).map((r) => r.round);
    Promise.all(completedRounds.map((round) => getResults(round).catch(() => null)))
      .then((res) => setResults(res.filter((r): r is RaceWithResults => r !== null)));
  }, [calendar]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
      </div>
    );
  }

  if (error || !driver) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
        <p className="text-lg text-grid-text">Piloto no encontrado</p>
        <p className="text-sm text-grid-text-muted">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">
      <DriverHeader driver={driver} standing={standing} />

      <SectionReveal>
        <DriverSeasonStats
          standing={standing}
          results={results}
          driverId={driverId}
          teamColor={driver.team.colorPrimary}
        />
      </SectionReveal>

      {calendar && results.length > 0 && (
        <SectionReveal delay={0.1}>
          <DriverRaceHistory
            calendar={calendar}
            results={results}
            driverId={driverId}
            teamColor={driver.team.colorPrimary}
          />
        </SectionReveal>
      )}

      <SectionReveal delay={0.2}>
        <DriverCareerStats driver={driver} />
      </SectionReveal>
    </div>
  );
}
