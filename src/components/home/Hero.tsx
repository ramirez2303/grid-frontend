"use client";

import { motion } from "framer-motion";
import { getCountryFlag } from "@/lib/countryFlags";
import { CountdownTimer } from "./CountdownTimer";

import type { CalendarRace } from "@/types/api";

interface HeroProps {
  nextRace: CalendarRace | null;
}

export function Hero({ nextRace }: HeroProps) {
  if (!nextRace) {
    return (
      <div className="relative flex min-h-[60vh] items-center justify-center">
        <p className="text-grid-text-muted text-lg">Cargando calendario...</p>
      </div>
    );
  }

  const flag = getCountryFlag(nextRace.country);

  return (
    <div className="relative overflow-hidden min-h-[70vh] flex items-center justify-center">
      {/* Background diagonal lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(135deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)",
        }} />
      </div>

      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-team-mclaren/10 rounded-full blur-[120px]" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* Pre-title */}
        <motion.div
          className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-grid-text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="h-px w-8 bg-grid-text-muted" />
          Próximo Gran Premio
          <span className="h-px w-8 bg-grid-text-muted" />
        </motion.div>

        {/* Race name */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-4xl">{flag}</span>
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl tracking-wider text-grid-text"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {nextRace.name.replace(" Grand Prix", "")}
          </h1>
          <p className="text-base sm:text-lg text-grid-text-secondary">
            {nextRace.circuitName} — {nextRace.city}, {nextRace.country}
          </p>
          <p className="text-sm text-grid-text-muted mt-1">
            Ronda {nextRace.round} • {new Date(nextRace.date).toLocaleDateString("es-AR", {
              weekday: "long", day: "numeric", month: "long",
            })}
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CountdownTimer targetDate={nextRace.date} />
        </motion.div>
      </div>
    </div>
  );
}
