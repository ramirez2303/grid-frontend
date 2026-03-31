"use client";

import { Clock, ArrowLeft } from "lucide-react";

import type { SessionInfo } from "@/types/timing";

interface FutureSessionStateProps {
  session: SessionInfo;
  onGoToLatest: () => void;
}

export function FutureSessionState({ session, onGoToLatest }: FutureSessionStateProps) {
  const start = new Date(session.dateStart);

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <Clock size={48} className="text-grid-text-muted opacity-30" />
      <div className="text-center">
        <h2 className="text-2xl tracking-wider text-grid-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
          ESPERANDO DATOS
        </h2>
        <p className="text-sm text-grid-text-secondary">
          {session.name} comienza el{" "}
          <span className="text-grid-text font-medium">
            {start.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })}
          </span>{" "}
          a las{" "}
          <span className="text-grid-text font-medium" style={{ fontFamily: "var(--font-mono)" }}>
            {start.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </p>
      </div>
      <button
        onClick={onGoToLatest}
        className="flex items-center gap-2 text-sm text-team-mclaren hover:text-team-mclaren/80 transition-colors"
      >
        <ArrowLeft size={14} /> Ir a la última sesión disponible
      </button>
    </div>
  );
}
