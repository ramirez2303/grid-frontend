"use client";

import { motion } from "framer-motion";
import { teams } from "@/data/teams";

export function TeamColorBar() {
  return (
    <div className="relative w-full h-1 flex overflow-hidden">
      {teams.map((team, i) => (
        <motion.div
          key={team.id}
          className="flex-1 h-full"
          style={{ background: team.color }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.4,
            delay: i * 0.05,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 animate-[shimmer_3s_ease-in-out_infinite]" />
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0; transform: translateX(-100%); }
          50% { opacity: 1; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
