"use client";

import { ExternalLink, Newspaper } from "lucide-react";

import type { NewsItem } from "@/types/news";

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
}

const sourceColors: Record<string, string> = {
  "formula1.com": "#E8002D",
  "motorsport.com": "#FF8000",
  "the-race.com": "#27F4D2",
  "autosport.com": "#3671C6",
  "racefans.net": "#229971",
};

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Hace minutos";
  if (hours < 24) return `Hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Hace ${days}d`;
}

export function NewsCard({ news, featured = false }: NewsCardProps) {
  const srcColor = sourceColors[news.source] ?? "#8A8A95";

  return (
    <a
      href={news.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block overflow-hidden rounded-xl bg-grid-surface border border-white/[0.06] hover:border-white/10 hover:shadow-lg transition-all ${featured ? "" : ""}`}
    >
      {/* Image area */}
      {featured && (
        <div className="h-36 bg-grid-card flex items-center justify-center border-b border-white/[0.04]">
          {news.imageUrl ? (
            <img src={news.imageUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <Newspaper size={28} className="text-grid-text-muted opacity-20" />
          )}
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ color: srcColor, background: `${srcColor}15` }}>
            {news.source}
          </span>
          {news.topics.filter((t) => t !== "general").slice(0, 1).map((topic) => (
            <span key={topic} className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.04] text-grid-text-muted">
              {topic}
            </span>
          ))}
        </div>

        <h3 className={`font-medium text-grid-text leading-snug group-hover:text-white transition-colors ${featured ? "text-base mb-2" : "text-sm mb-1"} line-clamp-2`}>
          {news.title}
        </h3>

        {featured && news.summary && (
          <p className="text-xs text-grid-text-muted line-clamp-2 mb-2">{news.summary}</p>
        )}

        <div className="flex items-center justify-between text-xs text-grid-text-muted">
          <span>{timeAgo(news.publishedAt)}</span>
          <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </a>
  );
}
