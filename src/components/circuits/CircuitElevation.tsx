"use client";

import { useRef, useEffect, useState } from "react";
import { getCircuitElevation } from "@/lib/api";
import { Mountain } from "lucide-react";

import type { CircuitElevationData } from "@/types/api";

interface CircuitElevationProps {
  circuitId: string;
}

export function CircuitElevation({ circuitId }: CircuitElevationProps) {
  const [data, setData] = useState<CircuitElevationData | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setData(null);
    setUnavailable(false);
    getCircuitElevation(circuitId).then(setData).catch(() => setUnavailable(true));
  }, [circuitId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;
    const padL = 45;
    const padT = 22;
    const padB = 12;

    const maxDist = data.points[data.points.length - 1]?.distance ?? 1;
    const range = data.maxAltitude - data.minAltitude || 1;
    const cW = w - padL;
    const cH = h - padT - padB;

    ctx.fillStyle = "#111115";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "#8A8A95";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText("PERFIL DE ELEVACIÓN", padL, 14);
    ctx.fillStyle = "#55555F";
    ctx.font = "9px monospace";
    ctx.textAlign = "right";
    ctx.fillText(`${Math.round(data.maxAltitude)}m`, padL - 4, padT + 8);
    ctx.fillText(`${Math.round(data.minAltitude)}m`, padL - 4, h - padB);
    ctx.textAlign = "left";
    ctx.fillText(`↑${data.totalClimb}m`, w - 60, 14);

    ctx.beginPath();
    ctx.moveTo(padL, h - padB);
    for (const p of data.points) {
      ctx.lineTo(padL + (p.distance / maxDist) * cW, padT + cH - ((p.altitude - data.minAltitude) / range) * cH);
    }
    ctx.lineTo(padL + cW, h - padB);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, padT, 0, h);
    grad.addColorStop(0, "rgba(39,244,210,0.2)");
    grad.addColorStop(1, "rgba(39,244,210,0.02)");
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = "rgba(39,244,210,0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < data.points.length; i++) {
      const x = padL + (data.points[i]!.distance / maxDist) * cW;
      const y = padT + cH - ((data.points[i]!.altitude - data.minAltitude) / range) * cH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }, [data]);

  if (unavailable) {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-grid-surface border border-white/[0.06] p-4 text-grid-text-muted">
        <Mountain size={18} className="opacity-30" />
        <span className="text-xs">Perfil de elevación — disponible después de la carrera</span>
      </div>
    );
  }

  if (!data) return null;

  return <canvas ref={canvasRef} className="w-full h-28 rounded-xl" style={{ background: "#111115" }} />;
}
