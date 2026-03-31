"use client";

import { Thermometer, Droplets, Wind, CloudRain } from "lucide-react";

import type { WeatherData } from "@/types/timing";

interface WeatherPanelProps {
  weather: WeatherData | null;
}

export function WeatherPanel({ weather }: WeatherPanelProps) {
  if (!weather) return null;

  const isRaining = weather.rainfall > 0;

  const stats = [
    { icon: Thermometer, label: "Aire", value: `${weather.airTemperature.toFixed(1)}°C` },
    { icon: Thermometer, label: "Pista", value: `${weather.trackTemperature.toFixed(1)}°C` },
    { icon: Droplets, label: "Humedad", value: `${weather.humidity.toFixed(0)}%` },
    { icon: Wind, label: "Viento", value: `${weather.windSpeed.toFixed(1)} km/h` },
  ];

  return (
    <div className={`rounded-xl border overflow-hidden ${isRaining ? "bg-blue-950/20 border-blue-500/20" : "bg-grid-surface border-white/[0.06]"}`}>
      <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center gap-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-grid-text-muted">Clima</h3>
        {isRaining && <CloudRain size={14} className="text-blue-400" />}
      </div>
      <div className="grid grid-cols-2 gap-3 p-3">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <s.icon size={14} className="text-grid-text-muted" />
            <div>
              <p className="text-[10px] text-grid-text-muted">{s.label}</p>
              <p className="text-sm font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
