"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
        className="group relative flex flex-col overflow-hidden rounded-xl bg-grid-surface border border-white/[0.06] hover:border-white/10 transition-all"
      >
        {/* Top color bar */}
        <div className="h-1.5" style={{ background: team.color }} />

        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-lg font-bold text-grid-text group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                {team.name}
              </p>
              <p className="text-xs text-grid-text-muted">{team.engine}</p>
            </div>
            <span className="text-2xl font-bold text-grid-text-muted" style={{ fontFamily: "var(--font-display)" }}>
              P{team.position}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>
              {team.points} <span className="text-xs text-grid-text-muted font-normal">pts</span>
            </span>
            {team.wins > 0 && (
              <span className="text-xs text-grid-text-muted">
                {team.wins} {team.wins === 1 ? "win" : "wins"}
              </span>
            )}
          </div>
        </div>

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
          style={{ background: `radial-gradient(circle at top, ${team.color}, transparent 70%)` }}
        />
      </Link>
    </motion.div>
  );
}
