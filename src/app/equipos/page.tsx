"use client";

import { useApi } from "@/hooks/useApi";
import { getConstructorStandings, getDriverStandings, getCalendar } from "@/lib/api";
import { ChampionshipHero } from "@/components/dashboard/ChampionshipHero";
import { SectionNav } from "@/components/dashboard/SectionNav";
import { ConstructorStandingsTable } from "@/components/dashboard/ConstructorStandingsTable";
import { DriverStandingsTable } from "@/components/dashboard/DriverStandingsTable";
import { TeamGrid } from "@/components/dashboard/TeamGrid";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function EquiposPage() {
  const { data: constructors, loading: cLoading } = useApi(getConstructorStandings);
  const { data: drivers, loading: dLoading } = useApi(getDriverStandings);
  const { data: calendar, loading: calLoading } = useApi(getCalendar);

  const loading = cLoading || dLoading || calLoading;

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <ChampionshipHero
        calendar={calendar ?? []}
        driverLeader={drivers?.[0]}
        constructorLeader={constructors?.[0]}
      />

      <SectionNav />

      {/* Constructores */}
      <section id="constructores" className="pt-8">
        <SectionReveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-1 rounded-full bg-team-mercedes" />
            <h2 className="text-2xl sm:text-3xl tracking-wider text-grid-text" style={{ fontFamily: "var(--font-display)" }}>
              CONSTRUCTORES
            </h2>
          </div>
          <div className="rounded-xl bg-grid-surface border border-white/[0.06] overflow-hidden mb-8">
            {constructors && <ConstructorStandingsTable standings={constructors} />}
          </div>
          {constructors && <TeamGrid standings={constructors} />}
        </SectionReveal>
      </section>

      {/* Separator */}
      <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Pilotos */}
      <section id="pilotos" className="pt-2">
        <SectionReveal delay={0.1}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-1 rounded-full bg-team-ferrari" />
            <h2 className="text-2xl sm:text-3xl tracking-wider text-grid-text" style={{ fontFamily: "var(--font-display)" }}>
              PILOTOS
            </h2>
          </div>
          <div className="rounded-xl bg-grid-surface border border-white/[0.06] overflow-hidden">
            {drivers && <DriverStandingsTable standings={drivers} />}
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
