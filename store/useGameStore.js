import { create } from "zustand";

const defaultState = {
  name: "",
  email: "",
  bio: "",
  xp: 0,
  streak: 0,
  totalQuestions: 0,
  correctAnswers: 0,
  lastPlayedDate: null,
};

export const useGameStore = create((set, get) => ({
  ...defaultState,

  // ===============================
  // LOAD USER (LOGIN / SIGNUP)
  // ===============================
  loadUser: (user) => {
    const email = user.email;
    const saved = localStorage.getItem(`game-${email}`);

    if (saved) {
      set(JSON.parse(saved));
    } else {
      set({
        ...defaultState,
        name: user.displayName || "Player",
        email,
      });
    }
  },

  // ===============================
  // ✅ SET PROFILE (FIXED)
  // ===============================
  setProfile: (data) => {
    set((state) => {
      const updated = {
        ...state,
        ...data,
      };

      if (state.email) {
        localStorage.setItem(
          `game-${state.email}`,
          JSON.stringify(updated)
        );
      }

      return updated;
    });
  },

  // ===============================
  // RECORD ANSWER
  // ===============================
  recordAnswer: (isCorrect) => {
    set((state) => {
      const updated = {
        ...state,
        totalQuestions: state.totalQuestions + 1,
        correctAnswers: isCorrect
          ? state.correctAnswers + 1
          : state.correctAnswers,
        xp: isCorrect ? state.xp + 10 : state.xp,
      };

      if (state.email) {
        localStorage.setItem(
          `game-${state.email}`,
          JSON.stringify(updated)
        );
      }

      return updated;
    });
  },

  // ===============================
  // DAILY STREAK LOGIC
  // ===============================
  completeQuiz: () => {
    const today = new Date().toISOString().split("T")[0];
    const { lastPlayedDate, streak, email } = get();

    let newStreak = streak;

    if (!lastPlayedDate) {
      newStreak = 1;
    } else if (lastPlayedDate === today) {
      return; // already counted today
    } else {
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split("T")[0];

      newStreak = lastPlayedDate === yesterday ? streak + 1 : 1;
    }

    const updated = {
      ...get(),
      streak: newStreak,
      lastPlayedDate: today,
    };

    if (email) {
      localStorage.setItem(
        `game-${email}`,
        JSON.stringify(updated)
      );
    }

    set(updated);
  },

  // ===============================
  // RESET SESSION (LOGOUT)
  // ===============================
  resetSession: () => set(defaultState),
}));
