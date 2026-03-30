"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: string): TimeLeft {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden rounded-lg bg-grid-surface border border-white/[0.06] px-3 py-2 sm:px-5 sm:py-3">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            className="block text-3xl sm:text-5xl font-bold text-grid-text tabular-nums"
            style={{ fontFamily: "var(--font-mono)" }}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[10px] sm:text-xs font-medium uppercase tracking-widest text-grid-text-muted">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Digit value={timeLeft.days} label="Días" />
      <span className="text-2xl sm:text-4xl font-bold text-grid-text-muted mt-[-20px]">:</span>
      <Digit value={timeLeft.hours} label="Horas" />
      <span className="text-2xl sm:text-4xl font-bold text-grid-text-muted mt-[-20px]">:</span>
      <Digit value={timeLeft.minutes} label="Min" />
      <span className="text-2xl sm:text-4xl font-bold text-grid-text-muted mt-[-20px]">:</span>
      <Digit value={timeLeft.seconds} label="Seg" />
    </div>
  );
}
