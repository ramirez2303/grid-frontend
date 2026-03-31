"use client";

import { useState, useCallback } from "react";
import { getTriviaQuestions } from "@/lib/api";

import type { TriviaQuestionItem } from "@/types/trivia";

interface TriviaGameState {
  questions: TriviaQuestionItem[];
  currentIndex: number;
  score: number;
  selectedAnswer: number | null;
  phase: "loading" | "playing" | "revealed" | "finished";
}

export function useTriviaGame() {
  const [state, setState] = useState<TriviaGameState>({
    questions: [], currentIndex: 0, score: 0, selectedAnswer: null, phase: "loading",
  });

  const start = useCallback(async () => {
    setState((s) => ({ ...s, phase: "loading" }));
    try {
      const questions = await getTriviaQuestions(10);
      setState({ questions, currentIndex: 0, score: 0, selectedAnswer: null, phase: questions.length > 0 ? "playing" : "finished" });
    } catch {
      setState((s) => ({ ...s, phase: "finished" }));
    }
  }, []);

  const selectAnswer = useCallback((index: number) => {
    setState((prev) => {
      if (prev.phase !== "playing") return prev;
      const correct = prev.questions[prev.currentIndex]?.correctAnswer === index;
      return { ...prev, selectedAnswer: index, score: correct ? prev.score + 1 : prev.score, phase: "revealed" };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState((prev) => {
      const next = prev.currentIndex + 1;
      if (next >= prev.questions.length) return { ...prev, phase: "finished" };
      return { ...prev, currentIndex: next, selectedAnswer: null, phase: "playing" };
    });
  }, []);

  const currentQuestion = state.questions[state.currentIndex] ?? null;
  const total = state.questions.length;

  return { ...state, currentQuestion, total, start, selectAnswer, nextQuestion };
}
