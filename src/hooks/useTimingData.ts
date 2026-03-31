"use client";

import { useState, useEffect, useRef } from "react";
import { getTimingBoard, getPitStops, getRaceControl, getWeather } from "@/lib/api";

import type { TimingResponse, PitStopEntry, RaceControlMessage, WeatherData } from "@/types/timing";

interface UseTimingDataResult {
  timing: TimingResponse | null;
  pitStops: PitStopEntry[];
  raceControl: RaceControlMessage[];
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export function useTimingData(sessionKey: number | null, pollEnabled: boolean = false, pollInterval: number = 10000): UseTimingDataResult {
  const [timing, setTiming] = useState<TimingResponse | null>(null);
  const [pitStops, setPitStops] = useState<PitStopEntry[]>([]);
  const [raceControl, setRaceControl] = useState<RaceControlMessage[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Reset state when session changes
    setTiming(null);
    setPitStops([]);
    setRaceControl([]);
    setWeather(null);
    setError(null);

    if (!sessionKey) { setLoading(false); return; }

    let cancelled = false;

    async function fetchAll(): Promise<void> {
      try {
        const [t, p, rc, w] = await Promise.all([
          getTimingBoard(sessionKey!),
          getPitStops(sessionKey!).catch(() => [] as PitStopEntry[]),
          getRaceControl(sessionKey!).catch(() => [] as RaceControlMessage[]),
          getWeather(sessionKey!).catch(() => null),
        ]);
        if (cancelled) return;
        setTiming(t);
        setPitStops(p);
        setRaceControl(rc);
        setWeather(w);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to fetch timing data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    setLoading(true);
    void fetchAll();

    if (pollEnabled) {
      intervalRef.current = setInterval(() => void fetchAll(), pollInterval);
    }

    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sessionKey, pollEnabled, pollInterval]);

  return { timing, pitStops, raceControl, weather, loading, error };
}
