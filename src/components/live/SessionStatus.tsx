"use client";

import type { SessionInfo } from "@/types/timing";

interface SessionStatusProps {
  session: SessionInfo | null;
}

export function SessionStatus({ session }: SessionStatusProps) {
  if (!session) return null;

  const now = new Date();
  const end = new Date(session.dateEnd);
  const start = new Date(session.dateStart);
  const isFinished = now > end;
  const isLive = now >= start && now <= end;

  return (
    <div className="flex items-center gap-3">
      {isLive && (
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-500">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          En vivo
        </span>
      )}
      {isFinished && (
        <span className="text-xs font-bold uppercase tracking-wider text-grid-text-muted">
          Sesión finalizada — {end.toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      )}
      {!isLive && !isFinished && (
        <span className="text-xs font-bold uppercase tracking-wider text-team-mclaren">
          Próxima: {start.toLocaleDateString("es-AR", { weekday: "short", day: "numeric", month: "short" })} {start.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}
        </span>
      )}
      <span className="text-xs text-grid-text-muted px-2 py-0.5 rounded bg-grid-surface border border-white/[0.06]">
        {session.type}
      </span>
    </div>
  );
}
