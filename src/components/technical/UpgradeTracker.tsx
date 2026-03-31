"use client";

import { Wrench } from "lucide-react";

export function UpgradeTracker() {
  return (
    <div className="rounded-xl bg-grid-surface border border-white/[0.06] p-8 text-center">
      <Wrench size={32} className="mx-auto mb-3 text-grid-text-muted opacity-30" />
      <h3 className="text-lg tracking-wider text-grid-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
        UPGRADE TRACKER
      </h3>
      <p className="text-sm text-grid-text-muted">
        Próximamente — tracker de actualizaciones técnicas por equipo por GP
      </p>
    </div>
  );
}
