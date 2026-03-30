"use client";

import Link from "next/link";
import { DriverImage } from "@/components/ui/DriverImage";

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
            <th className="py-3 px-3 text-right hidden sm:table-cell">W</th>
            <th className="py-3 px-3 text-right hidden sm:table-cell">Pod</th>
            <th className="py-3 px-3 text-right hidden lg:table-cell">Pole</th>
            <th className="py-3 px-3 text-right hidden lg:table-cell">FL</th>
            <th className="py-3 px-3 text-right hidden lg:table-cell">DNF</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((d) => (
            <tr
              key={d.driverId}
              className="border-b border-white/[0.04] transition-colors"
              onMouseEnter={(e) => { e.currentTarget.style.background = `${d.teamColor}08`; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
            >
              <td className="py-3 px-3">
                <span className="text-xl font-bold text-grid-text-muted" style={{ fontFamily: "var(--font-display)" }}>
                  {d.position}
                </span>
              </td>
              <td className="py-3 px-3">
                <Link href={`/pilotos/${d.driverId}`} className="flex items-center gap-3 group">
                  <DriverImage driverId={d.driverId} firstName={d.firstName} lastName={d.lastName} teamColor={d.teamColor} size="sm" />
                  <span className="h-8 w-2 rounded-full" style={{ background: d.teamColor }} />
                  <div>
                    <p className="font-medium text-grid-text group-hover:text-white transition-colors">
                      {d.firstName} <span className="font-bold">{d.lastName}</span>
                    </p>
                    <p className="text-xs text-grid-text-muted md:hidden">{d.teamName}</p>
                  </div>
                </Link>
              </td>
              <td className="py-3 px-3 text-grid-text-secondary hidden md:table-cell">{d.teamName}</td>
              <td className="py-3 px-3 text-right">
                <span className="text-base font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>{d.points}</span>
              </td>
              <td className="py-3 px-3 text-right hidden sm:table-cell" style={{ fontFamily: "var(--font-mono)" }}>{d.wins}</td>
              <td className="py-3 px-3 text-right hidden sm:table-cell" style={{ fontFamily: "var(--font-mono)" }}>{d.podiums}</td>
              <td className="py-3 px-3 text-right hidden lg:table-cell" style={{ fontFamily: "var(--font-mono)" }}>{d.poles}</td>
              <td className="py-3 px-3 text-right hidden lg:table-cell text-purple-400" style={{ fontFamily: "var(--font-mono)" }}>{d.fastestLaps}</td>
              <td className="py-3 px-3 text-right hidden lg:table-cell text-red-400" style={{ fontFamily: "var(--font-mono)" }}>{d.dnfs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
