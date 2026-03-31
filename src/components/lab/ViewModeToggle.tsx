"use client";

export type ViewMode = "normal" | "wireframe" | "xray";

interface ViewModeToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const modes: { key: ViewMode; label: string }[] = [
  { key: "normal", label: "Normal" },
  { key: "wireframe", label: "Wireframe" },
  { key: "xray", label: "X-Ray" },
];

export function ViewModeToggle({ mode, onChange }: ViewModeToggleProps) {
  return (
    <div className="flex gap-1 rounded-lg bg-grid-surface border border-white/[0.06] p-1">
      {modes.map((m) => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
            mode === m.key
              ? "bg-grid-card text-grid-text border border-white/[0.06]"
              : "text-grid-text-muted hover:text-grid-text"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
