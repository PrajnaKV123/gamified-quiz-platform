import { create } from "zustand";

export const useGameStore = create((set) => ({
  // PLAYER DATA
  name: "Player One",
  level: 1,
  xp: 0,
  streak: 1,

  // QUIZ DATA
  totalQuestions: 0,
  correctAnswers: 0,

  // ACTIONS
  startQuiz: () =>
    set({
      totalQuestions: 0,
      correctAnswers: 0,
    }),

  submitAnswer: (isCorrect) =>
    set((state) => ({
      totalQuestions: state.totalQuestions + 1,
      correctAnswers: isCorrect
        ? state.correctAnswers + 1
        : state.correctAnswers,
      xp: isCorrect ? state.xp + 10 : state.xp,
      level: Math.floor((state.xp + (isCorrect ? 10 : 0)) / 50) + 1,
    })),
}));
