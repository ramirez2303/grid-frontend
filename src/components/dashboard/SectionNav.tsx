"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "constructores", label: "Constructores" },
  { id: "pilotos", label: "Pilotos" },
];

export function SectionNav() {
  const [active, setActive] = useState("constructores");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActive(section.id);
        },
        { rootMargin: "-40% 0px -50% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="sticky top-16 z-30 -mx-6 px-6 py-0 bg-grid-bg/80 backdrop-blur-xl border-b border-white/[0.06] mt-4">
      <div className="flex items-center gap-1">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`relative px-4 py-3.5 text-sm font-medium transition-colors ${
              active === s.id ? "text-grid-text" : "text-grid-text-muted hover:text-grid-text-secondary"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActive(s.id);
              document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {s.label}
            {active === s.id && (
              <motion.div
                className="absolute bottom-0 left-2 right-2 h-[2px] bg-team-mclaren rounded-full"
                layoutId="section-nav-indicator"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </a>
        ))}
        <div className="flex-1" />
        <span className="text-xs text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
          Temporada 2026
        </span>
      </div>
    </div>
  );
}
