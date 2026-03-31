"use client";

import { Search } from "lucide-react";

interface NewsFiltersProps {
  source: string;
  topic: string;
  search: string;
  onSourceChange: (source: string) => void;
  onTopicChange: (topic: string) => void;
  onSearchChange: (search: string) => void;
}

const sources = ["", "formula1.com", "motorsport.com", "the-race.com", "autosport.com", "racefans.net"];
const topics = ["", "tecnico", "mclaren", "mercedes", "red-bull", "ferrari", "alpine"];

export function NewsFilters({ source, topic, search, onSourceChange, onTopicChange, onSearchChange }: NewsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-grid-text-muted" />
        <input
          type="text"
          placeholder="Buscar noticias..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-grid-surface border border-white/[0.06] rounded-lg pl-9 pr-4 py-2.5 text-sm text-grid-text placeholder:text-grid-text-muted focus:outline-none focus:border-team-mclaren/50"
        />
      </div>

      <select value={source} onChange={(e) => onSourceChange(e.target.value)} className="bg-grid-surface border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-grid-text focus:outline-none">
        <option value="">Todas las fuentes</option>
        {sources.filter(Boolean).map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      <select value={topic} onChange={(e) => onTopicChange(e.target.value)} className="bg-grid-surface border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-grid-text focus:outline-none">
        <option value="">Todos los temas</option>
        {topics.filter(Boolean).map((t) => <option key={t} value={t}>{t}</option>)}
      </select>
    </div>
  );
}
