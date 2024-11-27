import { AuthToken } from 'src/__generated__/graphql'

export const authUtils = {
  login: async (authToken: AuthToken) => {
    await fetch('/api/local-login', {
      method: 'POST',
      body: JSON.stringify({
        token: authToken.accessToken,
      }),
    })
  },
  logout: async () => {
    await fetch('/api/local-logout', {
      method: 'POST',
    })
  },
}
