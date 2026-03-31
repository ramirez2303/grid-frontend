"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getCircuit, getResults } from "@/lib/api";
import { CircuitHero } from "./CircuitHero";
import { CircuitTechnical } from "./CircuitTechnical";
import { CircuitRaceResult } from "./CircuitRaceResult";
import { CircuitWinners } from "./CircuitWinners";
import { SectionReveal } from "@/components/ui/SectionReveal";

import type { CalendarRace, CircuitDetail, RaceWithResults } from "@/types/api";

interface CircuitDetailPanelProps {
  race: CalendarRace | null;
}

export function CircuitDetailPanel({ race }: CircuitDetailPanelProps) {
  const [circuit, setCircuit] = useState<CircuitDetail | null>(null);
  const [raceResult, setRaceResult] = useState<RaceWithResults | null>(null);

  useEffect(() => {
    setCircuit(null);
    setRaceResult(null);
    if (!race) return;

    getCircuit(race.circuitId).then(setCircuit).catch(() => null);

    if (race.hasResults) {
      getResults(race.round).then(setRaceResult).catch(() => null);
    }
  }, [race]);

  return (
    <AnimatePresence>
      {race && circuit && (
        <motion.div
          key={race.circuitId}
          className="mx-auto max-w-7xl py-10 space-y-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
