"use client";

import { useApi } from "@/hooks/useApi";
import { getCalendar } from "@/lib/api";
import { Hero } from "@/components/home/Hero";
import { LastRaceResult } from "@/components/home/LastRaceResult";
import { StandingsPreview } from "@/components/home/StandingsPreview";
import { NextGPPreview } from "@/components/home/NextGPPreview";
import { NewsPreview } from "@/components/home/NewsPreview";
import { QuickAccess } from "@/components/home/QuickAccess";
import { SectionReveal } from "@/components/home/SectionReveal";
import { DailyFactHero } from "@/components/trivia/DailyFactHero";

export default function Home() {
  const { data: calendar } = useApi(getCalendar);

  const nextRace = calendar?.find((race) => !race.hasResults) ?? null;

  return (
    <div className="flex flex-col">
      <Hero nextRace={nextRace} />

      <div className="mx-auto w-full max-w-7xl space-y-12 px-6 py-12">
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
          <NewsPreview />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <DailyFactHero />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <QuickAccess />
        </SectionReveal>
      </div>
    </div>
  );
}
