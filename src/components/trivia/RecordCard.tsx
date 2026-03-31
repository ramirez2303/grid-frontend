"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

import type { RecordItem } from "@/types/trivia";

interface RecordCardProps {
  record: RecordItem;
  index: number;
}

const categoryLabels: Record<string, string> = {
  "most-wins-driver": "Más victorias (piloto)",
  "most-poles-driver": "Más poles (piloto)",
  "most-podiums-driver": "Más podios (piloto)",
  "most-championships-driver": "Más campeonatos (piloto)",
  "longest-win-streak": "Mayor racha de victorias",
  "youngest-winner": "Ganador más joven",
  "biggest-comeback": "Mayor remontada",
  "most-wins-constructor": "Más victorias (constructor)",
  "most-championships-constructor": "Más campeonatos (constructor)",
};

export function RecordCard({ record, index }: RecordCardProps) {
  return (
    <motion.div
      className="rounded-xl bg-grid-surface border border-white/[0.06] p-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Trophy size={16} className="text-team-mclaren mb-2" />
      <p className="text-3xl font-bold text-grid-text mb-1" style={{ fontFamily: "var(--font-display)" }}>
        {record.value}
      </p>
      <p className="text-sm font-medium text-grid-text mb-1">{record.holder}</p>
      <p className="text-[10px] uppercase tracking-wider text-grid-text-muted">
        {categoryLabels[record.category] ?? record.category}
      </p>
      {record.detail && <p className="text-xs text-grid-text-muted mt-1">{record.detail}</p>}
    </motion.div>
  );
}
