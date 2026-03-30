"use client";

import { motion } from "framer-motion";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { TrackLayout } from "./TrackLayout";

import type { CircuitDetail, CalendarRace } from "@/types/api";

interface CircuitHeroProps {
  circuit: CircuitDetail;
  race: CalendarRace | undefined;
  winnerColor?: string;
}

export function CircuitHero({ circuit, race, winnerColor }: CircuitHeroProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-grid-surface border border-white/[0.06]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-2 bg-gradient-to-r from-team-mercedes via-team-mclaren to-team-ferrari" />

      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            {race && (
              <p className="text-xs font-bold uppercase tracking-widest text-grid-text-muted mb-2">
                Ronda {race.round} • {race.hasResults ? "Completada" : new Date(race.date).toLocaleDateString("es-AR", { day: "numeric", month: "long" })}
              </p>
            )}
            <div className="flex items-center gap-3 mb-2">
              <CountryFlag country={circuit.country} size={32} />
              <h1 className="text-3xl sm:text-5xl tracking-wider text-grid-text" style={{ fontFamily: "var(--font-display)" }}>
                {race?.name.replace(" Grand Prix", "") ?? circuit.name}
              </h1>
            </div>
            <p className="text-sm text-grid-text-secondary">{circuit.name}</p>
            <p className="text-xs text-grid-text-muted mt-1">{circuit.city}, {circuit.country}</p>
            {circuit.description && (
              <p className="text-sm text-grid-text-secondary mt-3 max-w-xl leading-relaxed">{circuit.description}</p>
            )}
          </div>

          <TrackLayout
            circuitId={circuit.id}
            color={winnerColor ?? "#F0F0F2"}
            className="flex-shrink-0 w-full sm:w-56 h-44 rounded-xl bg-grid-card border border-white/[0.04] p-4"
          />
        </div>
      </div>
    </motion.div>
  );
}
