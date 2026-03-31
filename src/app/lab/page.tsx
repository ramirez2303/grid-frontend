"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { teams } from "@/data/teams";
import { TeamSelector } from "@/components/lab/TeamSelector";
import { ViewModeToggle } from "@/components/lab/ViewModeToggle";

import type { ViewMode } from "@/components/lab/ViewModeToggle";

const CarViewer = dynamic(
  () => import("@/components/lab/CarViewer").then((m) => ({ default: m.CarViewer })),
  { ssr: false, loading: () => (
    <div className="flex h-[70vh] min-h-[500px] items-center justify-center rounded-2xl bg-grid-surface border border-white/[0.06]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mclaren" />
    </div>
  )},
);

export default function LabPage() {
  const [teamId, setTeamId] = useState("mclaren");
  const [viewMode, setViewMode] = useState<ViewMode>("normal");

  const teamColor = teams.find((t) => t.id === teamId)?.color ?? "#FF8000";

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl sm:text-6xl tracking-wider text-grid-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
          3D LAB
        </h1>
        <p className="text-sm text-grid-text-muted">Explorá el auto de Formula 1 2026</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <TeamSelector selectedTeamId={teamId} onSelect={setTeamId} />
        <ViewModeToggle mode={viewMode} onChange={setViewMode} />
      </div>

      {/* 3D Viewer */}
      <CarViewer teamId={teamId} teamColor={teamColor} viewMode={viewMode} />

      {/* Instructions */}
      <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-grid-text-muted">
        <span>Rotar: click + arrastrar</span>
        <span>Zoom: scroll</span>
        <span>Pan: click derecho + arrastrar</span>
        <span>Puntos naranjas: click para info</span>
      </div>
    </div>
  );
}
