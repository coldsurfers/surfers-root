'use client'

import { type ReactNode, createContext, useRef } from 'react'

import { StoreApi } from 'zustand'
import { type AuthStore, createAuthStore } from '../../stores/authStore'

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
