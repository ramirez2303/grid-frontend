"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Equipos", href: "/equipos" },
  { name: "Circuitos", href: "/circuitos" },
  { name: "Live", href: "/live" },
  { name: "3D Lab", href: "/lab" },
  { name: "Noticias", href: "/noticias" },
  { name: "Curiosidades", href: "/curiosidades" },
  { name: "Técnico", href: "/tecnico" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.header
      className="sticky top-0 z-50 w-full"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Backdrop blur layer */}
      <div className="absolute inset-0 bg-grid-bg/80 backdrop-blur-xl border-b border-white/[0.06]" />

      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="group relative flex items-baseline gap-2">
          <span
            className="text-3xl tracking-[0.25em] text-grid-text transition-all duration-300 group-hover:tracking-[0.35em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            GRID
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-widest text-grid-text-muted sm:block">
            F1 Hub
          </span>
          {/* Accent underline on hover */}
          <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-team-mclaren transition-all duration-300 group-hover:w-full" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <Link
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-grid-text"
                      : "text-grid-text-secondary hover:text-grid-text"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      className="absolute bottom-0 left-1/2 h-[2px] w-4/5 -translate-x-1/2 bg-team-mclaren"
                      layoutId="nav-indicator"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Live indicator dot (desktop) */}
        <div className="hidden items-center gap-2 md:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-grid-text-muted">
            2026
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-grid-text transition-colors hover:bg-white/[0.06] md:hidden"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 top-16 z-40 bg-grid-bg/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col px-6 pt-8">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 border-b border-white/[0.04] py-4 text-lg font-medium transition-colors ${
                        isActive ? "text-grid-text" : "text-grid-text-secondary"
                      }`}
                    >
                      {isActive && (
                        <span className="h-4 w-1 rounded-full bg-team-mclaren" />
                      )}
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Season badge in mobile */}
              <motion.div
                className="mt-8 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                <span className="text-sm font-medium uppercase tracking-wider text-grid-text-muted">
                  Temporada 2026
                </span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
