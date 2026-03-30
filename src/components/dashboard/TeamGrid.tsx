"use client";

import { TeamCard } from "./TeamCard";

import type { ConstructorStanding } from "@/types/api";

interface TeamGridProps {
  standings: ConstructorStanding[];
}

export function TeamGrid({ standings }: TeamGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {standings.map((team, i) => (
        <TeamCard key={team.teamId} team={team} index={i} />
      ))}
    </div>
  );
}
