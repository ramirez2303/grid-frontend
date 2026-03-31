"use client";

import { useState, useEffect } from "react";
import { getNews } from "@/lib/api";
import { NewsCard } from "@/components/news/NewsCard";
import { NewsFilters } from "@/components/news/NewsFilters";

import type { NewsItem } from "@/types/news";

export default function NoticiasPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("");
  const [topic, setTopic] = useState("");
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    setLoading(true);
    setOffset(0);
    getNews({ source: source || undefined, topic: topic || undefined, search: search || undefined, limit, offset: 0 })
      .then((res) => { setItems(res.items); setTotal(res.total); })
      .catch(() => { setItems([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [source, topic, search]);

  function loadMore(): void {
    const newOffset = offset + limit;
    getNews({ source: source || undefined, topic: topic || undefined, search: search || undefined, limit, offset: newOffset })
      .then((res) => { setItems((prev) => [...prev, ...res.items]); setOffset(newOffset); });
  }

  const featured = items.slice(0, 3);
  const rest = items.slice(3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-4xl sm:text-6xl tracking-wider text-grid-text mb-2" style={{ fontFamily: "var(--font-display)" }}>NOTICIAS</h1>
        <p className="text-sm text-grid-text-muted">{total} artículos de F1</p>
      </div>

      <div className="mb-8">
        <NewsFilters source={source} topic={topic} search={search} onSourceChange={setSource} onTopicChange={setTopic} onSearchChange={setSearch} />
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mclaren" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-center text-grid-text-muted py-12">No se encontraron noticias</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {featured.map((n) => <NewsCard key={n.id} news={n} featured />)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rest.map((n) => <NewsCard key={n.id} news={n} />)}
          </div>
          {items.length < total && (
            <div className="mt-8 text-center">
              <button onClick={loadMore} className="px-6 py-2.5 rounded-lg bg-grid-surface border border-white/[0.06] text-sm text-grid-text-secondary hover:text-grid-text transition-colors">
                Cargar más
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
