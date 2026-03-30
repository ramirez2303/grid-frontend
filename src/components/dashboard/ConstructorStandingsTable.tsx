"use client";

import Link from "next/link";
import { TeamBadge } from "@/components/ui/TeamBadge";

import type { ConstructorStanding } from "@/types/api";

interface ConstructorStandingsTableProps {
  standings: ConstructorStanding[];
}

export function ConstructorStandingsTable({ standings }: ConstructorStandingsTableProps) {
  const maxPts = standings[0]?.points ?? 1;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.06] text-xs uppercase tracking-wider text-grid-text-muted">
            <th className="py-3 px-3 text-left w-12">Pos</th>
            <th className="py-3 px-3 text-left">Equipo</th>
            <th className="py-3 px-3 text-left hidden lg:table-cell w-40">Progreso</th>
            <th className="py-3 px-3 text-right">Pts</th>
            <th className="py-3 px-3 text-right hidden sm:table-cell">Wins</th>
            <th className="py-3 px-3 text-right hidden sm:table-cell">Gap</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, i) => {
            const gap = i === 0 ? "—" : `−${standings[0]!.points - team.points}`;
            const pct = maxPts > 0 ? (team.points / maxPts) * 100 : 0;
            return (
              <tr
                key={team.teamId}
                className="border-b border-white/[0.04] transition-colors"
                onMouseEnter={(e) => { e.currentTarget.style.background = `${team.color}08`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
              >
                <td className="py-3 px-3">
                  <span className="text-xl font-bold text-grid-text-muted" style={{ fontFamily: "var(--font-display)" }}>
                    {team.position}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <Link href={`/equipos/${team.teamId}`} className="flex items-center gap-3 group">
                    <span className="h-8 w-2 rounded-full" style={{ background: team.color }} />
                    <TeamBadge teamId={team.teamId} teamName={team.name} size="sm" />
                    <div>
                      <p className="font-medium text-grid-text group-hover:text-white transition-colors">{team.name}</p>
                      <p className="text-xs text-grid-text-muted">{team.engine}</p>
                    </div>
                  </Link>
                </td>
                <td className="py-3 px-3 hidden lg:table-cell">
                  <div className="h-2 rounded-full bg-grid-card overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: team.color }} />
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <span className="text-base font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>{team.points}</span>
                </td>
                <td className="py-3 px-3 text-right text-grid-text-secondary hidden sm:table-cell" style={{ fontFamily: "var(--font-mono)" }}>
                  {team.wins}
                </td>
                <td className="py-3 px-3 text-right text-grid-text-muted hidden sm:table-cell" style={{ fontFamily: "var(--font-mono)" }}>
                  {gap}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
