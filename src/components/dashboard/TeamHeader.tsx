"use client";

import { motion } from "framer-motion";
import { MapPin, User, Cog } from "lucide-react";

import type { TeamDetail } from "@/types/api";

interface TeamHeaderProps {
  team: TeamDetail;
  points: number;
  position: number;
}

export function TeamHeader({ team, points, position }: TeamHeaderProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-grid-surface border border-white/[0.06]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-2" style={{ background: team.colorPrimary }} />

      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-[300px] h-[200px] rounded-full blur-[100px] opacity-10"
        style={{ background: team.colorPrimary }}
      />

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-grid-text-muted mb-1">
              P{position} — Constructores
            </p>
            <h1
              className="text-4xl sm:text-5xl tracking-wider mb-1"
              style={{ fontFamily: "var(--font-display)", color: team.colorPrimary }}
            >
              {team.name}
            </h1>
            <p className="text-sm text-grid-text-secondary">{team.fullName}</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-bold text-grid-text" style={{ fontFamily: "var(--font-mono)" }}>
              {points}
            </span>
            <p className="text-xs text-grid-text-muted">puntos</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-6 text-sm text-grid-text-secondary">
          {team.base && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-grid-text-muted" />
              <span>{team.base}</span>
            </div>
          )}
          {team.teamPrincipal && (
            <div className="flex items-center gap-2">
              <User size={14} className="text-grid-text-muted" />
              <span>{team.teamPrincipal}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Cog size={14} className="text-grid-text-muted" />
            <span>Motor {team.engine}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
