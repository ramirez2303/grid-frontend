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

  const accTime = useRef(0);
  const lastFrame = useRef(0);
  const rafId = useRef(0);
  const indexRef = useRef(0);
  const playingRef = useRef(false);
  const speedRef = useRef(1);
  const totalRef = useRef(0);

  useEffect(() => {
    if (!sessionKey) { setLoading(false); return; }
    setLoading(true);
    Promise.allSettled([getReplayTrack(sessionKey), getReplayData(sessionKey), getReplayElevation(sessionKey)])
      .then(([t, r, e]) => {
        if (t.status === "fulfilled") setTrack(t.value);
        if (r.status === "fulfilled") { setReplayData(r.value); totalRef.current = r.value.timestamps.length; }
        if (e.status === "fulfilled") setElevation(e.value);
        setError(t.status === "rejected" && r.status === "rejected" ? "Failed to load replay data" : null);
      })
      .finally(() => setLoading(false));
  }, [sessionKey]);

  const animate = useCallback((time: number) => {
    if (!playingRef.current) return;
    const delta = lastFrame.current ? (time - lastFrame.current) : 0;
    lastFrame.current = time;
    accTime.current += delta * speedRef.current;

    const interval = 1000;
    if (accTime.current >= interval) {
      const steps = Math.floor(accTime.current / interval);
      accTime.current -= steps * interval;
      indexRef.current = Math.min(indexRef.current + steps, totalRef.current - 1);
      setCurrentIndex(indexRef.current);
      if (indexRef.current >= totalRef.current - 1) { playingRef.current = false; setIsPlaying(false); return; }
    }
    setFraction(accTime.current / interval);
    rafId.current = requestAnimationFrame(animate);
  }, []);

  const play = useCallback(() => { playingRef.current = true; setIsPlaying(true); lastFrame.current = 0; accTime.current = 0; rafId.current = requestAnimationFrame(animate); }, [animate]);
  const pause = useCallback(() => { playingRef.current = false; setIsPlaying(false); cancelAnimationFrame(rafId.current); }, []);
  const setSpeed = useCallback((s: number) => { speedRef.current = s; setSpeedState(s); }, []);
  const seekTo = useCallback((i: number) => { indexRef.current = i; setCurrentIndex(i); accTime.current = 0; }, []);
  const restart = useCallback(() => { seekTo(0); play(); }, [seekTo, play]);

  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  return { track, replayData, elevation, loading, error, isPlaying, speed, currentIndex, fraction, totalTimestamps: totalRef.current, play, pause, setSpeed, seekTo, restart };
}
