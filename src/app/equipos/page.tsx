"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApi } from "@/hooks/useApi";
import { getConstructorStandings, getDriverStandings } from "@/lib/api";
import { StandingsToggle } from "@/components/dashboard/StandingsToggle";
import { ConstructorStandingsTable } from "@/components/dashboard/ConstructorStandingsTable";
import { DriverStandingsTable } from "@/components/dashboard/DriverStandingsTable";
import { TeamGrid } from "@/components/dashboard/TeamGrid";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function EquiposPage() {
  const [tab, setTab] = useState<"constructors" | "drivers">("constructors");
  const { data: constructors, loading: cLoading } = useApi(getConstructorStandings);
  const { data: drivers, loading: dLoading } = useApi(getDriverStandings);

  const loading = cLoading || dLoading;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl tracking-wider text-grid-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
          STANDINGS 2026
        </h1>
        <p className="text-sm text-grid-text-muted">Campeonato Mundial de Fórmula 1</p>
      </div>

      {/* Toggle */}
      <div className="mb-8 max-w-xs">
        <StandingsToggle active={tab} onChange={setTab} />
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
        </div>
      ) : (
        <>
          {/* Table */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mb-12 rounded-xl bg-grid-surface border border-white/[0.06] overflow-hidden"
            >
              {tab === "constructors" && constructors && (
                <ConstructorStandingsTable standings={constructors} />
              )}
              {tab === "drivers" && drivers && (
                <DriverStandingsTable standings={drivers} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Team cards (only in constructors view) */}
          {tab === "constructors" && constructors && (
            <SectionReveal>
              <h2 className="text-2xl tracking-wider text-grid-text mb-6" style={{ fontFamily: "var(--font-display)" }}>
                EQUIPOS
              </h2>
              <TeamGrid standings={constructors} />
            </SectionReveal>
          )}
        </>
      )}
    </div>
  );
}
