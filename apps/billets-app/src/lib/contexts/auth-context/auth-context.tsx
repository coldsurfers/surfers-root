import { useFirebaseMessaging } from '@/lib/hooks'
// import { useSendFCMTokenMutation } from '@/lib/react-query'
import { $api } from '@/lib/api/openapi-client'
import { mmkvKeys } from '@/lib/storage/constants'
import { mmkvInstance } from '@/lib/storage/mmkvInstance'
import { useQueryClient } from '@tanstack/react-query'
import React, { createContext, PropsWithChildren, useCallback } from 'react'
import { components } from '../../../types/api'
import useGetMeQuery from '../../react-query/queries/useGetMeQuery'

export type User = components['schemas']['GetMeSuccessResponse'] | null

export const AuthContext = createContext<{
  login: (params: {
    authToken: {
      refreshToken: string
      accessToken: string
    }
    user: User
  }) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
  user: User
}>({
  login: async () => {},
  logout: async () => {},
  isLoading: true,
  user: null,
})

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient()
  const { isLoading: isLoadingMe, data: meData } = useGetMeQuery()
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
        await queryClient.invalidateQueries()
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
        isLoading: isLoadingMe,
        user: meData ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
