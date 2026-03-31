"use client";

import { useState, useEffect } from "react";
import { getNews } from "@/lib/api";
import { NewsCard } from "@/components/news/NewsCard";

import type { NewsItem } from "@/types/news";

export function TechNews() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews({ topic: "tecnico", limit: 6 })
      .then((res) => setItems(res.items))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="text-sm text-grid-text-muted">No hay noticias técnicas disponibles</p>;
  }

  return (
    <div>
      <h2 className="text-2xl tracking-wider text-grid-text mb-4" style={{ fontFamily: "var(--font-display)" }}>
        NOTICIAS TÉCNICAS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((n) => <NewsCard key={n.id} news={n} />)}
      </div>
    </div>
  );
}
