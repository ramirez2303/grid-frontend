"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sections = [
  { name: "Equipos", href: "/equipos" },
  { name: "Circuitos", href: "/circuitos" },
  { name: "Live", href: "/live" },
  { name: "3D Lab", href: "/lab" },
  { name: "Noticias", href: "/noticias" },
  { name: "Curiosidades", href: "/curiosidades" },
  { name: "Técnico", href: "/tecnico" },
];

export function Footer() {
  return (
    <motion.footer
      className="relative border-t border-white/[0.06] bg-grid-bg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="flex flex-col items-center gap-1 md:items-start">
            <span
              className="text-2xl tracking-[0.2em] text-grid-text"
              style={{ fontFamily: "var(--font-display)" }}
            >
              GRID
            </span>
            <span className="text-xs text-grid-text-muted tracking-wider uppercase">
              Formula 1 Hub
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-sm text-grid-text-secondary hover:text-grid-text transition-colors duration-200"
              >
                {s.name}
              </Link>
            ))}
          </nav>

          {/* Credits */}
          <div className="flex flex-col items-center gap-1 text-xs text-grid-text-muted md:items-end">
            <span>Datos: Jolpica API, OpenF1, f1api.dev</span>
            <span>Noticias: RSS feeds + News API</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-xs text-grid-text-muted">
            GRID no es un producto oficial de Formula 1. Todos los datos y marcas pertenecen a sus respectivos propietarios.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
