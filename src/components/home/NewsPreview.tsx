"use client";

import { ExternalLink, Newspaper } from "lucide-react";
import { motion } from "framer-motion";

const topicColors: Record<string, string> = {
  Mercedes: "#27F4D2",
  Pilotos: "#8A8A95",
  Cadillac: "#555555",
  "Técnico": "#6692FF",
};

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
        {placeholderNews.map((news, i) => {
          const badgeColor = topicColors[news.topic] ?? "#8A8A95";
          return (
            <motion.div
              key={i}
              className="group relative overflow-hidden rounded-xl bg-grid-surface border border-white/[0.06] hover:border-white/12 hover:shadow-lg hover:shadow-black/20 transition-all cursor-pointer"
              whileHover={{ y: -3 }}
            >
              {/* Image placeholder */}
              <div className="h-28 bg-grid-card flex items-center justify-center border-b border-white/[0.04]">
                <Newspaper size={24} className="text-grid-text-muted opacity-20" />
              </div>

              <div className="p-4">
                <span
                  className="inline-block mb-2 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                  style={{ color: badgeColor, background: `${badgeColor}15` }}
                >
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
              </div>

              {/* Bottom hover accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                style={{ background: badgeColor }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
