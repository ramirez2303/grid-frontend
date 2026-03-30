"use client";

import { Trophy, Flag, Calendar, Award } from "lucide-react";

import type { TeamDetail } from "@/types/api";

interface TeamHistoryProps {
  team: TeamDetail;
}

export function TeamHistory({ team }: TeamHistoryProps) {
  const stats = [
    { icon: Trophy, label: "Campeonatos", value: team.championships, color: "#FFD700" },
    { icon: Flag, label: "Victorias", value: team.wins, color: team.colorPrimary },
    { icon: Award, label: "Podios", value: team.podiums, color: "#CD7F32" },
    { icon: Calendar, label: "Primera temporada", value: team.firstSeason ?? "—", color: "#8A8A95" },
  ];

  return (
    <div>
      <h2 className="text-xl tracking-wider text-grid-text mb-4" style={{ fontFamily: "var(--font-display)" }}>
        HISTORIAL
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-grid-surface border border-white/[0.06] p-5 text-center">
            <stat.icon size={20} className="mx-auto mb-3" style={{ color: stat.color }} />
            <p className="text-4xl font-bold text-grid-text" style={{ fontFamily: "var(--font-display)" }}>
              {stat.value}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-grid-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
