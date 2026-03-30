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
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
      </div>
    );
  }

  const flag = getCountryFlag(nextRace.country);

  return (
    <div className="relative overflow-hidden min-h-[70vh] flex items-center justify-center">
      {/* Background diagonal speed lines */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(135deg, #fff 0px, #fff 1px, transparent 1px, transparent 30px)",
        }} />
      </div>

      {/* Teal glow behind title */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-team-mercedes/15 rounded-full blur-[100px]" />
      {/* Secondary warm glow */}
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[200px] bg-team-mclaren/8 rounded-full blur-[80px]" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* Pre-title */}
        <motion.div
          className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-grid-text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-grid-text-muted" />
          Próximo Gran Premio
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-grid-text-muted" />
        </motion.div>

        {/* Race name with glow */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-5xl">{flag}</span>
          <h1
            className="text-4xl sm:text-6xl lg:text-8xl tracking-wider text-grid-text drop-shadow-[0_0_30px_rgba(39,244,210,0.15)]"
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

        {/* Lights out label */}
        <motion.p
          className="text-[11px] font-bold uppercase tracking-[0.5em] text-team-mclaren"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Lights out in
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CountdownTimer targetDate={nextRace.date} />
        </motion.div>
      </div>

      {/* Bottom gradient team-colors bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-team-mclaren via-team-ferrari via-team-mercedes via-team-redbull to-team-alpine opacity-60" />
    </div>
  );
}
