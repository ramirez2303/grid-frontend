"use client";

interface SeasonBadgeProps {
  label?: string;
  className?: string;
}

export function SeasonBadge({ label = "2026", className = "" }: SeasonBadgeProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
      <span className="text-xs font-medium uppercase tracking-wider text-grid-text-muted">
        {label}
      </span>
    </div>
  );
}
