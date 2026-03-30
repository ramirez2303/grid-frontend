"use client";

import { CircuitListItem } from "./CircuitListItem";

import type { CalendarRace } from "@/types/api";

interface CircuitListProps {
  calendar: CalendarRace[];
  selectedId: string | null;
  onSelect: (circuitId: string) => void;
}

export function CircuitList({ calendar, selectedId, onSelect }: CircuitListProps) {
  return (
    <div className="rounded-2xl bg-grid-surface border border-white/[0.06] overflow-hidden">
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <h3 className="text-sm font-bold uppercase tracking-widest text-grid-text-muted">
          Calendario 2026
        </h3>
      </div>
      <div className="max-h-[460px] overflow-y-auto p-2 space-y-0.5">
        {calendar.map((race) => (
          <CircuitListItem
            key={race.round}
            race={race}
            isSelected={selectedId === race.circuitId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
