"use client";

import { useApi } from "@/hooks/useApi";
import { getRecords } from "@/lib/api";
import { RecordCard } from "./RecordCard";

export function RecordsGrid() {
  const { data: records, loading } = useApi(getRecords);

  if (loading) {
    return <div className="h-48 rounded-xl bg-grid-surface animate-pulse" />;
  }

  if (!records || records.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl tracking-wider text-grid-text mb-6" style={{ fontFamily: "var(--font-display)" }}>
        RÉCORDS HISTÓRICOS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((r, i) => <RecordCard key={r.id} record={r} index={i} />)}
      </div>
    </div>
  );
}
