"use client";

import { useState, useEffect, useCallback } from "react";
import { useApi } from "@/hooks/useApi";
import { useTimingData } from "@/hooks/useTimingData";
import { getMeetings, getSessions } from "@/lib/api";
import { SessionSelector } from "@/components/live/SessionSelector";
import { SessionStatus } from "@/components/live/SessionStatus";
import { TimingBoard } from "@/components/live/TimingBoard";
import { PitStopPanel } from "@/components/live/PitStopPanel";
import { RaceControlPanel } from "@/components/live/RaceControlPanel";
import { WeatherPanel } from "@/components/live/WeatherPanel";
import { StrategyView } from "@/components/live/StrategyView";
import { FutureSessionState } from "@/components/live/FutureSessionState";

import type { SessionInfo } from "@/types/timing";

export default function LivePage() {
  const { data: meetings } = useApi(() => getMeetings(2026));
  const [meetingKey, setMeetingKey] = useState<number | null>(null);
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [sessionKey, setSessionKey] = useState<number | null>(null);

  // Load sessions when meeting changes
  useEffect(() => {
    if (!meetingKey) return;
    getSessions(meetingKey).then(setSessions).catch(() => setSessions([]));
  }, [meetingKey]);

  // Default: last completed meeting's race session (Japan = 1281, race = 11253)
  useEffect(() => {
    if (!meetings || meetings.length === 0) return;
    const now = new Date();
    const completed = meetings.filter((m) => new Date(m.dateStart) < now && !m.name.includes("Testing"));
    const latest = completed[completed.length - 1];
    if (latest) setMeetingKey(latest.meetingKey);
  }, [meetings]);

  useEffect(() => {
    if (sessions.length === 0) return;
    const race = sessions.find((s) => s.type === "Race") ?? sessions[sessions.length - 1];
    if (race) setSessionKey(race.sessionKey);
  }, [sessions]);

  const { timing, pitStops, raceControl, weather, stints, loading } = useTimingData(sessionKey);

  const currentSession = sessions.find((s) => s.sessionKey === sessionKey) ?? null;
  const hasData = timing != null && timing.entries.length > 0;
  const isFutureSession = currentSession ? new Date(currentSession.dateEnd) > new Date() : false;

  const goToLatest = useCallback(() => {
    if (!meetings) return;
    const now = new Date();
    const completed = meetings.filter((m) => new Date(m.dateStart) < now && !m.name.includes("Testing"));
    const latest = completed[completed.length - 1];
    if (latest) setMeetingKey(latest.meetingKey);
  }, [meetings]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-4xl sm:text-6xl tracking-wider text-grid-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
          LIVE TIMING
        </h1>
        <SessionStatus session={currentSession} />
      </div>

      <div className="mb-6">
        <SessionSelector meetings={meetings ?? []} sessions={sessions} selectedMeeting={meetingKey} selectedSession={sessionKey} onMeetingChange={setMeetingKey} onSessionChange={setSessionKey} />
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mclaren" />
        </div>
      ) : !hasData && isFutureSession && currentSession ? (
        <FutureSessionState session={currentSession} onGoToLatest={goToLatest} />
      ) : !hasData ? (
        <div className="flex h-64 flex-col items-center justify-center gap-2">
          <p className="text-lg text-grid-text">Sin datos disponibles</p>
          <p className="text-sm text-grid-text-muted">Los datos de esta sesión aún no están disponibles o hubo un error al cargarlos.</p>
        </div>
      ) : timing ? (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3">
            <TimingBoard data={timing} />
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
