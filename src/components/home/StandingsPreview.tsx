"use client";

import Link from "next/link";
import { useApi } from "@/hooks/useApi";
import { getDriverStandings, getConstructorStandings } from "@/lib/api";
import { DriverImage } from "@/components/ui/DriverImage";
import { TeamBadge } from "@/components/ui/TeamBadge";

export function StandingsPreview() {
  const { data: drivers, loading: driversLoading } = useApi(getDriverStandings);
  const { data: constructors, loading: constructorsLoading } = useApi(getConstructorStandings);

  if (driversLoading || constructorsLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
      </div>
    );
  }

  const topDrivers = drivers?.slice(0, 5) ?? [];
  const topConstructors = constructors?.slice(0, 5) ?? [];
  const maxDriverPts = topDrivers[0]?.points ?? 1;
  const maxTeamPts = topConstructors[0]?.points ?? 1;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 rounded-full bg-team-mercedes" />
          <h2 className="text-2xl sm:text-3xl tracking-wider text-grid-text" style={{ fontFamily: "var(--font-display)" }}>
            STANDINGS
          </h2>
        </div>
        <Link href="/equipos" className="text-sm text-grid-text-muted hover:text-grid-text transition-colors">Ver todos →</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Drivers */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-grid-text-muted mb-3">Pilotos</h3>
          {topDrivers.map((d) => (
            <div
              key={d.driverId}
              className="group flex items-center gap-3 rounded-lg bg-grid-surface border border-white/[0.06] px-4 py-2.5 transition-all hover:border-white/10"
              onMouseEnter={(e) => { e.currentTarget.style.background = `${d.teamColor}08`; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
            >
              <span className="w-6 text-lg font-bold text-grid-text-muted" style={{ fontFamily: "var(--font-display)" }}>{d.position}</span>
              <DriverImage firstName={d.firstName} lastName={d.lastName} teamColor={d.teamColor} size="sm" />
              <span className="w-1 self-stretch rounded-full" style={{ background: d.teamColor }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-grid-text truncate">{d.firstName} {d.lastName}</p>
                <p className="text-xs text-grid-text-muted">{d.teamName}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:block w-14 h-1.5 rounded-full bg-grid-card overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(d.points / maxDriverPts) * 100}%`, background: d.teamColor }} />
                </div>
                <span className="text-sm font-bold text-grid-text tabular-nums w-8 text-right" style={{ fontFamily: "var(--font-mono)" }}>{d.points}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Constructors */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-grid-text-muted mb-3">Constructores</h3>
          {topConstructors.map((c) => (
            <div
              key={c.teamId}
              className="group flex items-center gap-3 rounded-lg bg-grid-surface border border-white/[0.06] px-4 py-2.5 transition-all hover:border-white/10"
              onMouseEnter={(e) => { e.currentTarget.style.background = `${c.color}08`; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}
            >
              <span className="w-6 text-lg font-bold text-grid-text-muted" style={{ fontFamily: "var(--font-display)" }}>{c.position}</span>
              <TeamBadge teamId={c.teamId} teamName={c.name} color={c.color} size="sm" />
              <span className="w-1 self-stretch rounded-full" style={{ background: c.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-grid-text truncate">{c.name}</p>
                <p className="text-xs text-grid-text-muted">{c.engine}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:block w-14 h-1.5 rounded-full bg-grid-card overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(c.points / maxTeamPts) * 100}%`, background: c.color }} />
                </div>
                <span className="text-sm font-bold text-grid-text tabular-nums w-8 text-right" style={{ fontFamily: "var(--font-mono)" }}>{c.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
