"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const placeholderNews = [
  { title: "Mercedes domina las primeras 3 rondas con el nuevo reglamento 2026", source: "formula1.com", date: "29 Mar 2026", topic: "Mercedes" },
  { title: "Antonelli: el rookie que lidera el campeonato a los 19 años", source: "motorsport.com", date: "29 Mar 2026", topic: "Pilotos" },
  { title: "Cadillac completa su primer mes en F1 con resultados mixtos", source: "the-race.com", date: "28 Mar 2026", topic: "Cadillac" },
  { title: "Aerodinámica activa: cómo funciona el nuevo sistema de alerones", source: "autosport.com", date: "27 Mar 2026", topic: "Técnico" },
];

export function NewsPreview() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-6 w-1 rounded-full bg-team-alpine" />
        <h2 className="text-2xl sm:text-3xl tracking-wider text-grid-text" style={{ fontFamily: "var(--font-display)" }}>
          NOTICIAS
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {placeholderNews.map((news, i) => (
          <motion.div
            key={i}
            className="group relative overflow-hidden rounded-xl bg-grid-surface border border-white/[0.06] p-5 hover:border-white/10 transition-all cursor-pointer"
            whileHover={{ y: -2 }}
          >
            {/* Topic badge */}
            <span className="inline-block mb-3 text-[10px] font-bold uppercase tracking-widest text-team-alpine bg-team-alpine/10 px-2 py-1 rounded">
              {news.topic}
            </span>

            <h3 className="text-sm font-medium text-grid-text leading-snug mb-3 line-clamp-2 group-hover:text-white transition-colors">
              {news.title}
            </h3>

            <div className="flex items-center justify-between text-xs text-grid-text-muted">
              <span>{news.source}</span>
              <div className="flex items-center gap-1">
                <span>{news.date}</span>
                <ExternalLink size={10} />
              </div>
            </div>

            {/* Hover accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-team-alpine scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
