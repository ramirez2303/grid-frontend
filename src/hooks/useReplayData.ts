"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getReplayTrack, getReplayData, getReplayElevation } from "@/lib/api";

import type { TrackOutline, ReplayData, ElevationProfile } from "@/types/replay";

interface UseReplayResult {
  track: TrackOutline | null;
  replayData: ReplayData | null;
  elevation: ElevationProfile | null;
  loading: boolean;
  error: string | null;
  isPlaying: boolean;
  speed: number;
  currentIndex: number;
  fraction: number;
  lapProgress: number;
  totalTimestamps: number;
  play: () => void;
  pause: () => void;
  setSpeed: (s: number) => void;
  seekTo: (i: number) => void;
  restart: () => void;
}

export function useReplayData(sessionKey: number | null): UseReplayResult {
  const [track, setTrack] = useState<TrackOutline | null>(null);
  const [replayData, setReplayData] = useState<ReplayData | null>(null);
  const [elevation, setElevation] = useState<ElevationProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeedState] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fraction, setFraction] = useState(0);
  const [lapProgress, setLapProgress] = useState(0);

  const accTime = useRef(0);
  const lastFrame = useRef(0);
  const rafId = useRef(0);
  const indexRef = useRef(0);
  const playingRef = useRef(false);
  const speedRef = useRef(1);
  const totalRef = useRef(0);
  const fetchedKeyRef = useRef<number | null>(null);
  const replayRef = useRef<ReplayData | null>(null);

  useEffect(() => {
    if (!sessionKey || fetchedKeyRef.current === sessionKey) { setLoading(false); return; }
    fetchedKeyRef.current = sessionKey;
    setLoading(true);
    Promise.allSettled([getReplayTrack(sessionKey), getReplayData(sessionKey), getReplayElevation(sessionKey)])
      .then(([t, r, e]) => {
        if (t.status === "fulfilled") setTrack(t.value);
        if (r.status === "fulfilled") { setReplayData(r.value); replayRef.current = r.value; totalRef.current = r.value.timestamps.length; }
        if (e.status === "fulfilled") setElevation(e.value);
        setError(t.status === "rejected" && r.status === "rejected" ? "Failed to load replay data" : null);
      })
      .finally(() => setLoading(false));
    return () => { fetchedKeyRef.current = null; };
  }, [sessionKey]);

  const computeLapProgress = useCallback((idx: number) => {
    const rd = replayRef.current;
    if (!rd || !rd.lapTimestamps.length || !rd.timestamps[idx]) return 0;
    const currentTs = rd.timestamps[idx]!;
    const lapMs = rd.lapTimestamps.map((t) => new Date(t).getTime());
    let lapStart = lapMs[0] ?? currentTs;
    let lapEnd = lapMs[1] ?? currentTs + 90000;
    for (let i = 0; i < lapMs.length - 1; i++) {
      if (currentTs >= lapMs[i]! && currentTs < lapMs[i + 1]!) { lapStart = lapMs[i]!; lapEnd = lapMs[i + 1]!; break; }
      if (i === lapMs.length - 2 && currentTs >= lapMs[i + 1]!) { lapStart = lapMs[i + 1]!; lapEnd = lapStart + (lapMs[i + 1]! - lapMs[i]!); }
    }
    const range = lapEnd - lapStart;
    return range > 0 ? ((currentTs - lapStart) % range) / range : 0;
  }, []);

  const animate = useCallback((time: number) => {
    if (!playingRef.current) return;
    const delta = lastFrame.current ? (time - lastFrame.current) : 0;
    lastFrame.current = time;
    accTime.current += delta * speedRef.current;
    if (accTime.current >= 1000) {
      const steps = Math.floor(accTime.current / 1000);
      accTime.current -= steps * 1000;
      indexRef.current = Math.min(indexRef.current + steps, totalRef.current - 1);
      setCurrentIndex(indexRef.current);
      setLapProgress(computeLapProgress(indexRef.current));
      if (indexRef.current >= totalRef.current - 1) { playingRef.current = false; setIsPlaying(false); return; }
    }
    setFraction(accTime.current / 1000);
    rafId.current = requestAnimationFrame(animate);
  }, [computeLapProgress]);

  const play = useCallback(() => { playingRef.current = true; setIsPlaying(true); lastFrame.current = 0; accTime.current = 0; rafId.current = requestAnimationFrame(animate); }, [animate]);
  const pause = useCallback(() => { playingRef.current = false; setIsPlaying(false); cancelAnimationFrame(rafId.current); }, []);
  const setSpeed = useCallback((s: number) => { speedRef.current = s; setSpeedState(s); }, []);
  const seekTo = useCallback((i: number) => { indexRef.current = i; setCurrentIndex(i); accTime.current = 0; setLapProgress(computeLapProgress(i)); }, [computeLapProgress]);
  const restart = useCallback(() => { seekTo(0); play(); }, [seekTo, play]);

  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  return { track, replayData, elevation, loading, error, isPlaying, speed, currentIndex, fraction, lapProgress, totalTimestamps: totalRef.current, play, pause, setSpeed, seekTo, restart };
}
