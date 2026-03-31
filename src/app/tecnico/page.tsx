"use client";

import { TechNews } from "@/components/technical/TechNews";
import { RegulationSection } from "@/components/technical/RegulationSection";
import { GlossarySection } from "@/components/technical/GlossarySection";
import { UpgradeTracker } from "@/components/technical/UpgradeTracker";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function TecnicoPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-12">
      <div>
        <h1 className="text-4xl sm:text-6xl tracking-wider text-grid-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
          TÉCNICO
        </h1>
        <p className="text-sm text-grid-text-muted">Novedades técnicas, reglamento 2026 y glosario</p>
      </div>

      <SectionReveal>
        <TechNews />
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <RegulationSection />
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <GlossarySection />
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <UpgradeTracker />
      </SectionReveal>
    </div>
  );
}
