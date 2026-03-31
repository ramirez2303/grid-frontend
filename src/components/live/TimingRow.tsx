"use client";

import { DriverImage } from "@/components/ui/DriverImage";
import { COMPOUND_COLORS, SECTOR_COLORS } from "@/types/timing";

import type { TimingEntry } from "@/types/timing";

interface TimingRowProps {
  entry: TimingEntry;
}

const posColors: Record<number, string> = { 1: "#FFD700", 2: "#C0C0C0", 3: "#CD7F32" };

export function TimingRow({ entry: e }: TimingRowProps) {
  const posColor = posColors[e.position];
  const compoundColor = COMPOUND_COLORS[e.compound];

  return (
    <tr
      className="border-b border-white/[0.04] transition-colors"
      onMouseEnter={(ev) => { ev.currentTarget.style.background = `${e.teamColor}08`; }}
      onMouseLeave={(ev) => { ev.currentTarget.style.background = ""; }}
    >
      <td className="py-2 px-2 w-10">
        <span className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: posColor ?? "var(--color-grid-text-muted)" }}>
          {e.position}
        </span>
      </td>
      <td className="py-2 px-1"><div className="h-8 w-1.5 rounded-full" style={{ background: e.teamColor }} /></td>
      <td className="py-2 px-2">
        <div className="flex items-center gap-2">
          <DriverImage driverId={e.driverId} firstName="" lastName={e.abbreviation} teamColor={e.teamColor} size="sm" />
          <div>
            <span className="text-sm font-bold text-grid-text">{e.abbreviation}</span>
            <span className="text-xs text-grid-text-muted ml-1" style={{ fontFamily: "var(--font-mono)" }}>#{e.driverNumber}</span>
          </div>
        </div>
      </td>
      <td className="py-2 px-2 text-right text-sm text-grid-text-secondary" style={{ fontFamily: "var(--font-mono)" }}>{e.gapToLeader ?? "—"}</td>
      <td className="py-2 px-2 text-right text-sm text-grid-text-muted hidden md:table-cell" style={{ fontFamily: "var(--font-mono)" }}>{e.gapToAhead ?? "—"}</td>
      <td className="py-2 px-2 text-right text-sm font-bold text-grid-text hidden lg:table-cell" style={{ fontFamily: "var(--font-mono)" }}>{e.bestLapTime ?? "—"}</td>
      <td className="py-2 px-2 text-right text-sm text-grid-text-secondary hidden lg:table-cell" style={{ fontFamily: "var(--font-mono)" }}>{e.lastLapTime ?? "—"}</td>
      {/* Sectors */}
      <td className="py-2 px-1 hidden xl:table-cell"><div className="h-4 w-10 rounded-sm" style={{ background: SECTOR_COLORS[e.sector1.color] }} /></td>
      <td className="py-2 px-1 hidden xl:table-cell"><div className="h-4 w-10 rounded-sm" style={{ background: SECTOR_COLORS[e.sector2.color] }} /></td>
      <td className="py-2 px-1 hidden xl:table-cell"><div className="h-4 w-10 rounded-sm" style={{ background: SECTOR_COLORS[e.sector3.color] }} /></td>
      {/* Tyre */}
      <td className="py-2 px-2">
        <div className="flex items-center gap-1">
          <span className="h-4 w-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: compoundColor }} />
          <span className="text-[10px] text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>{e.tyreAge}L</span>
        </div>
      </td>
      <td className="py-2 px-2 text-center text-xs text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>{e.pitStops}</td>
    </tr>
  );
}
