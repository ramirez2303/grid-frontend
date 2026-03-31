"use client";

import { teams } from "@/data/teams";

interface TeamSelectorProps {
  selectedTeamId: string;
  onSelect: (teamId: string) => void;
}

export function TeamSelector({ selectedTeamId, onSelect }: TeamSelectorProps) {
  const selectedTeam = teams.find((t) => t.id === selectedTeamId);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => onSelect(team.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border-2 ${
              selectedTeamId === team.id
                ? "text-white"
                : "text-grid-text-muted hover:text-grid-text bg-grid-surface border-white/[0.06]"
            }`}
            style={selectedTeamId === team.id ? { background: `${team.color}30`, borderColor: team.color, color: team.color } : undefined}
          >
            {team.name}
          </button>
        ))}
      </div>
      {selectedTeam && (
        <p className="mt-2 text-xs text-grid-text-muted">
          <span className="font-medium text-grid-text">{selectedTeam.fullName}</span> — Motor {selectedTeam.engine}
        </p>
      )}
    </div>
  );
}
