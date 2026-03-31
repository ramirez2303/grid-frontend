import type { GapChartData, DriverGapSeries } from "@/types/timing";

interface DrawState {
  data: GapChartData;
  highlighted: number | null;
  hoveredLap: number | null;
}

const PAD = { left: 50, right: 15, top: 15, bottom: 28 };
const MAX_GAP = 60;

function lapToX(lap: number, total: number, cW: number): number {
  return PAD.left + ((lap - 1) / Math.max(total - 1, 1)) * cW;
}

function gapToY(gap: number, cH: number): number {
  const clamped = Math.min(gap, MAX_GAP);
  return PAD.top + (clamped / MAX_GAP) * cH;
}

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, cW: number, cH: number, totalLaps: number): void {
  ctx.fillStyle = "#0A0A0C";
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(85,85,95,0.2)";
  ctx.lineWidth = 0.5;

  // Y grid lines every 10s
  ctx.fillStyle = "#55555F";
  ctx.font = "9px monospace";
  ctx.textAlign = "right";
  for (let gap = 0; gap <= MAX_GAP; gap += 10) {
    const y = gapToY(gap, cH);
    ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(w - PAD.right, y); ctx.stroke();
    ctx.fillText(`${gap}s`, PAD.left - 5, y + 3);
  }

  // X grid lines every 10 laps
  ctx.textAlign = "center";
  for (let lap = 1; lap <= totalLaps; lap += 10) {
    const x = lapToX(lap, totalLaps, cW);
    ctx.beginPath(); ctx.moveTo(x, PAD.top); ctx.lineTo(x, h - PAD.bottom); ctx.stroke();
    ctx.fillText(`L${lap}`, x, h - PAD.bottom + 14);
  }
}

function drawSCZones(ctx: CanvasRenderingContext2D, laps: number[], totalLaps: number, cW: number, cH: number): void {
  if (laps.length === 0) return;
  ctx.fillStyle = "rgba(234,179,8,0.08)";
  for (const lap of laps) {
    const x = lapToX(lap, totalLaps, cW);
    ctx.fillRect(x - 3, PAD.top, 6, cH);
  }
}

function drawLines(ctx: CanvasRenderingContext2D, drivers: DriverGapSeries[], totalLaps: number, cW: number, cH: number, highlighted: number | null): void {
  for (const driver of drivers) {
    const isHl = highlighted === driver.driverNumber;
    const alpha = highlighted == null ? 0.6 : (isHl ? 1 : 0.1);
    ctx.strokeStyle = driver.teamColor;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = isHl ? 2.5 : 1;
    ctx.beginPath();
    let started = false;
    for (const pt of driver.gaps) {
      const x = lapToX(pt.lap, totalLaps, cW);
      const y = gapToY(pt.gap, cH);
      if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function drawPitMarkers(ctx: CanvasRenderingContext2D, data: GapChartData, cW: number, cH: number): void {
  for (const pit of data.pitStopLaps) {
    const driver = data.drivers.find((d) => d.driverNumber === pit.driverNumber);
    const pt = driver?.gaps.find((g) => g.lap === pit.lap);
    if (!pt) continue;
    const x = lapToX(pt.lap, data.totalLaps, cW);
    const y = gapToY(pt.gap, cH);
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(x, y - 3); ctx.lineTo(x - 2.5, y + 2); ctx.lineTo(x + 2.5, y + 2);
    ctx.closePath(); ctx.fill();
  }
}

function drawHover(ctx: CanvasRenderingContext2D, lap: number, data: GapChartData, cW: number, cH: number, h: number): void {
  const x = lapToX(lap, data.totalLaps, cW);
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x, PAD.top); ctx.lineTo(x, h - PAD.bottom); ctx.stroke();

  const entries = data.drivers
    .map((d) => ({ abbr: d.abbreviation, color: d.teamColor, gap: d.gaps.find((g) => g.lap === lap)?.gap }))
    .filter((e) => e.gap != null)
    .sort((a, b) => a.gap! - b.gap!);

  const tx = Math.min(x + 10, cW + PAD.left - 100);
  const ty = PAD.top + 5;
  ctx.fillStyle = "rgba(10,10,12,0.9)";
  ctx.fillRect(tx, ty, 90, entries.length * 14 + 18);
  ctx.fillStyle = "#8A8A95";
  ctx.font = "bold 9px monospace";
  ctx.textAlign = "left";
  ctx.fillText(`Lap ${lap}`, tx + 5, ty + 12);
  entries.slice(0, 8).forEach((e, i) => {
    ctx.fillStyle = e.color;
    ctx.fillRect(tx + 5, ty + 18 + i * 14, 4, 10);
    ctx.fillStyle = "#F0F0F2";
    ctx.font = "9px monospace";
    ctx.fillText(`${e.abbr} ${e.gap!.toFixed(1)}s`, tx + 14, ty + 26 + i * 14);
  });
}

export function drawGapChart(ctx: CanvasRenderingContext2D, w: number, h: number, state: DrawState): void {
  const cW = w - PAD.left - PAD.right;
  const cH = h - PAD.top - PAD.bottom;
  drawGrid(ctx, w, h, cW, cH, state.data.totalLaps);
  drawSCZones(ctx, state.data.safetyCarLaps, state.data.totalLaps, cW, cH);
  drawLines(ctx, state.data.drivers, state.data.totalLaps, cW, cH, state.highlighted);
  drawPitMarkers(ctx, state.data, cW, cH);
  if (state.hoveredLap != null) drawHover(ctx, state.hoveredLap, state.data, cW, cH, h);
}
