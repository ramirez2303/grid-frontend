"use client";

import { motion } from "framer-motion";

import type { TriviaQuestionItem } from "@/types/trivia";

interface TriviaQuestionProps {
  question: TriviaQuestionItem;
  selectedAnswer: number | null;
  revealed: boolean;
  onSelect: (index: number) => void;
}

export function TriviaQuestion({ question, selectedAnswer, revealed, onSelect }: TriviaQuestionProps) {
  return (
    <div>
      <p className="text-lg font-medium text-grid-text mb-6">{question.question}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option, i) => {
          const isCorrect = i === question.correctAnswer;
          const isSelected = i === selectedAnswer;
          let bg = "bg-grid-surface border-white/[0.06] hover:border-white/10";
          if (revealed) {
            if (isCorrect) bg = "bg-green-500/20 border-green-500/50";
            else if (isSelected) bg = "bg-red-500/20 border-red-500/50";
            else bg = "bg-grid-surface border-white/[0.04] opacity-50";
          } else if (isSelected) {
            bg = "bg-team-mclaren/20 border-team-mclaren/50";
          }

          return (
            <motion.button
              key={i}
              onClick={() => !revealed && onSelect(i)}
              className={`p-4 rounded-xl border text-left text-sm text-grid-text transition-all ${bg}`}
              whileTap={!revealed ? { scale: 0.97 } : undefined}
              disabled={revealed}
            >
              <span className="font-bold text-grid-text-muted mr-2" style={{ fontFamily: "var(--font-mono)" }}>
                {String.fromCharCode(65 + i)}.
              </span>
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
