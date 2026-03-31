"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { getGlossary } from "@/lib/api";

const categoryColors: Record<string, string> = {
  aero: "#27F4D2",
  "power-unit": "#FF8000",
  strategy: "#E8002D",
  tires: "#FFD700",
  safety: "#22C55E",
  race: "#3671C6",
};

export function GlossarySection() {
  const { data: terms, loading } = useApi(getGlossary);
  const [search, setSearch] = useState("");

  const filtered = terms?.filter((t) =>
    t.term.toLowerCase().includes(search.toLowerCase()) ||
    t.definition.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl tracking-wider text-grid-text" style={{ fontFamily: "var(--font-display)" }}>GLOSARIO</h2>
        <div className="relative w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-grid-text-muted" />
          <input
            type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-grid-surface border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-xs text-grid-text placeholder:text-grid-text-muted focus:outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((t) => {
            const catColor = categoryColors[t.category ?? ""] ?? "#8A8A95";
            return (
              <div key={t.id} className="rounded-xl bg-grid-surface border border-white/[0.06] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-bold text-grid-text" style={{ fontFamily: "var(--font-display)" }}>{t.term}</h3>
                  {t.category && (
                    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ color: catColor, background: `${catColor}15` }}>
                      {t.category}
                    </span>
                  )}
                </div>
                <p className="text-xs text-grid-text-secondary leading-relaxed">{t.definition}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
