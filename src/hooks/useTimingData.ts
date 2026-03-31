"use client";

import { useState, useEffect, useRef } from "react";
import { getTimingBoard, getPitStops, getRaceControl, getWeather, getStrategy } from "@/lib/api";

import type { TimingResponse, PitStopEntry, RaceControlMessage, WeatherData, StintData } from "@/types/timing";

interface UseTimingDataResult {
  timing: TimingResponse | null;
  pitStops: PitStopEntry[];
  raceControl: RaceControlMessage[];
  weather: WeatherData | null;
  stints: StintData[];
  loading: boolean;
  error: string | null;
}

export function useTimingData(sessionKey: number | null, pollEnabled: boolean = false, pollInterval: number = 10000): UseTimingDataResult {
  const [timing, setTiming] = useState<TimingResponse | null>(null);
  const [pitStops, setPitStops] = useState<PitStopEntry[]>([]);
  const [raceControl, setRaceControl] = useState<RaceControlMessage[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [stints, setStints] = useState<StintData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }

    setTiming(null);
    setPitStops([]);
    setRaceControl([]);
    setWeather(null);
    setStints([]);
    setError(null);

    if (!sessionKey) { setLoading(false); return; }

    let cancelled = false;
    const key = sessionKey;

    async function fetchAll(): Promise<void> {
      console.log(`[useTimingData] Fetching session ${key}...`);

      const results = await Promise.allSettled([
        getTimingBoard(key),
        getPitStops(key),
        getRaceControl(key),
        getWeather(key),
        getStrategy(key),
      ]);

      if (cancelled) { console.log(`[useTimingData] Cancelled for session ${key}`); return; }

      const t = results[0]?.status === "fulfilled" ? results[0].value : null;
      const p = results[1]?.status === "fulfilled" ? results[1].value : [];
      const rc = results[2]?.status === "fulfilled" ? results[2].value : [];
      const w = results[3]?.status === "fulfilled" ? results[3].value : null;
      const s = results[4]?.status === "fulfilled" ? results[4].value : [];

      for (let i = 0; i < results.length; i++) {
        if (results[i]?.status === "rejected") {
          console.error(`[useTimingData] Fetch ${i} failed:`, (results[i] as PromiseRejectedResult).reason);
        }
      }

      console.log(`[useTimingData] Loaded: ${t?.entries?.length ?? 0} entries, ${p.length} pits, ${rc.length} rc, ${s.length} stints`);

      setTiming(t);
      setPitStops(p);
      setRaceControl(rc);
      setWeather(w);
      setStints(s);
      setError(t == null ? "Failed to load timing board" : null);
      setLoading(false);
    }

    setLoading(true);
    void fetchAll();

    if (pollEnabled) {
      intervalRef.current = setInterval(() => void fetchAll(), pollInterval);
    }

    return () => { cancelled = true; if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; } };
  }, [sessionKey, pollEnabled, pollInterval]);

  return { timing, pitStops, raceControl, weather, stints, loading, error };
}
