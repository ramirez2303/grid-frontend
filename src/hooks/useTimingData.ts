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
  const abortRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Abort previous fetches
    abortRef.current?.abort();
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Reset state
    setTiming(null);
    setPitStops([]);
    setRaceControl([]);
    setWeather(null);
    setStints([]);
    setError(null);

    if (!sessionKey) { setLoading(false); return; }

    const controller = new AbortController();
    abortRef.current = controller;

    async function fetchAll(): Promise<void> {
      console.log(`Fetching timing data for session ${sessionKey}`);

      const results = await Promise.allSettled([
        getTimingBoard(sessionKey!),
        getPitStops(sessionKey!),
        getRaceControl(sessionKey!),
        getWeather(sessionKey!),
        getStrategy(sessionKey!),
      ]);

      if (controller.signal.aborted) return;

      const [tResult, pResult, rcResult, wResult, sResult] = results;

      const t = tResult.status === "fulfilled" ? tResult.value : null;
      const p = pResult.status === "fulfilled" ? pResult.value : [];
      const rc = rcResult.status === "fulfilled" ? rcResult.value : [];
      const w = wResult.status === "fulfilled" ? wResult.value : null;
      const s = sResult.status === "fulfilled" ? sResult.value : [];

      console.log(`Timing data loaded: ${t?.entries.length ?? 0} entries, ${p.length} pit stops, ${rc.length} messages, ${s.length} stints`);

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

    return () => {
      controller.abort();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sessionKey, pollEnabled, pollInterval]);

  return { timing, pitStops, raceControl, weather, stints, loading, error };
}
