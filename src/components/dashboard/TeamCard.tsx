"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TeamBadge } from "@/components/ui/TeamBadge";

import type { ConstructorStanding } from "@/types/api";

interface TeamCardProps {
  team: ConstructorStanding;
  index: number;
}

export function TeamCard({ team, index }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Link
        href={`/equipos/${team.teamId}`}
        className="group relative flex flex-col overflow-hidden rounded-xl border border-white/[0.06] hover:border-white/10 transition-all"
        style={{ background: `linear-gradient(135deg, ${team.color}10, ${team.color}05, var(--color-grid-surface))` }}
      >
        <div className="h-1.5" style={{ background: team.color }} />

        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <TeamBadge teamId={team.teamId} teamName={team.name} color={team.color} size="md" />
              <div>
                <p className="text-lg font-bold text-grid-text group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  {team.name}
                </p>
                <p className="text-xs text-grid-text-muted">{team.engine}</p>
              </div>
            </div>
            <span className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)", color: `${team.color}80` }}>
              P{team.position}
            </span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>
                {team.points}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-grid-text-muted">puntos</p>
            </div>
            {team.wins > 0 && (
              <div className="text-right">
                <p className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: team.color }}>
                  {team.wins}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-grid-text-muted">
                  {team.wins === 1 ? "victoria" : "victorias"}
                </p>
              </div>
            )}
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
          style={{ background: `radial-gradient(circle at top right, ${team.color}, transparent 70%)` }}
        />
      </Link>
    </motion.div>
  );
}
