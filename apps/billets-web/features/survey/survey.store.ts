'use client';

import type { StorageItem } from '@/libs/utils/utils.storage';
import { create } from 'zustand';
import { type StorageValue, persist } from 'zustand/middleware';

type SurveyStore = {
  miniSurveyCompleted: boolean;
  setMiniSurveyCompleted: (miniSurveyCompleted: boolean) => void;
  // Hydration 상태 추가
  _hasHydrated: boolean;
};

// Next.js App Router에서 SSR을 지원하는 Zustand store
const useSurveyStore = create<SurveyStore>()(
  persist(
    (set) => ({
      miniSurveyCompleted: false, // 서버사이드와 클라이언트사이드 모두 false로 시작
      setMiniSurveyCompleted: (miniSurveyCompleted: boolean) => set({ miniSurveyCompleted }),
      _hasHydrated: false,
    }),
    {
      name: '@coldsurf-io/survey-store' satisfies StorageItem,
      // 서버사이드에서는 localStorage를 사용할 수 없으므로 조건부로 처리
      storage:
        typeof window !== 'undefined'
          ? {
              getItem: (name: string) => {
                const value = localStorage.getItem(name);
                return value ? JSON.parse(value) : null;
              },
              setItem: (name: string, value: StorageValue<SurveyStore>) => {
                localStorage.setItem(name, JSON.stringify(value));
              },
              removeItem: (name: string) => {
                localStorage.removeItem(name);
              },
            }
          : undefined, // 서버사이드에서는 storage를 사용하지 않음
      // Hydration 완료 후 상태 업데이트
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true;
        }
      },
    }
  )
);

// Hydration이 완료되었는지 확인하는 hook
const useHasSurveyHydrated = () => {
  return useSurveyStore((state) => state._hasHydrated);
};

// 기본 export
export { useSurveyStore, useHasSurveyHydrated };
