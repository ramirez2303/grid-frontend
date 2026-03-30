"use client";

import { Ruler, CornerDownRight, Zap, MapPin, Timer, Calendar } from "lucide-react";

import type { CircuitDetail } from "@/types/api";

interface CircuitTechnicalProps {
  circuit: CircuitDetail;
}

export function CircuitTechnical({ circuit }: CircuitTechnicalProps) {
  const stats = [
    { icon: Ruler, label: "Longitud", value: circuit.length ? `${circuit.length} km` : "—" },
    { icon: CornerDownRight, label: "Curvas", value: circuit.turns ?? "—" },
    { icon: Zap, label: "Zonas DRS", value: circuit.drsZones ?? "—" },
    { icon: MapPin, label: "Tipo", value: circuit.type === "street" ? "Callejero" : circuit.type === "permanent" ? "Permanente" : circuit.type ?? "—" },
  ];

  const hasLapRecord = circuit.lapRecordTime && circuit.lapRecordDriver;

  return (
    <div>
      <h2 className="text-xl tracking-wider text-grid-text mb-4" style={{ fontFamily: "var(--font-display)" }}>
        DATOS TÉCNICOS
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-grid-surface border border-white/[0.06] p-4 text-center">
            <stat.icon size={18} className="mx-auto mb-2 text-team-mercedes" />
            <p className="text-2xl font-bold text-grid-text" style={{ fontFamily: "var(--font-display)" }}>
              {stat.value}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-grid-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {hasLapRecord && (
        <div className="rounded-xl bg-grid-surface border border-white/[0.06] p-4 flex items-center gap-4">
          <Timer size={18} className="text-purple-400 flex-shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-grid-text-muted">Récord de vuelta</p>
            <p className="text-lg font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>
              {circuit.lapRecordTime}
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm text-grid-text">{circuit.lapRecordDriver}</p>
            <p className="text-xs text-grid-text-muted flex items-center gap-1 justify-end">
              <Calendar size={10} /> {circuit.lapRecordYear}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
