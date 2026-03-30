"use client";

import { motion } from "framer-motion";
import { DriverImage } from "@/components/ui/DriverImage";
import { TeamBadge } from "@/components/ui/TeamBadge";

import type { CalendarRace, DriverStanding, ConstructorStanding } from "@/types/api";

interface ChampionshipHeroProps {
  calendar: CalendarRace[];
  driverLeader: DriverStanding | undefined;
  constructorLeader: ConstructorStanding | undefined;
}

export function ChampionshipHero({ calendar, driverLeader, constructorLeader }: ChampionshipHeroProps) {
  const completed = calendar.filter((r) => r.hasResults).length;
  const total = calendar.length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl sm:text-6xl tracking-wider text-grid-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
        CAMPEONATO 2026
      </h1>
      <p className="text-sm text-grid-text-muted mb-6">Campeonato Mundial de Fórmula 1 FIA</p>

      {/* Season progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-grid-text-muted mb-2">
          <span>{completed} de {total} carreras</span>
          <span>{Math.round(progress)}% completado</span>
        </div>
        <div className="h-1.5 rounded-full bg-grid-card overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-team-mercedes to-team-mclaren"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Leader cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {constructorLeader && (
          <div className="flex items-center gap-4 rounded-xl bg-grid-surface border border-white/[0.06] p-4">
            <TeamBadge teamId={constructorLeader.teamId} teamName={constructorLeader.name} size="lg" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-grid-text-muted">Líder Constructores</p>
              <p className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: constructorLeader.color }}>
                {constructorLeader.name}
              </p>
              <p className="text-sm font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>{constructorLeader.points} pts</p>
            </div>
          </div>
        )}
        {driverLeader && (
          <div className="flex items-center gap-4 rounded-xl bg-grid-surface border border-white/[0.06] p-4">
            <DriverImage driverId={driverLeader.driverId} firstName={driverLeader.firstName} lastName={driverLeader.lastName} teamColor={driverLeader.teamColor} size="lg" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-grid-text-muted">Líder Pilotos</p>
              <p className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: driverLeader.teamColor }}>
                {driverLeader.firstName} {driverLeader.lastName}
              </p>
              <p className="text-sm font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>{driverLeader.points} pts</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
