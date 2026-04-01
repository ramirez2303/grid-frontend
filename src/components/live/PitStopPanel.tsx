"use client";

import { COMPOUND_COLORS } from "@/types/timing";
import { ArrowRight } from "lucide-react";

import type { PitStopEntry } from "@/types/timing";

interface PitStopPanelProps {
  pitStops: PitStopEntry[];
}

function TyreDot({ compound }: { compound: string }) {
  const color = COMPOUND_COLORS[compound as keyof typeof COMPOUND_COLORS] ?? "#888";
  return <span className="h-3.5 w-3.5 rounded-full inline-block" style={{ backgroundColor: color, border: "2px solid rgba(255,255,255,0.15)" }} />;
}

export function PitStopPanel({ pitStops }: PitStopPanelProps) {
  if (pitStops.length === 0) return <p className="text-sm text-grid-text-muted">Sin pit stops registrados</p>;

  return (
    <div className="rounded-xl bg-grid-surface border border-white/[0.06] overflow-hidden">
      <div className="px-4 py-2.5 border-b border-white/[0.06]">
        <h3 className="text-xs font-bold uppercase tracking-widest text-grid-text-muted">Pit Stops</h3>
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        <table className="w-full text-sm">
          <tbody>
            {pitStops.map((p, i) => (
              <tr key={`${p.driverNumber}-${p.lap}-${i}`} className="border-b border-white/[0.04]">
                <td className="py-2 px-3">
                  <span className="text-xs font-bold" style={{ fontFamily: "var(--font-mono)" }}>L{p.lap}</span>
                </td>
                <td className="py-2 px-2">
                  <span className="h-5 w-1 rounded-full inline-block mr-1" style={{ background: p.teamColor }} />
                  <span className="text-sm font-bold text-grid-text">{p.abbreviation}</span>
                </td>
                <td className="py-2 px-2 text-right" style={{ fontFamily: "var(--font-mono)" }}>
                  {p.duration != null ? `${p.duration.toFixed(1)}s` : "—"}
                </td>
                <td className="py-2 px-2">
                  <div className="flex items-center gap-1">
                    <TyreDot compound={p.compoundOld} />
                    <ArrowRight size={10} className="text-grid-text-muted" />
                    <TyreDot compound={p.compoundNew} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
