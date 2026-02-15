import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useGameStore = create(
  persist(
    (set) => ({
      name: "",
      email: "",
      bio: "",

      xp: 0,
      streak: 0,
      totalQuestions: 0,
      correctAnswers: 0,

      setProfile: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      recordAnswer: (isCorrect) =>
        set((state) => ({
          totalQuestions: state.totalQuestions + 1,
          correctAnswers: isCorrect
            ? state.correctAnswers + 1
            : state.correctAnswers,
          xp: isCorrect ? state.xp + 10 : state.xp,
        })),

      completeQuiz: () =>
        set((state) => ({
          streak: state.streak + 1,
        })),

      failQuiz: () =>
        set(() => ({
          streak: 0,
        })),
    }),
    {
      name: "game-storage",
    }
  )
);