"use client";

import { useReplayData } from "@/hooks/useReplayData";
import { RaceReplayView } from "./RaceReplayView";
import { ReplayControls } from "./ReplayControls";
import { ReplayMiniStandings } from "./ReplayMiniStandings";
import { ElevationProfile } from "./ElevationProfile";

interface ReplayLayoutProps {
  sessionKey: number;
}

export function ReplayLayout({ sessionKey }: ReplayLayoutProps) {
  const { track, replayData, elevation, loading, error, isPlaying, speed, currentIndex, fraction, lapProgress, totalTimestamps, play, pause, setSpeed, seekTo, restart } = useReplayData(sessionKey);

  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mclaren" />
        <p className="text-sm text-grid-text-muted">Cargando datos de replay...</p>
      </div>
    );
  }

  if (error || !track || !replayData) {
    return <p className="text-center text-grid-text-muted py-12">No hay datos de replay disponibles para esta sesión</p>;
  }

  const ts = replayData.timestamps[currentIndex];
  const currentFrames = ts != null ? replayData.frames[ts] ?? [] : [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        <div className="xl:col-span-3 h-[500px] rounded-xl bg-grid-surface border border-white/[0.06] overflow-hidden">
          <RaceReplayView track={track} replayData={replayData} currentIndex={currentIndex} fraction={fraction} />
        </div>
        <ReplayMiniStandings frames={currentFrames} drivers={replayData.drivers} />
      </div>

      <ReplayControls isPlaying={isPlaying} speed={speed} currentIndex={currentIndex} totalTimestamps={totalTimestamps} onPlay={play} onPause={pause} onSpeedChange={setSpeed} onSeek={seekTo} onRestart={restart} />

      {elevation && <ElevationProfile points={elevation.points} progress={lapProgress} />}
    </div>
  );
}
