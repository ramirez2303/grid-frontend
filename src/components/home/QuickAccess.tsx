"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Map, Radio, Box } from "lucide-react";

const sections = [
  { name: "Equipos", href: "/equipos", icon: Users, color: "#E8002D", description: "11 equipos, 22 pilotos" },
  { name: "Circuitos", href: "/circuitos", icon: Map, color: "#229971", description: "22 GPs alrededor del mundo" },
  { name: "Live Timing", href: "/live", icon: Radio, color: "#27F4D2", description: "Tiempos y posiciones en vivo" },
  { name: "3D Lab", href: "/lab", icon: Box, color: "#3671C6", description: "Explorá el auto F1 2026" },
];

export function QuickAccess() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-6 w-1 rounded-full bg-team-redbull" />
        <h2 className="text-2xl sm:text-3xl tracking-wider text-grid-text" style={{ fontFamily: "var(--font-display)" }}>
          EXPLORAR
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((section, i) => (
          <motion.div
            key={section.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Link
              href={section.href}
              className="group relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-xl bg-grid-surface border border-white/[0.06] p-8 sm:p-10 hover:border-white/10 transition-all"
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at center, ${section.color}, transparent 70%)` }}
              />

              <motion.div
                className="relative"
                whileHover={{ scale: 1.2, rotate: 8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <section.icon size={36} style={{ color: section.color }} />
                {/* Icon glow on hover */}
                <div
                  className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity"
                  style={{ background: section.color }}
                />
              </motion.div>

              <div className="text-center relative z-10">
                <p className="text-sm font-bold text-grid-text group-hover:text-white transition-colors">
                  {section.name}
                </p>
                <p className="text-xs text-grid-text-muted mt-1">{section.description}</p>
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ background: section.color }}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
