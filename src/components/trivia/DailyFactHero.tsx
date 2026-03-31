"use client";

import { Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useApi } from "@/hooks/useApi";
import { getDailyFact } from "@/lib/api";

export function DailyFactHero() {
  const { data: fact, loading } = useApi(getDailyFact);

  if (loading) {
    return <div className="h-24 rounded-xl bg-grid-surface animate-pulse" />;
  }

  if (!fact) return null;

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-grid-surface border border-white/[0.06] p-6 sm:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-team-mclaren to-team-ferrari" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-team-mclaren/5 rounded-full blur-3xl" />
      <div className="flex items-start gap-4 pl-4">
        <Zap size={24} className="text-team-mclaren flex-shrink-0 mt-1" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-team-mclaren mb-3">Dato del día</p>
          <p className="text-base sm:text-lg text-grid-text leading-relaxed">{fact.content}</p>
        </div>
      </div>
    </motion.div>
  );
}
