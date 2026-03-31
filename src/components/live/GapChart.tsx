"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { drawGapChart } from "@/lib/gapChartDraw";

import type { GapChartData } from "@/types/timing";

interface GapChartProps {
  data: GapChartData;
}

export function GapChart({ data }: GapChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [hoveredLap, setHoveredLap] = useState<number | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    drawGapChart(ctx, rect.width, rect.height, { data, highlighted, hoveredLap });
  }, [data, highlighted, hoveredLap]);

  useEffect(() => { draw(); }, [draw]);

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>): void {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const padLeft = 50;
    const cW = rect.width - padLeft - 15;
    const lapFrac = (mx - padLeft) / cW;
    const lap = Math.round(lapFrac * (data.totalLaps - 1)) + 1;
    if (lap >= 1 && lap <= data.totalLaps) setHoveredLap(lap);
    else setHoveredLap(null);
  }

  return (
    <div className="rounded-xl bg-grid-surface border border-white/[0.06] overflow-hidden">
      <div className="px-4 py-2.5 border-b border-white/[0.06]">
        <h3 className="text-xs font-bold uppercase tracking-widest text-grid-text-muted">Gap al Líder</h3>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full cursor-crosshair"
        style={{ height: 300, background: "#0A0A0C" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredLap(null)}
      />

      {/* Legend */}
      <div className="px-3 py-2 flex flex-wrap gap-1.5 border-t border-white/[0.06]">
        {data.drivers
          .sort((a, b) => (a.gaps[a.gaps.length - 1]?.gap ?? 999) - (b.gaps[b.gaps.length - 1]?.gap ?? 999))
          .map((d) => (
            <button
              key={d.driverNumber}
              onClick={() => setHighlighted(highlighted === d.driverNumber ? null : d.driverNumber)}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] transition-opacity ${
                highlighted != null && highlighted !== d.driverNumber ? "opacity-30" : "opacity-100"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: d.teamColor }} />
              {d.abbreviation}
            </button>
          ))}
      </div>
    </div>
  );
}
