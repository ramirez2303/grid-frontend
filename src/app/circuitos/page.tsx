"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useApi } from "@/hooks/useApi";
import { getCalendar, getCircuits } from "@/lib/api";
import { CircuitList } from "@/components/circuits/CircuitList";
import { SeasonTimeline } from "@/components/circuits/SeasonTimeline";
import { SectionReveal } from "@/components/ui/SectionReveal";

const GlobeView = dynamic(
  () => import("@/components/circuits/GlobeView").then((m) => ({ default: m.GlobeView })),
  { ssr: false, loading: () => (
    <div className="flex aspect-square max-h-[500px] items-center justify-center rounded-2xl bg-grid-surface border border-white/[0.06]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
    </div>
  )},
);

export default function CircuitosPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: calendar, loading: calLoading } = useApi(getCalendar);
  const { data: circuits, loading: cirLoading } = useApi(getCircuits);

  const loading = calLoading || cirLoading;

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-6xl tracking-wider text-grid-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
          CIRCUITOS 2026
        </h1>
        <p className="text-sm text-grid-text-muted">22 Grandes Premios alrededor del mundo</p>
      </div>

      {/* Globe + List layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <GlobeView
          circuits={circuits ?? []}
          calendar={calendar ?? []}
          selectedId={selectedId}
          onSelectCircuit={setSelectedId}
        />
        <CircuitList
          calendar={calendar ?? []}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      {/* Timeline */}
      <SectionReveal>
        <SeasonTimeline calendar={calendar ?? []} />
      </SectionReveal>
    </div>
  );
}
