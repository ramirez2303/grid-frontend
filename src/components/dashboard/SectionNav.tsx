"use client";

const sections = [
  { id: "constructores", label: "Constructores" },
  { id: "pilotos", label: "Pilotos" },
];

export function SectionNav() {
  return (
    <div className="sticky top-16 z-30 -mx-6 px-6 py-3 bg-grid-bg/90 backdrop-blur-lg border-b border-white/[0.04]">
      <div className="flex items-center gap-4">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="text-sm font-medium text-grid-text-muted hover:text-grid-text transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {s.label}
          </a>
        ))}
        <div className="flex-1" />
        <span className="text-xs text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
          2026
        </span>
      </div>
    </div>
  );
}
