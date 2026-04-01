"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getTelemetry } from "@/lib/api";
import { drawTelemetryChart } from "@/lib/telemetryChartDraw";
import { DriverImage } from "@/components/ui/DriverImage";

import type { TelemetryData, TimingEntry } from "@/types/timing";

interface TelemetryComparisonProps {
  sessionKey: number;
  entries: TimingEntry[];
  totalLaps: number;
}

export function TelemetryComparison({ sessionKey, entries, totalLaps }: TelemetryComparisonProps) {
  const [d1, setD1] = useState(entries[0]?.driverNumber ?? 0);
  const [d2, setD2] = useState(entries[1]?.driverNumber ?? 0);
  const [lap, setLap] = useState(Math.max(1, totalLaps - 1));
  const [data, setData] = useState<TelemetryData | null>(null);
  const [loading, setLoading] = useState(false);
  const speedRef = useRef<HTMLCanvasElement>(null);
  const throttleRef = useRef<HTMLCanvasElement>(null);
  const brakeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!d1 || !d2 || !lap) return;
    setLoading(true);
    getTelemetry(sessionKey, d1, d2, lap).then(setData).catch(() => setData(null)).finally(() => setLoading(false));
  }, [sessionKey, d1, d2, lap]);

  const draw = useCallback(() => {
    if (!data) return;
    for (const [ref, metric, yMax, label] of [
      [speedRef, "speed", 350, "VELOCIDAD (km/h)"],
      [throttleRef, "throttle", 100, "THROTTLE (%)"],
      [brakeRef, "brake", 100, "FRENO"],
    ] as const) {
      const canvas = ref.current;
      if (!canvas) continue;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      drawTelemetryChart(ctx, rect.width, rect.height, { d1: data.driver1, d2: data.driver2, totalDist: data.totalDistance, metric, yMax, yLabel: label });
    }
  }, [data]);

  useEffect(() => { draw(); }, [draw]);

  return (
    <div className="space-y-4">
      {/* Selectors */}
      <div className="flex flex-wrap items-center gap-3">
        <select value={d1} onChange={(e) => setD1(Number(e.target.value))} className="bg-grid-surface border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-grid-text">
          {entries.map((e) => <option key={e.driverNumber} value={e.driverNumber}>{e.abbreviation}</option>)}
        </select>
        <span className="text-xs text-grid-text-muted">vs</span>
        <select value={d2} onChange={(e) => setD2(Number(e.target.value))} className="bg-grid-surface border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-grid-text">
          {entries.map((e) => <option key={e.driverNumber} value={e.driverNumber}>{e.abbreviation}</option>)}
        </select>
        <select value={lap} onChange={(e) => setLap(Number(e.target.value))} className="bg-grid-surface border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-grid-text">
          {Array.from({ length: totalLaps }, (_, i) => <option key={i + 1} value={i + 1}>Vuelta {i + 1}</option>)}
        </select>
        {data && (
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-1"><span className="h-3 w-3 rounded-full" style={{ background: data.driver1.teamColor }} /><span className="text-xs text-grid-text">{data.driver1.abbreviation}</span></div>
            <div className="flex items-center gap-1"><span className="h-3 w-3 rounded-full" style={{ background: data.driver2.teamColor }} /><span className="text-xs text-grid-text">{data.driver2.abbreviation}</span></div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mclaren" /></div>
      ) : !data ? (
        <p className="text-sm text-grid-text-muted text-center py-8">Seleccioná dos pilotos y una vuelta</p>
      ) : (
        <div className="rounded-xl bg-grid-surface border border-white/[0.06] overflow-hidden">
          <canvas ref={speedRef} className="w-full" style={{ height: 200, background: "#0A0A0C" }} />
          <canvas ref={throttleRef} className="w-full" style={{ height: 80, background: "#0A0A0C" }} />
          <canvas ref={brakeRef} className="w-full" style={{ height: 60, background: "#0A0A0C" }} />
        </div>
      )}
    </div>
  );
}
