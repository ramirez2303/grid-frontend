"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SeasonBadge } from "@/components/ui/SeasonBadge";
import { navLinks } from "@/data/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  pathname: string;
  onClose: () => void;
}

export function MobileMenu({ isOpen, pathname, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
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
                    onClick={onClose}
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

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <SeasonBadge label="Temporada 2026" className="text-sm" />
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
