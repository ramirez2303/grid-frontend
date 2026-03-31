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

    const maxDist = points[points.length - 1]?.distance ?? 1;
    const alts = points.map((p) => p.altitude);
    const minAlt = Math.min(...alts);
    const maxAlt = Math.max(...alts);
    const altRange = maxAlt - minAlt || 1;

    ctx.fillStyle = "#0A0A0C";
    ctx.fillRect(0, 0, w, h);

    ctx.beginPath();
    ctx.moveTo(0, h);
    for (const p of points) {
      const x = (p.distance / maxDist) * w;
      const y = h - ((p.altitude - minAlt) / altRange) * (h - 10) - 5;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "rgba(39,244,210,0.3)");
    grad.addColorStop(1, "rgba(39,244,210,0.02)");
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = "rgba(39,244,210,0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const x = (points[i]!.distance / maxDist) * w;
      const y = h - ((points[i]!.altitude - minAlt) / altRange) * (h - 10) - 5;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    const markerX = progress * w;
    ctx.strokeStyle = "#FF8000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(markerX, 0);
    ctx.lineTo(markerX, h);
    ctx.stroke();
  }, [points, progress]);

  return <canvas ref={canvasRef} className="w-full h-16 rounded-lg" style={{ background: "#0A0A0C" }} />;
}
