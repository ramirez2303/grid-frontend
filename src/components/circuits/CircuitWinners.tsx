"use client";

import { useApi } from "@/hooks/useApi";
import { getCircuitWinners } from "@/lib/api";

interface CircuitWinnersProps {
  circuitId: string;
}

export function CircuitWinners({ circuitId }: CircuitWinnersProps) {
  const { data: winners, loading } = useApi(() => getCircuitWinners(circuitId));

  if (loading) {
    return (
      <div className="flex h-24 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
      </div>
    );
  }

  if (!winners || winners.length === 0) {
    return (
      <div>
        <h2 className="text-xl tracking-wider text-grid-text mb-4" style={{ fontFamily: "var(--font-display)" }}>
          HISTORIAL
        </h2>
        <p className="text-sm text-grid-text-muted">Sin historial previo — primera edición en 2026</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl tracking-wider text-grid-text mb-4" style={{ fontFamily: "var(--font-display)" }}>
        ÚLTIMOS GANADORES
      </h2>
      <div className="overflow-x-auto rounded-xl bg-grid-surface border border-white/[0.06]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] text-xs uppercase tracking-wider text-grid-text-muted">
              <th className="py-3 px-4 text-left">Año</th>
              <th className="py-3 px-4 text-left">Ganador</th>
              <th className="py-3 px-4 text-left">Equipo</th>
              <th className="py-3 px-4 text-right hidden sm:table-cell">Tiempo</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((w) => (
              <tr key={w.year} className="border-b border-white/[0.04]">
                <td className="py-2.5 px-4 font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>
                  {w.year}
                </td>
                <td className="py-2.5 px-4 text-grid-text">{w.driverName}</td>
                <td className="py-2.5 px-4 text-grid-text-secondary">{w.teamName}</td>
                <td className="py-2.5 px-4 text-right text-grid-text-muted hidden sm:table-cell" style={{ fontFamily: "var(--font-mono)" }}>
                  {w.time ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
