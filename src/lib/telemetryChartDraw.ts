import type { TelemetryDriverData } from "@/types/timing";

interface DrawOpts {
  d1: TelemetryDriverData;
  d2: TelemetryDriverData;
  totalDist: number;
  metric: "speed" | "throttle" | "brake" | "gear";
  yMax: number;
  yLabel: string;
}

const PAD = { left: 48, right: 10, top: 12, bottom: 22 };

function distToX(dist: number, totalDist: number, cW: number): number {
  return PAD.left + (dist / totalDist) * cW;
}

function valToY(val: number, yMax: number, cH: number): number {
  return PAD.top + cH - (Math.min(val, yMax) / yMax) * cH;
}

function getValue(pt: { speed: number; throttle: number; brake: number; gear: number }, metric: string): number {
  if (metric === "speed") return pt.speed;
  if (metric === "throttle") return pt.throttle;
  if (metric === "brake") return pt.brake ? 100 : 0;
  if (metric === "gear") return pt.gear;
  return 0;
}

function drawLine(ctx: CanvasRenderingContext2D, pts: TelemetryDriverData["points"], color: string, metric: string, totalDist: number, yMax: number, cW: number, cH: number): void {
  if (pts.length === 0) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = 0; i < pts.length; i++) {
    const x = distToX(pts[i]!.distance, totalDist, cW);
    const y = valToY(getValue(pts[i]!, metric), yMax, cH);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawDelta(ctx: CanvasRenderingContext2D, d1: TelemetryDriverData, d2: TelemetryDriverData, metric: string, totalDist: number, yMax: number, cW: number, cH: number): void {
  if (d1.points.length === 0 || d2.points.length === 0 || metric !== "speed") return;
  // Simplified delta shading at sampled distances
  const step = totalDist / 200;
  for (let dist = 0; dist < totalDist; dist += step) {
    const p1 = d1.points.reduce((prev, curr) => Math.abs(curr.distance - dist) < Math.abs(prev.distance - dist) ? curr : prev);
    const p2 = d2.points.reduce((prev, curr) => Math.abs(curr.distance - dist) < Math.abs(prev.distance - dist) ? curr : prev);
    const x = distToX(dist, totalDist, cW);
    const y1 = valToY(p1.speed, yMax, cH);
    const y2 = valToY(p2.speed, yMax, cH);
    ctx.fillStyle = p1.speed > p2.speed ? `${d1.teamColor}15` : `${d2.teamColor}15`;
    ctx.fillRect(x, Math.min(y1, y2), step / totalDist * cW + 1, Math.abs(y2 - y1));
  }
}

export function drawTelemetryChart(ctx: CanvasRenderingContext2D, w: number, h: number, opts: DrawOpts): void {
  const cW = w - PAD.left - PAD.right;
  const cH = h - PAD.top - PAD.bottom;

  ctx.fillStyle = "#0A0A0C";
  ctx.fillRect(0, 0, w, h);

  // Grid
  ctx.strokeStyle = "rgba(85,85,95,0.15)";
  ctx.lineWidth = 0.5;
  for (let v = 0; v <= opts.yMax; v += opts.yMax / 4) {
    const y = valToY(v, opts.yMax, cH);
    ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(w - PAD.right, y); ctx.stroke();
  }

  // Y labels
  ctx.fillStyle = "#55555F";
  ctx.font = "9px monospace";
  ctx.textAlign = "right";
  ctx.fillText(String(opts.yMax), PAD.left - 4, PAD.top + 8);
  ctx.fillText("0", PAD.left - 4, PAD.top + cH);

  // Title
  ctx.fillStyle = "#8A8A95";
  ctx.font = "bold 9px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(opts.yLabel, PAD.left, 10);

  // Delta shading (speed only)
  drawDelta(ctx, opts.d1, opts.d2, opts.metric, opts.totalDist, opts.yMax, cW, cH);

  // Lines
  drawLine(ctx, opts.d1.points, opts.d1.teamColor, opts.metric, opts.totalDist, opts.yMax, cW, cH);
  drawLine(ctx, opts.d2.points, opts.d2.teamColor, opts.metric, opts.totalDist, opts.yMax, cW, cH);
}
