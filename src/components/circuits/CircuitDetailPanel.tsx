"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ruler, CornerDownRight, Zap, MapPin } from "lucide-react";
import { getCircuit, getResults } from "@/lib/api";
import { TrackLayout } from "./TrackLayout";
import { CircuitRaceResult } from "./CircuitRaceResult";
import { CountryFlag } from "@/components/ui/CountryFlag";

import type { CalendarRace, CircuitDetail, RaceWithResults } from "@/types/api";

interface CircuitDetailPanelProps {
  race: CalendarRace | null;
}

export function CircuitDetailPanel({ race }: CircuitDetailPanelProps) {
  const [circuit, setCircuit] = useState<CircuitDetail | null>(null);
  const [result, setResult] = useState<RaceWithResults | null>(null);

  useEffect(() => {
    if (!race) { setCircuit(null); setResult(null); return; }
    getCircuit(race.circuitId).then(setCircuit).catch(() => null);
    if (race.hasResults) getResults(race.round).then(setResult).catch(() => null);
    else setResult(null);
  }, [race]);

  return (
    <AnimatePresence>
      {race && circuit && (
        <motion.div
          key={race.circuitId}
          className="rounded-2xl bg-grid-surface border border-white/[0.06] overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Track SVG */}
              <TrackLayout
                circuitId={race.circuitId}
                color={result ? result.results[0]?.teamColor : "#F0F0F2"}
                className="w-full md:w-48 h-40 flex-shrink-0"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CountryFlag country={race.country} size={20} />
                  <h3 className="text-xl tracking-wider text-grid-text" style={{ fontFamily: "var(--font-display)" }}>
                    {race.name.replace(" Grand Prix", "")}
                  </h3>
                </div>
                <p className="text-sm text-grid-text-muted mb-4">{circuit.name} — {circuit.city}, {circuit.country}</p>

                {/* Technical stats */}
                {circuit.description && (
                  <p className="text-xs text-grid-text-secondary leading-relaxed mb-4">{circuit.description}</p>
                )}

                <div className="flex flex-wrap gap-4 text-xs">
                  {circuit.length && <span className="flex items-center gap-1 text-grid-text-secondary"><Ruler size={12} className="text-team-mercedes" /> {circuit.length} km</span>}
                  {circuit.turns && <span className="flex items-center gap-1 text-grid-text-secondary"><CornerDownRight size={12} className="text-team-mercedes" /> {circuit.turns} curvas</span>}
                  {circuit.drsZones && <span className="flex items-center gap-1 text-grid-text-secondary"><Zap size={12} className="text-team-mercedes" /> {circuit.drsZones} DRS</span>}
                  {circuit.type && <span className="flex items-center gap-1 text-grid-text-secondary"><MapPin size={12} className="text-team-mercedes" /> {circuit.type === "street" ? "Callejero" : "Permanente"}</span>}
                  {circuit.numberOfLaps && <span className="flex items-center gap-1 text-grid-text-secondary">{circuit.numberOfLaps} vueltas</span>}
                  {circuit.lapRecordTime && <span className="flex items-center gap-1 text-grid-text-secondary" style={{ fontFamily: "var(--font-mono)" }}>Récord: {circuit.lapRecordTime}</span>}
                </div>
              </div>
            </div>

            {/* Race result if completed */}
            {result && (
              <div className="mt-6 pt-6 border-t border-white/[0.04]">
                <CircuitRaceResult result={result} />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
