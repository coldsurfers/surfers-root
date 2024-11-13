export type AuthTokenDTOSerialized = {
  accessToken: string
  refreshToken: string
}

export type UserDTOSerialized = {
  id: string
  email: string
  provider: string
}
