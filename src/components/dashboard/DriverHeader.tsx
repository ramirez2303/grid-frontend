"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DriverImage } from "@/components/ui/DriverImage";
import { CountryFlag } from "@/components/ui/CountryFlag";

import type { DriverDetail, DriverStanding } from "@/types/api";

interface DriverHeaderProps {
  driver: DriverDetail;
  standing: DriverStanding | undefined;
}

export function DriverHeader({ driver, standing }: DriverHeaderProps) {
  const color = driver.team.colorPrimary;

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-white/[0.06]"
      style={{ background: `linear-gradient(135deg, ${color}10, ${color}05, var(--color-grid-surface))` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-2" style={{ background: color }} />

      {/* Giant number decoration */}
      <div
        className="absolute -right-8 -top-4 text-[180px] font-bold leading-none opacity-[0.04] select-none pointer-events-none"
        style={{ fontFamily: "var(--font-display)", color }}
      >
        {driver.number}
      </div>

      <div className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full blur-[120px] opacity-10" style={{ background: color }} />

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <DriverImage firstName={driver.firstName} lastName={driver.lastName} teamColor={color} size="xl" />

          <div className="flex-1">
            {standing && (
              <p className="text-xs font-bold uppercase tracking-widest text-grid-text-muted mb-1">
                P{standing.position} — Campeonato de Pilotos
              </p>
            )}
            <div className="flex items-center gap-3 mb-1">
              <CountryFlag country={driver.nationality} size={24} />
              <h1 className="text-4xl sm:text-5xl tracking-wider" style={{ fontFamily: "var(--font-display)", color }}>
                {driver.firstName} {driver.lastName}
              </h1>
            </div>
            <div className="flex items-center gap-3 text-sm text-grid-text-secondary">
              <span className="text-lg font-bold" style={{ fontFamily: "var(--font-mono)", color }}>#{driver.number}</span>
              <span>{driver.abbreviation}</span>
              <span>•</span>
              <Link href={`/equipos/${driver.team.id}`} className="hover:text-white transition-colors">
                {driver.team.name}
              </Link>
            </div>
          </div>

          {standing && (
            <div className="text-right">
              <span className="text-5xl font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>
                {standing.points}
              </span>
              <p className="text-xs text-grid-text-muted">puntos</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
