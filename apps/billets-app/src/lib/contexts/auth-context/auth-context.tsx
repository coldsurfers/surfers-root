import { $api } from '@/lib/api/openapi-client'
import { useFirebaseMessaging } from '@/lib/hooks'
import { mmkvKeys } from '@/lib/storage/constants'
import { mmkvInstance } from '@/lib/storage/mmkvInstance'
import { useQueryClient } from '@tanstack/react-query'
import React, { createContext, PropsWithChildren, useCallback } from 'react'
import { components } from '../../../types/api'

export type User = components['schemas']['UserDTOSchema'] | null

export const AuthContext = createContext<{
  login: (params: {
    authToken: {
      refreshToken: string
      accessToken: string
    }
    user: User
  }) => Promise<void>
  logout: () => Promise<void>
}>({
  login: async () => {},
  logout: async () => {},
})

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient()
  const { mutateAsync: sendFCMToken } = $api.useMutation('post', '/v1/fcm/token')
  const { getFCMToken } = useFirebaseMessaging()

  const login = useCallback(
    async ({
      authToken,
    }: {
      authToken: {
        refreshToken: string
        accessToken: string
      }
    }) => {
      try {
        mmkvInstance.set(mmkvKeys.authToken, JSON.stringify(authToken))
        const fcmToken = await getFCMToken()
        await sendFCMToken({
          body: {
            fcmToken,
          },
        })
        await queryClient.resetQueries()
      } catch (e) {
        console.error(e)
      }
    },
    [getFCMToken, queryClient, sendFCMToken],
  )
  const logout = useCallback(async () => {
    try {
      mmkvInstance.delete(mmkvKeys.authToken)
      await queryClient.resetQueries()
    } catch (e) {
      console.error(e)
    }
  }, [queryClient])

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
