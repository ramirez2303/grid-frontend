"use client";

import { useRef, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { getCircuitTrackData } from "@/lib/api";

interface CircuitTrackViewProps {
  circuitId: string;
}

function toCanvas(x: number, y: number, b: { minX: number; maxX: number; minY: number; maxY: number }, w: number, h: number, pad: number): [number, number] {
  const sx = (w - 2 * pad) / (b.maxX - b.minX);
  const sy = (h - 2 * pad) / (b.maxY - b.minY);
  const s = Math.min(sx, sy);
  const ox = pad + ((w - 2 * pad) - (b.maxX - b.minX) * s) / 2;
  const oy = pad + ((h - 2 * pad) - (b.maxY - b.minY) * s) / 2;
  return [ox + (x - b.minX) * s, oy + (b.maxY - y) * s];
}

export function CircuitTrackView({ circuitId }: CircuitTrackViewProps) {
  const { data: track, loading } = useApi(() => getCircuitTrackData(circuitId));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !track) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;
    const pad = 40;

    ctx.fillStyle = "#0A0A0C";
    ctx.fillRect(0, 0, w, h);

    // Track outline
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.beginPath();
    track.trackPoints.forEach((p, i) => {
      const [cx, cy] = toCanvas(p.x, p.y, track.bounds, w, h, pad);
      i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
    });
    ctx.closePath();
    ctx.stroke();

    // Corners
    for (const corner of track.corners) {
      const [cx, cy] = toCanvas(corner.x, corner.y, track.bounds, w, h, pad);
      const hasName = !!corner.name;
      const r = hasName ? 12 : 8;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = hasName ? "rgba(255,128,0,0.85)" : "rgba(85,85,95,0.6)";
      ctx.fill();

      ctx.fillStyle = hasName ? "#000" : "#ccc";
      ctx.font = hasName ? "bold 7px monospace" : "bold 7px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(corner.number), cx, cy);

      if (hasName) {
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.font = "bold 9px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(corner.name!, cx + r + 3, cy + 3);
      }
    }

    // Title
    const namedCount = track.corners.filter((c) => c.name).length;
    ctx.fillStyle = "#8A8A95";
    ctx.font = "bold 10px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(`${track.corners.length} CURVAS${namedCount > 0 ? ` • ${namedCount} con nombre` : ""}`, 8, 8);
  }, [track]);

  if (loading) {
    return <div className="h-64 rounded-xl bg-grid-surface animate-pulse" />;
  }

  if (!track) return null;

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-72 sm:h-80 rounded-xl"
      style={{ background: "#0A0A0C" }}
    />
  );
}
