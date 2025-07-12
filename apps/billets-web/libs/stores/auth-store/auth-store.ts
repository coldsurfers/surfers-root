import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthStoreState = {
  accessToken: string;
  refreshToken: string;
  afterLoginRedirect: string;
};

type AuthStoreActions = {
  login: ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
  setAfterLoginRedirect: (redirectPath: string) => void;
};

type AuthStore = AuthStoreState & AuthStoreActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: '',
      refreshToken: '',
      afterLoginRedirect: '/',
      login: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),
      logout: () => set({ accessToken: '', refreshToken: '' }),
      setAfterLoginRedirect: (redirectPath) => set({ afterLoginRedirect: redirectPath }),
    }),
    {
      name: '@coldsurf-io/auth-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
