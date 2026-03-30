"use client";

import { MapPin, Timer, Rotate3d, Calendar } from "lucide-react";
import { getCountryFlag } from "@/lib/countryFlags";

import type { CalendarRace } from "@/types/api";

interface NextGPPreviewProps {
  race: CalendarRace | null;
}

interface CircuitStat {
  icon: typeof MapPin;
  label: string;
  value: string;
}

export function NextGPPreview({ race }: NextGPPreviewProps) {
  if (!race) return null;

  const flag = getCountryFlag(race.country);
  const raceDate = new Date(race.date);

  const stats: CircuitStat[] = [
    { icon: Calendar, label: "Fecha", value: raceDate.toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" }) },
    { icon: MapPin, label: "Ciudad", value: `${race.city}, ${race.country}` },
    { icon: Timer, label: "Hora", value: race.time ? new Date(`1970-01-01T${race.time}`).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }) : "TBD" },
    { icon: Rotate3d, label: "Ronda", value: `${race.round} de 22` },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-grid-surface border border-white/[0.06]">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-team-mclaren via-team-ferrari to-team-mercedes" />

      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          {/* Left: Info */}
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-grid-text-muted mb-2">
              Próximo Gran Premio
            </p>
            <h3
              className="text-3xl sm:text-4xl tracking-wider text-grid-text mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {flag} {race.name.replace(" Grand Prix", "")}
            </h3>
            <p className="text-sm text-grid-text-secondary mb-6">{race.circuitName}</p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-start gap-2">
                  <stat.icon size={14} className="mt-0.5 text-grid-text-muted" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-grid-text-muted">{stat.label}</p>
                    <p className="text-sm text-grid-text">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Circuit placeholder */}
          <div className="flex-shrink-0 w-full sm:w-48 h-40 rounded-xl bg-grid-card border border-white/[0.04] flex items-center justify-center">
            <div className="text-center text-grid-text-muted">
              <Rotate3d size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-xs">Trazado SVG</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
