"use client";

import { Flag, AlertTriangle, ShieldAlert, CheckCircle } from "lucide-react";

import type { RaceControlMessage } from "@/types/timing";

interface RaceControlPanelProps {
  messages: RaceControlMessage[];
}

const flagIcons: Record<string, { icon: typeof Flag; color: string }> = {
  GREEN: { icon: CheckCircle, color: "#22C55E" },
  YELLOW: { icon: AlertTriangle, color: "#EAB308" },
  RED: { icon: ShieldAlert, color: "#EF4444" },
  CLEAR: { icon: CheckCircle, color: "#22C55E" },
};

export function RaceControlPanel({ messages }: RaceControlPanelProps) {
  const relevant = messages.filter((m) => m.category === "Flag" || m.category === "SafetyCar" || m.message.includes("SAFETY CAR"));

  if (relevant.length === 0) return <p className="text-sm text-grid-text-muted">Sin mensajes de control</p>;

  return (
    <div className="rounded-xl bg-grid-surface border border-white/[0.06] overflow-hidden">
      <div className="px-4 py-2.5 border-b border-white/[0.06]">
        <h3 className="text-xs font-bold uppercase tracking-widest text-grid-text-muted">Race Control</h3>
      </div>
      <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
        {relevant.slice(-20).reverse().map((m, i) => {
          const flagInfo = m.flag ? flagIcons[m.flag] : undefined;
          const Icon = flagInfo?.icon ?? Flag;
          const color = flagInfo?.color ?? "#8A8A95";
          return (
            <div key={i} className="flex items-start gap-2 px-2 py-1.5 rounded hover:bg-white/[0.02]">
              <Icon size={14} style={{ color }} className="mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-grid-text leading-snug">{m.message}</p>
                {m.lap && <span className="text-[10px] text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>Lap {m.lap}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
