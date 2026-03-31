"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useApi } from "@/hooks/useApi";
import { useTimingData } from "@/hooks/useTimingData";
import { useGapChart } from "@/hooks/useGapChart";
import { getMeetings, getSessions } from "@/lib/api";
import { SessionSelector } from "@/components/live/SessionSelector";
import { SessionStatus } from "@/components/live/SessionStatus";
import { TimingBoard } from "@/components/live/TimingBoard";
import { PitStopPanel } from "@/components/live/PitStopPanel";
import { RaceControlPanel } from "@/components/live/RaceControlPanel";
import { WeatherPanel } from "@/components/live/WeatherPanel";
import { StrategyView } from "@/components/live/StrategyView";
import { FutureSessionState } from "@/components/live/FutureSessionState";
import { GapChart } from "@/components/live/GapChart";

import type { SessionInfo } from "@/types/timing";

const ReplayLayout = dynamic(() => import("@/components/live/ReplayLayout").then((m) => ({ default: m.ReplayLayout })), { ssr: false });

export default function LivePage() {
  const { data: meetings } = useApi(() => getMeetings(2026));
  const [meetingKey, setMeetingKey] = useState<number | null>(null);
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [sessionKey, setSessionKey] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"timing" | "replay">("timing");

  useEffect(() => { if (!meetingKey) return; getSessions(meetingKey).then(setSessions).catch(() => setSessions([])); }, [meetingKey]);
  useEffect(() => { if (!meetings?.length) return; const now = new Date(); const c = meetings.filter((m) => new Date(m.dateStart) < now && !m.name.includes("Testing")); if (c[c.length - 1]) setMeetingKey(c[c.length - 1]!.meetingKey); }, [meetings]);
  useEffect(() => { if (!sessions.length) return; const r = sessions.find((s) => s.type === "Race") ?? sessions[sessions.length - 1]; if (r) setSessionKey(r.sessionKey); }, [sessions]);

  const { timing, pitStops, raceControl, weather, stints, loading } = useTimingData(sessionKey);
  const currentSession = sessions.find((s) => s.sessionKey === sessionKey) ?? null;
  const hasData = timing != null && timing.entries.length > 0;
  const isFutureSession = currentSession ? new Date(currentSession.dateEnd) > new Date() : false;
  const isRace = currentSession?.type === "Race";
  const { data: gapData } = useGapChart(isRace && hasData ? sessionKey : null);

  const goToLatest = useCallback(() => { if (!meetings) return; const now = new Date(); const c = meetings.filter((m) => new Date(m.dateStart) < now && !m.name.includes("Testing")); if (c[c.length - 1]) setMeetingKey(c[c.length - 1]!.meetingKey); }, [meetings]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-4xl sm:text-6xl tracking-wider text-grid-text mb-2" style={{ fontFamily: "var(--font-display)" }}>LIVE TIMING</h1>
        <SessionStatus session={currentSession} />
      </div>

      <div className="mb-4">
        <SessionSelector meetings={meetings ?? []} sessions={sessions} selectedMeeting={meetingKey} selectedSession={sessionKey} onMeetingChange={setMeetingKey} onSessionChange={setSessionKey} />
      </div>

      {/* View mode toggle */}
      <div className="mb-6 flex gap-2">
        <button onClick={() => setViewMode("timing")} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${viewMode === "timing" ? "bg-team-mclaren text-black" : "bg-grid-surface border border-white/[0.06] text-grid-text-muted"}`}>
          Timing Board
        </button>
        <button onClick={() => setViewMode("replay")} disabled={!isRace} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${viewMode === "replay" ? "bg-team-mclaren text-black" : "bg-grid-surface border border-white/[0.06] text-grid-text-muted"} ${!isRace ? "opacity-40 cursor-not-allowed" : ""}`} title={!isRace ? "Solo disponible para carreras" : ""}>
          Race Replay
        </button>
      </div>

      {viewMode === "replay" && sessionKey ? (
        <ReplayLayout sessionKey={sessionKey} />
      ) : loading ? (
        <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mclaren" /></div>
      ) : !hasData && isFutureSession && currentSession ? (
        <FutureSessionState session={currentSession} onGoToLatest={goToLatest} />
      ) : !hasData ? (
        <div className="flex h-64 flex-col items-center justify-center gap-2"><p className="text-lg text-grid-text">Sin datos disponibles</p></div>
      ) : timing ? (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-4">
            <TimingBoard data={timing} />
            {gapData && <GapChart data={gapData} />}
          </div>
          <div className="space-y-4">
            <WeatherPanel weather={weather} />
            <PitStopPanel pitStops={pitStops} />
            <RaceControlPanel messages={raceControl} />
            {stints.length > 0 && <StrategyView stints={stints} totalLaps={timing.totalLaps} />}
          </div>
        </div>
      ) : null}
    </div>
  );
}
