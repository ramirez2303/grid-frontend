"use client";

import { motion } from "framer-motion";

import type { CalendarRace } from "@/types/api";

interface SeasonTimelineProps {
  calendar: CalendarRace[];
}

export function SeasonTimeline({ calendar }: SeasonTimelineProps) {
  const total = calendar.length;
  const completed = calendar.filter((r) => r.hasResults).length;
  const nextRound = calendar.find((r) => !r.hasResults);

  return (
    <div className="rounded-xl bg-grid-surface border border-white/[0.06] p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-grid-text-muted">Temporada 2026</span>
        <span className="text-xs text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
          {completed}/{total} carreras
        </span>
      </div>

      <div className="relative flex items-center gap-0.5">
        {calendar.map((race, i) => {
          const isCompleted = race.hasResults;
          const isNext = race.round === nextRound?.round;
          return (
            <motion.div
              key={race.round}
              className="flex-1 relative group"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
            >
              <div
                className={`h-2 rounded-sm transition-colors ${
                  isCompleted ? "bg-team-mercedes" : isNext ? "bg-team-mclaren" : "bg-grid-card"
                }`}
              />
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-grid-card border border-white/[0.06] rounded px-2 py-1 text-[10px] text-grid-text whitespace-nowrap">
                  R{race.round} {race.name.replace(" Grand Prix", "")}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {nextRound && (
        <p className="mt-2 text-xs text-grid-text-muted">
          Próxima: <span className="text-grid-text">{nextRound.name}</span>
        </p>
      )}
    </div>
  );
}
