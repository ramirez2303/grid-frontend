"use client";

import { useState, useEffect } from "react";
import { getGapChart } from "@/lib/api";

import type { GapChartData } from "@/types/timing";

interface UseGapChartResult {
  data: GapChartData | null;
  loading: boolean;
}

export function useGapChart(sessionKey: number | null): UseGapChartResult {
  const [data, setData] = useState<GapChartData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sessionKey) { setData(null); return; }
    let cancelled = false;
    setLoading(true);
    getGapChart(sessionKey)
      .then((r) => { if (!cancelled) setData(r); })
      .catch(() => { if (!cancelled) setData(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [sessionKey]);

  return { data, loading };
}
