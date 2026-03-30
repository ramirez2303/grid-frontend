"use client";

import { motion } from "framer-motion";

interface StandingsToggleProps {
  active: "constructors" | "drivers";
  onChange: (tab: "constructors" | "drivers") => void;
}

const tabs = [
  { key: "constructors" as const, label: "Constructores" },
  { key: "drivers" as const, label: "Pilotos" },
];

export function StandingsToggle({ active, onChange }: StandingsToggleProps) {
  return (
    <div className="relative flex rounded-lg bg-grid-surface border border-white/[0.06] p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`relative z-10 flex-1 px-6 py-2.5 text-sm font-medium transition-colors ${
            active === tab.key ? "text-grid-text" : "text-grid-text-muted hover:text-grid-text-secondary"
          }`}
        >
          {active === tab.key && (
            <motion.div
              className="absolute inset-0 rounded-md bg-grid-card border border-white/[0.06]"
              layoutId="standings-tab"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
