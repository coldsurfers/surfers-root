'use client'

import { createContext, useRef, type ReactNode } from 'react'

import { StoreApi } from 'zustand'
import { createAuthStore, type AuthStore } from '../../../stores/authStore'

export const AuthStoreContext = createContext<StoreApi<AuthStore>>(null!)

export interface AuthStoreProviderProps {
  children: ReactNode
  accessToken?: string
  refreshToken?: string
}

export const AuthStoreProvider = ({ children, refreshToken, accessToken }: AuthStoreProviderProps) => {
  const storeRef = useRef<StoreApi<AuthStore>>()
  if (!storeRef.current) {
    storeRef.current = createAuthStore({
      refreshToken,
      accessToken,
      isLoggedIn: !!refreshToken && !!accessToken,
    })
  }

  return <AuthStoreContext.Provider value={storeRef.current!}>{children}</AuthStoreContext.Provider>
}
