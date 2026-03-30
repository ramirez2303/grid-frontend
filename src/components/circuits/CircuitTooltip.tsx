"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { ExternalLink } from "lucide-react";

import type { CalendarRace } from "@/types/api";

interface CircuitTooltipProps {
  race: CalendarRace;
}

export function CircuitTooltip({ race }: CircuitTooltipProps) {
  const date = new Date(race.date);

  return (
    <motion.div
      className="rounded-xl bg-grid-card border border-white/[0.08] p-4 shadow-xl max-w-xs"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <CountryFlag country={race.country} size={20} />
        <h3 className="text-sm font-bold text-grid-text">{race.name.replace(" Grand Prix", "")}</h3>
      </div>
      <p className="text-xs text-grid-text-muted mb-1">{race.circuitName}</p>
      <p className="text-xs text-grid-text-muted mb-3" style={{ fontFamily: "var(--font-mono)" }}>
        {date.toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })}
        {race.hasResults ? " — Completada" : " — Próxima"}
      </p>
      <Link
        href={`/circuitos/${race.circuitId}`}
        className="flex items-center gap-1 text-xs font-medium text-team-mclaren hover:text-team-mclaren/80 transition-colors"
      >
        Ver detalle <ExternalLink size={10} />
      </Link>
    </motion.div>
  );
}
