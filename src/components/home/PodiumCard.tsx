"use client";

import { motion } from "framer-motion";
import { DriverImage } from "@/components/ui/DriverImage";

import type { RaceResultItem } from "@/types/api";

interface PodiumCardProps {
  result: RaceResultItem;
  index: number;
}

const podiumHeights = ["h-48 sm:h-60", "h-36 sm:h-44", "h-32 sm:h-40"];
const positionLabels = ["1ST", "2ND", "3RD"];
const delays = [0.2, 0.1, 0.3];

export function PodiumCard({ result, index }: PodiumCardProps) {
  const isWinner = index === 0;

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delays[index] }}
    >
      {/* Driver photo + info */}
      <div className="mb-3 flex flex-col items-center">
        <DriverImage
          driverId={result.driverId}
          firstName={result.firstName}
          lastName={result.lastName}
          teamColor={result.teamColor}
          size={isWinner ? "lg" : "md"}
          className="mb-2"
        />
        <span
          className="text-2xl sm:text-3xl font-bold"
          style={{ fontFamily: "var(--font-display)", color: result.teamColor }}
        >
          {result.abbreviation}
        </span>
        <p className="text-xs text-grid-text-secondary mt-0.5">{result.firstName} {result.lastName}</p>
        <p className="text-[10px] text-grid-text-muted">{result.teamName}</p>
      </div>

      {/* Podium bar */}
      <div
        className={`relative w-24 sm:w-32 ${podiumHeights[index]} rounded-t-lg flex flex-col items-center justify-start pt-4 border-l border-r border-t border-white/[0.06]`}
        style={{ background: `linear-gradient(to top, ${result.teamColor}15, ${result.teamColor}40)` }}
      >
        {isWinner && (
          <div className="absolute -inset-4 rounded-xl blur-2xl opacity-20 -z-10" style={{ background: result.teamColor }} />
        )}
        <span
          className={`${isWinner ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"} font-bold`}
          style={{ fontFamily: "var(--font-display)", color: result.teamColor }}
        >
          {positionLabels[index]}
        </span>
        <span className="text-xs text-grid-text-secondary mt-2" style={{ fontFamily: "var(--font-mono)" }}>
          {result.time}
        </span>
        {result.fastestLap && (
          <span className="mt-2 text-[10px] font-bold text-purple-400 uppercase tracking-wider">Fastest Lap</span>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 rounded-b-sm" style={{ background: result.teamColor }} />
      </div>
    </motion.div>
  );
}
