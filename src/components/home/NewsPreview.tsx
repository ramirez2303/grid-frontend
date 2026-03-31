"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getNews } from "@/lib/api";
import { NewsCard } from "@/components/news/NewsCard";

import type { NewsItem } from "@/types/news";

export function NewsPreview() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews({ limit: 4 })
      .then((res) => setItems(res.items))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 rounded-full bg-team-alpine" />
          <h2 className="text-2xl sm:text-3xl tracking-wider text-grid-text" style={{ fontFamily: "var(--font-display)" }}>
            NOTICIAS
          </h2>
        </div>
        <Link href="/noticias" className="text-sm text-grid-text-muted hover:text-grid-text transition-colors">
          Ver todas →
        </Link>
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-alpine" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-grid-text-muted">Las noticias se actualizan periódicamente</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((n) => <NewsCard key={n.id} news={n} featured />)}
        </div>
      )}
    </div>
  );
}
