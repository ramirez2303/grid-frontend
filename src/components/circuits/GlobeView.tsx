"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { GlobeScene } from "./GlobeScene";

import type { Topology } from "topojson-specification";
import type { CalendarRace, CircuitListItem } from "@/types/api";

interface GlobeViewProps {
  circuits: CircuitListItem[];
  calendar: CalendarRace[];
  selectedId: string | null;
  onSelectCircuit: (circuitId: string) => void;
}

export function GlobeView({ circuits, calendar, selectedId, onSelectCircuit }: GlobeViewProps) {
  const [topoData, setTopoData] = useState<Topology | null>(null);

  useEffect(() => {
    fetch("/geo/world-110m.json")
      .then((r) => r.json() as Promise<Topology>)
      .then(setTopoData)
      .catch(() => null);
  }, []);

  const completedIds = new Set(calendar.filter((r) => r.hasResults).map((r) => r.circuitId));
  const points = circuits
    .filter((c) => c.latitude != null && c.longitude != null)
    .map((c) => ({ id: c.id, lat: c.latitude!, lng: c.longitude!, completed: completedIds.has(c.id) }));

  const selected = circuits.find((c) => c.id === selectedId);
  const selectedRace = calendar.find((r) => r.circuitId === selectedId);
  const targetLatLng = selected?.latitude != null && selected?.longitude != null
    ? { lat: selected.latitude, lng: selected.longitude } : null;

  return (
    <div className="flex flex-col rounded-2xl bg-grid-surface border border-white/[0.06] overflow-hidden h-[560px]">
      <div className="flex-1 relative">
        <Suspense fallback={
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
          </div>
        }>
          <Canvas camera={{ position: [0, 1, 5], fov: 40 }}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 3, 5]} intensity={0.8} />
            <pointLight position={[-5, -3, -5]} intensity={0.3} color="#27F4D2" />
            <GlobeScene points={points} selectedId={selectedId} targetLatLng={targetLatLng} onPointClick={onSelectCircuit} topoData={topoData} />
          </Canvas>
        </Suspense>

        {/* Legend */}
        <div className="absolute bottom-2 left-3 flex items-center gap-3 text-[10px] text-grid-text-muted">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-team-mercedes" /> Corrida</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-grid-text-secondary" /> Próxima</span>
        </div>
      </div>

      {/* Info bar — selected circuit */}
      {selectedRace ? (
        <div className="flex items-center gap-3 px-4 py-3 border-t border-white/[0.06] bg-grid-card/50 flex-shrink-0">
          <CountryFlag country={selectedRace.country} size={18} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-grid-text truncate">{selectedRace.name.replace(" Grand Prix", "")}</p>
            <p className="text-xs text-grid-text-muted">{selectedRace.circuitName}</p>
          </div>
          <span className="text-xs text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
            {selectedRace.hasResults ? "Completada" : new Date(selectedRace.date).toLocaleDateString("es-AR", { day: "numeric", month: "short" })}
          </span>
          <Link
            href={`/circuitos/${selectedRace.circuitId}`}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-team-mclaren/20 text-team-mclaren hover:bg-team-mclaren/30 transition-colors"
          >
            Ver detalle
          </Link>
        </div>
      ) : (
        <div className="px-4 py-3 border-t border-white/[0.06] flex-shrink-0">
          <p className="text-xs text-grid-text-muted">Hacé click en un punto o seleccioná un circuito de la lista</p>
        </div>
      )}
    </div>
  );
}
