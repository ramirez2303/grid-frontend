"use client";

import { CountryFlag } from "@/components/ui/CountryFlag";

import type { MeetingInfo, SessionInfo } from "@/types/timing";

interface SessionSelectorProps {
  meetings: MeetingInfo[];
  sessions: SessionInfo[];
  selectedMeeting: number | null;
  selectedSession: number | null;
  onMeetingChange: (key: number) => void;
  onSessionChange: (key: number) => void;
}

export function SessionSelector({ meetings, sessions, selectedMeeting, selectedSession, onMeetingChange, onSessionChange }: SessionSelectorProps) {
  const gpMeetings = meetings.filter((m) => !m.name.includes("Testing"));

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* GP Selector */}
      <select
        value={selectedMeeting ?? ""}
        onChange={(e) => onMeetingChange(Number(e.target.value))}
        className="bg-grid-surface border border-white/[0.06] rounded-lg px-4 py-2.5 text-sm text-grid-text focus:outline-none focus:border-team-mclaren/50"
      >
        {gpMeetings.map((m) => (
          <option key={m.meetingKey} value={m.meetingKey}>
            {m.name.replace(" Grand Prix", "")} — {m.country}
          </option>
        ))}
      </select>

      {/* Session Chips */}
      <div className="flex gap-2">
        {sessions.map((s) => (
          <button
            key={s.sessionKey}
            onClick={() => onSessionChange(s.sessionKey)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              selectedSession === s.sessionKey
                ? "bg-team-mclaren text-black"
                : "bg-grid-surface border border-white/[0.06] text-grid-text-muted hover:text-grid-text"
            }`}
          >
            {s.name.replace("Practice ", "FP")}
          </button>
        ))}
      </div>
    </div>
  );
}
