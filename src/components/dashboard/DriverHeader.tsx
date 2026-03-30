"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CountryFlag } from "@/components/ui/CountryFlag";

import type { DriverDetail, DriverStanding } from "@/types/api";

interface DriverHeaderProps {
  driver: DriverDetail;
  standing: DriverStanding | undefined;
}

export function DriverHeader({ driver, standing }: DriverHeaderProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-grid-surface border border-white/[0.06]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-2" style={{ background: driver.team.colorPrimary }} />

      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-[300px] h-[200px] rounded-full blur-[100px] opacity-10"
        style={{ background: driver.team.colorPrimary }}
      />

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            {standing && (
              <p className="text-xs font-bold uppercase tracking-widest text-grid-text-muted mb-1">
                P{standing.position} — Campeonato de Pilotos
              </p>
            )}
            <div className="flex items-center gap-3 mb-1">
              <CountryFlag country={driver.nationality} size={24} />
              <h1
                className="text-4xl sm:text-5xl tracking-wider"
                style={{ fontFamily: "var(--font-display)", color: driver.team.colorPrimary }}
              >
                {driver.firstName} {driver.lastName}
              </h1>
            </div>
            <div className="flex items-center gap-3 text-sm text-grid-text-secondary">
              <span className="font-bold" style={{ fontFamily: "var(--font-mono)" }}>#{driver.number}</span>
              <span>{driver.abbreviation}</span>
              <span>•</span>
              <Link href={`/equipos/${driver.team.id}`} className="hover:text-white transition-colors">
                {driver.team.name}
              </Link>
            </div>
          </div>

          {standing && (
            <div className="text-right">
              <span className="text-4xl font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>
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
