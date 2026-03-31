"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useApi } from "@/hooks/useApi";
import { getCalendar, getCircuits } from "@/lib/api";
import { CircuitList } from "@/components/circuits/CircuitList";
import { CircuitDetailPanel } from "@/components/circuits/CircuitDetailPanel";

const GlobeView = dynamic(
  () => import("@/components/circuits/GlobeView").then((m) => ({ default: m.GlobeView })),
  { ssr: false, loading: () => (
    <div className="flex h-[800px] items-center justify-center rounded-2xl bg-grid-surface border border-white/[0.06]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
    </div>
  )},
);

export default function CircuitosPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: calendar, loading: calLoading } = useApi(getCalendar);
  const { data: circuits, loading: cirLoading } = useApi(getCircuits);

  const loading = calLoading || cirLoading;
  const selectedRace = calendar?.find((r) => r.circuitId === selectedId) ?? null;

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl sm:text-6xl tracking-wider text-grid-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
          CIRCUITOS 2026
        </h1>
        <p className="text-sm text-grid-text-muted">22 Grandes Premios alrededor del mundo</p>
      </div>

      {/* Globe 60% + List 40% */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-3">
          <GlobeView
            circuits={circuits ?? []}
            calendar={calendar ?? []}
            selectedId={selectedId}
            onSelectCircuit={setSelectedId}
          />
        </div>
        <div className="lg:col-span-2">
          <CircuitList calendar={calendar ?? []} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      </div>

      <div id="circuit-detail">
        <CircuitDetailPanel race={selectedRace} />
      </div>
    </div>
  );
}
