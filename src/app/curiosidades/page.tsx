"use client";

import { DailyFactHero } from "@/components/trivia/DailyFactHero";
import { RecordsGrid } from "@/components/trivia/RecordsGrid";
import { TriviaGame } from "@/components/trivia/TriviaGame";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function CuriosidadesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-12">
      <div>
        <h1 className="text-4xl sm:text-6xl tracking-wider text-grid-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
          CURIOSIDADES
        </h1>
        <p className="text-sm text-grid-text-muted">Récords históricos, datos curiosos y trivia de Formula 1</p>
      </div>

      <DailyFactHero />

      <SectionReveal>
        <RecordsGrid />
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <TriviaGame />
      </SectionReveal>
    </div>
  );
}
