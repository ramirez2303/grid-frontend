"use client";

import { motion } from "framer-motion";

import type { RaceResultItem } from "@/types/api";

interface PodiumCardProps {
  result: RaceResultItem;
  index: number;
}

const podiumHeights = ["h-44 sm:h-56", "h-36 sm:h-44", "h-32 sm:h-40"];
const positionLabels = ["1ST", "2ND", "3RD"];
const delays = [0.2, 0.1, 0.3];

export function PodiumCard({ result, index }: PodiumCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delays[index] }}
    >
      {/* Driver info */}
      <div className="mb-3 text-center">
        <span
          className="text-3xl sm:text-4xl font-bold"
          style={{ fontFamily: "var(--font-display)", color: result.teamColor }}
        >
          {result.abbreviation}
        </span>
        <p className="text-xs sm:text-sm text-grid-text-secondary mt-1">
          {result.firstName} {result.lastName}
        </p>
        <p className="text-[10px] text-grid-text-muted">{result.teamName}</p>
      </div>

      {/* Podium bar */}
      <div
        className={`relative w-24 sm:w-32 ${podiumHeights[index]} rounded-t-lg flex flex-col items-center justify-start pt-4`}
        style={{ background: `linear-gradient(to top, ${result.teamColor}20, ${result.teamColor}50)` }}
      >
        <span
          className="text-4xl sm:text-5xl font-bold"
          style={{ fontFamily: "var(--font-display)", color: result.teamColor }}
        >
          {positionLabels[index]}
        </span>
        <span className="text-xs text-grid-text-secondary mt-2" style={{ fontFamily: "var(--font-mono)" }}>
          {result.time}
        </span>
        {result.fastestLap && (
          <span className="mt-2 text-[10px] font-bold text-purple-400 uppercase tracking-wider">
            Fastest Lap
          </span>
        )}
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: result.teamColor }} />
      </div>
    </motion.div>
  );
}
