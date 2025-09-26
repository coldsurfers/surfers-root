'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SurveyStore = {
  miniSurveyCompleted: boolean;
  setMiniSurveyCompleted: (miniSurveyCompleted: boolean) => void;
};

export const useSurveyStore = create<SurveyStore>()(
  persist(
    (set) => ({
      miniSurveyCompleted: typeof window === 'undefined',
      setMiniSurveyCompleted: (miniSurveyCompleted) => set({ miniSurveyCompleted }),
    }),
    {
      name: '@coldsurf-io/survey-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
