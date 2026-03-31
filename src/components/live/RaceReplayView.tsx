"use client";

import { useRef, useEffect, useCallback } from "react";

import type { TrackOutline, ReplayData, ReplayFrame } from "@/types/replay";

interface RaceReplayViewProps {
  track: TrackOutline;
  replayData: ReplayData;
  currentIndex: number;
  fraction: number;
}

function toCanvas(x: number, y: number, bounds: TrackOutline["bounds"], w: number, h: number, pad: number): [number, number] {
  const scaleX = (w - 2 * pad) / (bounds.maxX - bounds.minX);
  const scaleY = (h - 2 * pad) / (bounds.maxY - bounds.minY);
  const scale = Math.min(scaleX, scaleY);
  const ox = pad + ((w - 2 * pad) - (bounds.maxX - bounds.minX) * scale) / 2;
  const oy = pad + ((h - 2 * pad) - (bounds.maxY - bounds.minY) * scale) / 2;
  return [ox + (x - bounds.minX) * scale, oy + (bounds.maxY - y) * scale];
}

function lerp(a: number, b: number, t: number): number { return a + (b - a) * t; }

export function RaceReplayView({ track, replayData, currentIndex, fraction }: RaceReplayViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackPath = useRef<Path2D | null>(null);

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
    const w = rect.width;
    const h = rect.height;
    const pad = 30;

    ctx.fillStyle = "#0A0A0C";
    ctx.fillRect(0, 0, w, h);

    if (!trackPath.current) {
      const path = new Path2D();
      track.points.forEach((p, i) => {
        const [cx, cy] = toCanvas(p.x, p.y, track.bounds, w, h, pad);
        i === 0 ? path.moveTo(cx, cy) : path.lineTo(cx, cy);
      });
      trackPath.current = path;
    }
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 2;
    ctx.stroke(trackPath.current);

    const ts = replayData.timestamps;
    const curr = ts[currentIndex];
    const next = ts[Math.min(currentIndex + 1, ts.length - 1)];
    const currFrames = curr != null ? replayData.frames[curr] ?? [] : [];
    const nextFrames = next != null ? replayData.frames[next] ?? [] : [];

    for (const driver of replayData.drivers) {
      const cf = currFrames.find((f: ReplayFrame) => f.driverNumber === driver.driverNumber);
      const nf = nextFrames.find((f: ReplayFrame) => f.driverNumber === driver.driverNumber);
      if (!cf) continue;
      const x = nf ? lerp(cf.x, nf.x, fraction) : cf.x;
      const y = nf ? lerp(cf.y, nf.y, fraction) : cf.y;
      const [cx, cy] = toCanvas(x, y, track.bounds, w, h, pad);

      ctx.shadowColor = driver.teamColor;
      ctx.shadowBlur = 8;
      ctx.fillStyle = driver.teamColor;
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = "#fff";
      ctx.font = "9px monospace";
      ctx.fillText(driver.abbreviation, cx + 8, cy + 3);
    }
  }, [track, replayData, currentIndex, fraction]);

  useEffect(() => { trackPath.current = null; }, [track]);

  useEffect(() => {
    const id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, [draw]);

  return <canvas ref={canvasRef} className="w-full h-full rounded-xl" style={{ background: "#0A0A0C" }} />;
}
