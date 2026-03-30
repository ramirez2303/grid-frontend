"use client";

import { use, useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { getCircuit, getCalendar, getResults } from "@/lib/api";
import { CircuitHero } from "@/components/circuits/CircuitHero";
import { CircuitTechnical } from "@/components/circuits/CircuitTechnical";
import { CircuitRaceResult } from "@/components/circuits/CircuitRaceResult";
import { SectionReveal } from "@/components/ui/SectionReveal";

import type { RaceWithResults } from "@/types/api";

interface PageProps {
  params: Promise<{ circuitId: string }>;
}

export default function CircuitDetailPage({ params }: PageProps) {
  const { circuitId } = use(params);
  const { data: circuit, loading, error } = useApi(() => getCircuit(circuitId));
  const { data: calendar } = useApi(getCalendar);
  const [raceResult, setRaceResult] = useState<RaceWithResults | null>(null);

  const race = calendar?.find((r) => r.circuitId === circuitId);

  useEffect(() => {
    if (!race?.hasResults) return;
    getResults(race.round).then(setRaceResult).catch(() => null);
  }, [race]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
      </div>
    );
  }

  if (error || !circuit) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
        <p className="text-lg text-grid-text">Circuito no encontrado</p>
        <p className="text-sm text-grid-text-muted">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">
      <CircuitHero circuit={circuit} race={race} />

      <SectionReveal>
        <CircuitTechnical circuit={circuit} />
      </SectionReveal>

      {raceResult && (
        <SectionReveal delay={0.1}>
          <CircuitRaceResult result={raceResult} />
        </SectionReveal>
      )}
    </div>
  );
}
