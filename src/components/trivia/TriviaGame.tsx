"use client";

import { useEffect } from "react";
import { Trophy, RotateCcw } from "lucide-react";
import { useTriviaGame } from "@/hooks/useTriviaGame";
import { TriviaQuestion } from "./TriviaQuestion";

export function TriviaGame() {
  const { phase, currentQuestion, currentIndex, total, score, selectedAnswer, start, selectAnswer, nextQuestion } = useTriviaGame();

  useEffect(() => { void start(); }, [start]);

  if (phase === "loading") {
    return <div className="h-48 rounded-xl bg-grid-surface animate-pulse" />;
  }

  if (phase === "finished") {
    return (
      <div className="rounded-2xl bg-grid-surface border border-white/[0.06] p-8 text-center">
        <Trophy size={40} className="mx-auto mb-4 text-team-mclaren" />
        <h3 className="text-3xl font-bold text-grid-text mb-2" style={{ fontFamily: "var(--font-display)" }}>
          {score} / {total}
        </h3>
        <p className="text-sm text-grid-text-muted mb-6">
          {score === total ? "¡Perfecto!" : score >= total * 0.7 ? "¡Muy bien!" : score >= total * 0.4 ? "¡Nada mal!" : "¡Seguí intentando!"}
        </p>
        <button onClick={() => void start()} className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-lg bg-team-mclaren/20 text-team-mclaren text-sm font-medium hover:bg-team-mclaren/30 transition-colors">
          <RotateCcw size={14} /> Jugar de nuevo
        </button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl tracking-wider text-grid-text" style={{ fontFamily: "var(--font-display)" }}>TRIVIA</h2>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-grid-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
            {currentIndex + 1}/{total}
          </span>
          <span className="text-team-mclaren font-bold" style={{ fontFamily: "var(--font-mono)" }}>
            {score} pts
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-grid-card mb-6 overflow-hidden">
        <div className="h-full bg-team-mclaren transition-all" style={{ width: `${((currentIndex + 1) / total) * 100}%` }} />
      </div>

      <div className="rounded-2xl bg-grid-surface border border-white/[0.06] p-6">
        <TriviaQuestion question={currentQuestion} selectedAnswer={selectedAnswer} revealed={phase === "revealed"} onSelect={selectAnswer} />

        {phase === "revealed" && (
          <div className="mt-6 text-center">
            <button onClick={nextQuestion} className="px-6 py-2.5 rounded-lg bg-grid-card border border-white/[0.06] text-sm text-grid-text hover:bg-white/[0.04] transition-colors">
              {currentIndex + 1 < total ? "Siguiente →" : "Ver resultado"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
