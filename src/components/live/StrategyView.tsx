"use client";

import { COMPOUND_COLORS } from "@/types/timing";

import type { StintData } from "@/types/timing";

interface StrategyViewProps {
  stints: StintData[];
  totalLaps: number;
}

export function StrategyView({ stints, totalLaps }: StrategyViewProps) {
  const drivers = [...new Set(stints.map((s) => s.driverNumber))];

  if (drivers.length === 0) return null;

  return (
    <div className="rounded-xl bg-grid-surface border border-white/[0.06] overflow-hidden">
      <div className="px-4 py-2.5 border-b border-white/[0.06]">
        <h3 className="text-xs font-bold uppercase tracking-widest text-grid-text-muted">Estrategia</h3>
      </div>
      <div className="p-3 space-y-1.5">
        {drivers.map((driverNum) => {
          const driverStints = stints.filter((s) => s.driverNumber === driverNum).sort((a, b) => a.stintNumber - b.stintNumber);
          const driverId = driverStints[0]?.driverId ?? "";
          return (
            <div key={driverNum} className="flex items-center gap-2">
              <span className="text-xs font-bold text-grid-text-muted w-8 text-right" style={{ fontFamily: "var(--font-mono)" }}>
                {driverId.slice(0, 3).toUpperCase() || driverNum}
              </span>
              <div className="flex-1 flex h-5 rounded overflow-hidden">
                {driverStints.map((stint) => {
                  const width = totalLaps > 0 ? ((stint.lapEnd - stint.lapStart + 1) / totalLaps) * 100 : 0;
                  const color = COMPOUND_COLORS[stint.compound] ?? "#888";
                  return (
                    <div
                      key={stint.stintNumber}
                      className="h-full flex items-center justify-center text-[8px] font-bold"
                      style={{ width: `${width}%`, background: `${color}30`, borderRight: "1px solid var(--color-grid-bg)", color }}
                      title={`${stint.compound} L${stint.lapStart}-${stint.lapEnd}`}
                    >
                      {stint.lapEnd - stint.lapStart + 1 > 5 ? stint.compound.slice(0, 1) : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
