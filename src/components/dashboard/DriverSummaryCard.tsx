"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { TeamDriverSummary, DriverStanding } from "@/types/api";

interface DriverSummaryCardProps {
  driver: TeamDriverSummary;
  standing: DriverStanding | undefined;
  teamColor: string;
  index: number;
}

export function DriverSummaryCard({ driver, standing, teamColor, index }: DriverSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
    >
      <Link
        href={`/pilotos/${driver.id}`}
        className="group block overflow-hidden rounded-xl bg-grid-surface border border-white/[0.06] hover:border-white/10 transition-all"
      >
        <div className="h-1" style={{ background: teamColor }} />
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-grid-text-muted">{driver.nationality}</p>
              <p className="text-xl font-bold text-grid-text group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                {driver.firstName} {driver.lastName}
              </p>
            </div>
            <span className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)", color: teamColor }}>
              {driver.number}
            </span>
          </div>

          {standing && (
            <div className="flex items-center gap-4 text-sm">
              <div>
                <p className="text-xs text-grid-text-muted">Posición</p>
                <p className="font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>P{standing.position}</p>
              </div>
              <div>
                <p className="text-xs text-grid-text-muted">Puntos</p>
                <p className="font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>{standing.points}</p>
              </div>
              <div>
                <p className="text-xs text-grid-text-muted">Wins</p>
                <p className="font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>{standing.wins}</p>
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
