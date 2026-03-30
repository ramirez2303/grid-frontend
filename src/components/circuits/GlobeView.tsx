"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GlobeScene } from "./GlobeScene";

import type { CalendarRace, CircuitListItem } from "@/types/api";

interface GlobeViewProps {
  circuits: CircuitListItem[];
  calendar: CalendarRace[];
  selectedId: string | null;
  onSelectCircuit: (circuitId: string) => void;
}

export function GlobeView({ circuits, calendar, selectedId, onSelectCircuit }: GlobeViewProps) {
  const completedIds = new Set(calendar.filter((r) => r.hasResults).map((r) => r.circuitId));

  const points = circuits
    .filter((c) => c.latitude != null && c.longitude != null)
    .map((c) => ({
      id: c.id,
      lat: c.latitude!,
      lng: c.longitude!,
      completed: completedIds.has(c.id),
    }));

  const selected = circuits.find((c) => c.id === selectedId);
  const targetLatLng = selected?.latitude != null && selected?.longitude != null
    ? { lat: selected.latitude, lng: selected.longitude }
    : null;

  return (
    <div className="relative w-full aspect-square max-h-[500px] rounded-2xl bg-grid-surface border border-white/[0.06] overflow-hidden">
      <Suspense fallback={
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-grid-text-muted border-t-team-mercedes" />
        </div>
      }>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 3, 5]} intensity={0.8} />
          <pointLight position={[-5, -3, -5]} intensity={0.3} color="#27F4D2" />
          <GlobeScene
            points={points}
            selectedId={selectedId}
            targetLatLng={targetLatLng}
            onPointClick={onSelectCircuit}
          />
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
        </Canvas>
      </Suspense>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex items-center gap-4 text-[10px] text-grid-text-muted">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-team-mercedes" /> Corrida</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-grid-text-muted" /> Próxima</span>
      </div>
    </div>
  );
}
