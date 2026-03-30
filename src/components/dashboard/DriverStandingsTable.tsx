"use client";

import Link from "next/link";

import type { DriverStanding } from "@/types/api";

interface DriverStandingsTableProps {
  standings: DriverStanding[];
}

export function DriverStandingsTable({ standings }: DriverStandingsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.06] text-xs uppercase tracking-wider text-grid-text-muted">
            <th className="py-3 px-3 text-left w-12">Pos</th>
            <th className="py-3 px-3 text-left">Piloto</th>
            <th className="py-3 px-3 text-left hidden md:table-cell">Equipo</th>
            <th className="py-3 px-3 text-right">Pts</th>
            <th className="py-3 px-3 text-right hidden sm:table-cell">Wins</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((d) => (
            <tr
              key={d.driverId}
              className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
            >
              <td className="py-3 px-3">
                <span className="text-lg font-bold text-grid-text-muted" style={{ fontFamily: "var(--font-display)" }}>
                  {d.position}
                </span>
              </td>
              <td className="py-3 px-3">
                <Link href={`/pilotos/${d.driverId}`} className="flex items-center gap-3 group">
                  <span className="h-8 w-1.5 rounded-full" style={{ background: d.teamColor }} />
                  <div>
                    <p className="font-medium text-grid-text group-hover:text-white transition-colors">
                      {d.firstName} <span className="font-bold">{d.lastName}</span>
                    </p>
                    <p className="text-xs text-grid-text-muted md:hidden">{d.teamName}</p>
                  </div>
                </Link>
              </td>
              <td className="py-3 px-3 text-grid-text-secondary hidden md:table-cell">{d.teamName}</td>
              <td className="py-3 px-3 text-right font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>
                {d.points}
              </td>
              <td className="py-3 px-3 text-right text-grid-text-secondary hidden sm:table-cell" style={{ fontFamily: "var(--font-mono)" }}>
                {d.wins}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
