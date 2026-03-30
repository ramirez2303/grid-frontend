"use client";

import Link from "next/link";
import { CountryFlag } from "@/components/ui/CountryFlag";

import type { CalendarRace } from "@/types/api";

interface CircuitListItemProps {
  race: CalendarRace;
  isSelected: boolean;
  onSelect: (circuitId: string) => void;
}

export function CircuitListItem({ race, isSelected, onSelect }: CircuitListItemProps) {
  const date = new Date(race.date);
  const dateStr = date.toLocaleDateString("es-AR", { day: "numeric", month: "short" });

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all border ${
        isSelected
          ? "bg-white/[0.04] border-team-mclaren/30"
          : "border-transparent hover:bg-white/[0.02]"
      }`}
      onClick={() => onSelect(race.circuitId)}
    >
      <CountryFlag country={race.country} size={20} />

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isSelected ? "text-grid-text" : "text-grid-text-secondary"}`}>
          {race.name.replace(" Grand Prix", "")}
        </p>
        <p className="text-xs text-grid-text-muted truncate">{race.circuitName}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
          {dateStr}
        </span>
        {race.hasResults ? (
          <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-team-mercedes/20 text-team-mercedes">
            OK
          </span>
        ) : (
          <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-white/[0.06] text-grid-text-muted">
            R{race.round}
          </span>
        )}
      </div>

      <Link
        href={`/circuitos/${race.circuitId}`}
        className="text-xs text-grid-text-muted hover:text-grid-text transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        →
      </Link>
    </div>
  );
}
