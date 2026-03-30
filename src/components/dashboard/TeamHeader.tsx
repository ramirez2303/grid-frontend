"use client";

import { motion } from "framer-motion";
import { MapPin, User, Cog } from "lucide-react";
import { TeamBadge } from "@/components/ui/TeamBadge";

import type { TeamDetail } from "@/types/api";

interface TeamHeaderProps {
  team: TeamDetail;
  points: number;
  position: number;
}

export function TeamHeader({ team, points, position }: TeamHeaderProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-white/[0.06]"
      style={{ background: `linear-gradient(135deg, ${team.colorPrimary}12, ${team.colorPrimary}06, var(--color-grid-surface))` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-2" style={{ background: team.colorPrimary }} />

      <div className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full blur-[120px] opacity-10" style={{ background: team.colorPrimary }} />

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div className="flex items-start gap-4">
            <TeamBadge teamId={team.id} teamName={team.name} color={team.colorPrimary} size="lg" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-grid-text-muted mb-1">
                P{position} — Constructores 2026
              </p>
              <h1
                className="text-4xl sm:text-5xl tracking-wider mb-1"
                style={{ fontFamily: "var(--font-display)", color: team.colorPrimary }}
              >
                {team.name}
              </h1>
              <p className="text-sm text-grid-text-secondary">{team.fullName}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-5xl font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>{points}</span>
            <p className="text-xs text-grid-text-muted">puntos</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-6 text-sm text-grid-text-secondary">
          {team.base && (
            <div className="flex items-center gap-2">
              <MapPin size={14} style={{ color: team.colorPrimary }} />
              <span>{team.base}</span>
            </div>
          )}
          {team.teamPrincipal && (
            <div className="flex items-center gap-2">
              <User size={14} style={{ color: team.colorPrimary }} />
              <span>{team.teamPrincipal}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Cog size={14} style={{ color: team.colorPrimary }} />
            <span>Motor {team.engine}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
