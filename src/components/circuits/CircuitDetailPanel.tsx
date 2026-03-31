"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { getCircuit, getResults } from "@/lib/api";
import { CircuitRaceResult } from "./CircuitRaceResult";

import type { CalendarRace, CircuitDetail, RaceWithResults } from "@/types/api";
import { CircuitHero } from "./CircuitHero";
import { SectionReveal } from "../home/SectionReveal";
import { CircuitTechnical } from "./CircuitTechnical";
import { CircuitWinners } from "./CircuitWinners";

interface CircuitDetailPanelProps {
  race: CalendarRace | null;
}

export function CircuitDetailPanel({ race }: CircuitDetailPanelProps) {
  const [circuit, setCircuit] = useState<CircuitDetail | null>(null);

  useEffect(() => {
    if (!race) {
      setCircuit(null)
      return
    }
    getCircuit(race.circuitId).then(setCircuit).catch(() => null);
  }, [race]);

  const [raceResult, setRaceResult] = useState<RaceWithResults | null>(null);

  useEffect(() => {
    if (!race?.hasResults) return;
    getResults(race.round).then(setRaceResult).catch(() => null);
  }, [race]);


  return (
    <AnimatePresence>
      {race && circuit && (
        <div className="mx-auto max-w-7xl py-10 space-y-10">
          <CircuitHero circuit={circuit} race={race} winnerColor={raceResult?.results[0]?.teamColor} />

          <SectionReveal>
            <CircuitTechnical circuit={circuit} />
          </SectionReveal>

          {raceResult && (
            <SectionReveal delay={0.1}>
              <CircuitRaceResult result={raceResult} />
            </SectionReveal>
          )}

          <SectionReveal delay={0.2}>
            <CircuitWinners circuitId={circuit.id} />
          </SectionReveal>
        </div>
      )}
    </AnimatePresence>
  );
}
