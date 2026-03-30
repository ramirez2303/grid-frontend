"use client";

import { MapPin, Timer, Calendar, Gauge, CornerDownRight, Hash } from "lucide-react";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { TrackLayout } from "@/components/circuits/TrackLayout";

import type { CalendarRace } from "@/types/api";

interface NextGPPreviewProps {
  race: CalendarRace | null;
}

export function NextGPPreview({ race }: NextGPPreviewProps) {
  if (!race) return null;

  const raceDate = new Date(race.date);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-grid-surface border border-white/[0.06]">
      {/* Top gradient — broadcast "coming up" feel */}
      <div className="h-1.5 bg-gradient-to-r from-team-mercedes via-team-mclaren to-team-ferrari" />

      <div className="p-6 sm:p-8">
        {/* Coming up label */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-team-mercedes animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-team-mercedes">
            Coming Up Next
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          {/* Left: Info */}
          <div className="flex-1">
            <h3
              className="text-3xl sm:text-4xl tracking-wider text-grid-text mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <CountryFlag country={race.country} size={28} className="mr-2 align-middle" />{race.name.replace(" Grand Prix", "")}
            </h3>
            <p className="text-sm text-grid-text-secondary mb-6">{race.circuitName}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { icon: Calendar, label: "Fecha", value: raceDate.toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" }) },
                { icon: MapPin, label: "Ciudad", value: `${race.city}` },
                { icon: Timer, label: "Hora", value: race.time ? new Date(`1970-01-01T${race.time}`).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }) : "TBD" },
                { icon: Hash, label: "Ronda", value: `${race.round} / 22` },
                { icon: Gauge, label: "Longitud", value: "5.412 km" },
                { icon: CornerDownRight, label: "Curvas", value: "19" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-start gap-2">
                  <stat.icon size={14} className="mt-0.5 text-grid-text-muted" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-grid-text-muted">{stat.label}</p>
                    <p className="text-sm font-medium text-grid-text">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Track SVG */}
          <TrackLayout
            circuitId={race.circuitId}
            className="flex-shrink-0 w-full sm:w-48 h-44 rounded-xl bg-grid-card border border-white/[0.04] p-4"
          />
        </div>
      </div>
    </div>
  );
}
