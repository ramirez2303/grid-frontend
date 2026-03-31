"use client";

import { useRef, useEffect } from "react";

import type { ElevationPoint } from "@/types/replay";

interface ElevationProfileProps {
  points: ElevationPoint[];
  progress: number;
}

export function ElevationProfile({ points, progress }: ElevationProfileProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || points.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;
    const padL = 40;
    const padT = 20;
    const padB = 14;
    const cW = w - padL;
    const cH = h - padT - padB;

    const maxDist = points[points.length - 1]?.distance ?? 1;
    const alts = points.map((p) => p.altitude);
    const minAlt = Math.min(...alts);
    const maxAlt = Math.max(...alts);
    const altRange = maxAlt - minAlt || 1;

    ctx.fillStyle = "#0A0A0C";
    ctx.fillRect(0, 0, w, h);

    // Title
    ctx.fillStyle = "#8A8A95";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText("PERFIL DE ELEVACIÓN", padL, 12);

    // Y axis
    ctx.fillStyle = "#55555F";
    ctx.font = "9px monospace";
    ctx.fillText(`${Math.round(maxAlt)}m`, 2, padT + 8);
    ctx.fillText(`${Math.round(minAlt)}m`, 2, h - padB - 2);

    // Area
    ctx.beginPath();
    ctx.moveTo(padL, h - padB);
    for (const p of points) {
      const x = padL + (p.distance / maxDist) * cW;
      const y = padT + cH - ((p.altitude - minAlt) / altRange) * cH;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(padL + cW, h - padB);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, padT, 0, h);
    grad.addColorStop(0, "rgba(39,244,210,0.25)");
    grad.addColorStop(1, "rgba(39,244,210,0.02)");
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.strokeStyle = "rgba(39,244,210,0.6)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const x = padL + (points[i]!.distance / maxDist) * cW;
      const y = padT + cH - ((points[i]!.altitude - minAlt) / altRange) * cH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // S/F markers
    ctx.fillStyle = "#55555F";
    ctx.font = "8px monospace";
    ctx.fillText("S/F", padL, h - 2);
    ctx.fillText("S/F", padL + cW - 14, h - 2);

    // Progress marker
    const mx = padL + progress * cW;
    ctx.strokeStyle = "#FF8000";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mx, padT);
    ctx.lineTo(mx, h - padB);
    ctx.stroke();
  }, [points, progress]);

  return <canvas ref={canvasRef} className="w-full h-24 rounded-lg" style={{ background: "#0A0A0C" }} />;
}
