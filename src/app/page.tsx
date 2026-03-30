"use client";

import { useApi } from "@/hooks/useApi";
import { getCalendar } from "@/lib/api";
import { Hero } from "@/components/home/Hero";
import { LastRaceResult } from "@/components/home/LastRaceResult";
import { StandingsPreview } from "@/components/home/StandingsPreview";
import { NextGPPreview } from "@/components/home/NextGPPreview";
import { NewsPreview } from "@/components/home/NewsPreview";
import { DailyFact } from "@/components/home/DailyFact";
import { QuickAccess } from "@/components/home/QuickAccess";
import { SectionReveal } from "@/components/home/SectionReveal";

export default function Home() {
  const { data: calendar } = useApi(getCalendar);

  const nextRace = calendar?.find((race) => !race.hasResults) ?? null;

  return (
    <div className="flex flex-col">
      <Hero nextRace={nextRace} />

      <div className="mx-auto w-full max-w-7xl space-y-16 px-6 py-12">
        <SectionReveal>
          <LastRaceResult />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <StandingsPreview />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <NextGPPreview race={nextRace} />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <NewsPreview />
            </div>
            <div className="flex flex-col justify-start">
              <DailyFact />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <QuickAccess />
        </SectionReveal>
      </div>
    </div>
  );
}
