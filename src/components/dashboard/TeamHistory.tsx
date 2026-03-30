"use client";

import { Trophy, Flag, Calendar, Award } from "lucide-react";

import type { TeamDetail } from "@/types/api";

interface TeamHistoryProps {
  team: TeamDetail;
}

export function TeamHistory({ team }: TeamHistoryProps) {
  const stats = [
    { icon: Trophy, label: "Campeonatos", value: team.championships },
    { icon: Flag, label: "Victorias", value: team.wins },
    { icon: Award, label: "Podios", value: team.podiums },
    { icon: Calendar, label: "Primera temporada", value: team.firstSeason ?? "—" },
  ];

  return (
    <div>
      <h2 className="text-xl tracking-wider text-grid-text mb-4" style={{ fontFamily: "var(--font-display)" }}>
        HISTORIAL
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-grid-surface border border-white/[0.06] p-4 text-center">
            <stat.icon size={18} className="mx-auto mb-2 text-grid-text-muted" />
            <p className="text-2xl font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>
              {stat.value}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-grid-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
