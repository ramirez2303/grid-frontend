"use client";

import { Zap } from "lucide-react";

export function DailyFact() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-grid-surface border border-white/[0.06] p-6">
      {/* Left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-team-mclaren to-team-ferrari" />

      {/* Subtle glow */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-team-mclaren/5 rounded-full blur-2xl" />

      <div className="flex items-start gap-3 pl-3 relative">
        <Zap size={18} className="mt-0.5 text-team-mclaren flex-shrink-0" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-team-mclaren mb-2">
            Dato del día
          </p>
          <p className="text-sm text-grid-text leading-relaxed">
            El reglamento 2026 introduce la aerodinámica activa por primera vez en la historia moderna de la F1.
            Los alerones cambian de configuración automáticamente: modo Z (alta carga) en curvas y modo X (baja
            resistencia) en rectas, eliminando la necesidad del DRS tradicional.
          </p>
        </div>
      </div>
    </div>
  );
}
