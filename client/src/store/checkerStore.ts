// VibeDeploy Checker Store - Zustand with localStorage persistence
// Manages multi-step checker form state client-side

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CheckerAnswers } from "../scoring/types";
import { CATEGORIES } from "../scoring/questions";

interface CheckerState {
  currentCategoryIndex: number;
  answers: CheckerAnswers;
  email: string;
  isComplete: boolean;
  totalCategories: number;

  // Actions
  setAnswer: (categoryId: string, questionId: string, value: string) => void;
  setEmail: (email: string) => void;
  nextCategory: () => void;
  prevCategory: () => void;
  goToCategory: (index: number) => void;
  complete: () => void;
  reset: () => void;

  // Computed helpers
  currentCategory: () => (typeof CATEGORIES)[0];
  completionPercentage: () => number;
  isCategoryAnswered: (categoryId: string) => boolean;
}

export const useCheckerStore = create<CheckerState>()(
  persist(
    (set, get) => ({
      currentCategoryIndex: 0,
      answers: {} as CheckerAnswers,
      email: "",
      isComplete: false,
      totalCategories: CATEGORIES.length,

      setAnswer: (categoryId: string, questionId: string, value: string) => {
        set((state: CheckerState) => ({
          answers: {
            ...state.answers,
            [categoryId]: {
              ...state.answers[categoryId],
              [questionId]: value,
            },
          },
        }));
      },

      setEmail: (email: string) => set({ email }),

      nextCategory: () => {
        const { currentCategoryIndex, totalCategories } = get();
        if (currentCategoryIndex < totalCategories - 1) {
          set({ currentCategoryIndex: currentCategoryIndex + 1 });
        }
      },

      prevCategory: () => {
        const { currentCategoryIndex } = get();
        if (currentCategoryIndex > 0) {
          set({ currentCategoryIndex: currentCategoryIndex - 1 });
        }
      },

      goToCategory: (index: number) => {
        const { totalCategories } = get();
        if (index >= 0 && index < totalCategories) {
          set({ currentCategoryIndex: index });
        }
      },

      complete: () => set({ isComplete: true }),

      reset: () =>
        set({
          currentCategoryIndex: 0,
          answers: {} as CheckerAnswers,
          email: "",
          isComplete: false,
        }),

      currentCategory: () => {
        const { currentCategoryIndex } = get();
        return CATEGORIES[currentCategoryIndex];
      },

      completionPercentage: () => {
        const { answers } = get();
        let answeredQuestions = 0;
        let totalQuestions = 0;

        for (const category of CATEGORIES) {
          for (const question of category.questions) {
            totalQuestions++;
            if (answers[category.id]?.[question.id] !== undefined) {
              answeredQuestions++;
            }
          }
        }

        return totalQuestions > 0
          ? Math.round((answeredQuestions / totalQuestions) * 100)
          : 0;
      },

      isCategoryAnswered: (categoryId: string) => {
        const { answers } = get();
        const category = CATEGORIES.find((c) => c.id === categoryId);
        if (!category) return false;

        return category.questions.every(
          (q) => answers[categoryId]?.[q.id] !== undefined
        );
      },
    }),
    {
      name: "vibedeploy-checker",
      partialize: (state: CheckerState) => ({
        currentCategoryIndex: state.currentCategoryIndex,
        answers: state.answers,
        email: state.email,
        isComplete: state.isComplete,
      }),
    }
  )
);
