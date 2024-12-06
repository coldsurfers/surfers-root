import { createStore } from 'zustand'

export type AuthState = {
  accessToken?: string
  refreshToken?: string
  isLoggedIn: boolean
}

export type AuthActions = {
  // eslint-disable-next-line no-unused-vars
  login: (params: { accessToken?: string; refreshToken?: string }) => void
  logout: () => void
}

export type AuthStore = AuthState & AuthActions

export const defaultInitState: Partial<AuthState> = {
  isLoggedIn: false,
}

export const createAuthStore = (initState: Partial<AuthState> = defaultInitState) =>
  createStore<AuthState & AuthActions>()((set) => ({
    ...initState,
    isLoggedIn: !!initState.isLoggedIn,
    login: (params) =>
      set((state) => ({
        ...state,
        ...params,
        isLoggedIn: !!params.accessToken && !!params.refreshToken,
      })),
    logout: () =>
      set((state) => ({
        ...state,
        accessToken: undefined,
        refreshToken: undefined,
        isLoggedIn: false,
      })),
  }))
