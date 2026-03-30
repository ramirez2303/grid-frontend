"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DriverImage } from "@/components/ui/DriverImage";

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
        className="group block overflow-hidden rounded-xl border border-white/[0.06] hover:border-white/10 transition-all"
        style={{ background: `linear-gradient(135deg, ${teamColor}08, var(--color-grid-surface))` }}
      >
        <div className="h-1" style={{ background: teamColor }} />
        <div className="p-5">
          <div className="flex items-center gap-4 mb-4">
            <DriverImage driverId={driver.id} firstName={driver.firstName} lastName={driver.lastName} teamColor={teamColor} size="lg" />
            <div className="flex-1">
              <p className="text-xs text-grid-text-muted">{driver.nationality}</p>
              <p className="text-xl font-bold text-grid-text group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                {driver.firstName} {driver.lastName}
              </p>
            </div>
            <span className="text-4xl font-bold opacity-30" style={{ fontFamily: "var(--font-display)", color: teamColor }}>
              {driver.number}
            </span>
          </div>

          {standing && (
            <div className="flex items-center gap-5 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-grid-text-muted">Posición</p>
                <p className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: teamColor }}>P{standing.position}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-grid-text-muted">Puntos</p>
                <p className="text-lg font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>{standing.points}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-grid-text-muted">Victorias</p>
                <p className="text-lg font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>{standing.wins}</p>
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
