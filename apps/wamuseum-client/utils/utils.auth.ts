import { AuthToken } from 'src/__generated__/graphql'
import storage from './storage/storage'

export const authUtils = {
  login: async (authToken: AuthToken) => {
    storage?.set('@wamuseum-client/auth-token', JSON.stringify(authToken))
    await fetch('/api/local-login', {
      method: 'POST',
      body: JSON.stringify({
        token: authToken.accessToken,
      }),
    })
  },
  logout: async () => {
    storage?.remove('@wamuseum-client/auth-token')
    await fetch('/api/local-logout', {
      method: 'POST',
    })
  },
}
