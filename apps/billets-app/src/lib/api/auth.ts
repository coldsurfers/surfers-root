import { AxiosResponse } from 'axios'
import axiosClient from './axiosClient'
import { AuthTokenDTOSerialized, UserDTOSerialized } from './type-gens'

export type SigninBody = {
  provider: 'google' | 'apple' | 'email'
  email: string
  password?: string
  token?: string
}

export type SigninResponse = AxiosResponse<{
  user: UserDTOSerialized
  authToken: AuthTokenDTOSerialized
}>

export const signIn = (body: SigninBody) => {
  return axiosClient.post<SigninBody, SigninResponse>('/api/auth/signin', body)
}

export const signupEmail = ({ email, password }: { email: string; password: string }) => {
  return axiosClient.post<{ user: { id: string; email: string } }>('/v1/auth/signup/email', {
    email,
    password,
  })
}

export const sendEmailConfirm = ({ email }: { email: string }) => {
  return axiosClient.post<{ info: never }, AxiosResponse<{ info: never }, { info: never }>, { email: string }>(
    '/v1/auth/email-confirm',
    {
      email,
    },
  )
}

export const updateEmailConfirm = ({ confirmText, email }: { confirmText: string; email: string }) => {
  return axiosClient.patch<
    { confirmed: boolean },
    AxiosResponse<{ confirmed: boolean }, { confirmed: boolean }>,
    { email: string; confirmText: string }
  >('/v1/auth/email-confirm', {
    email,
    confirmText,
  })
}
