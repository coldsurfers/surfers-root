import { components } from '@coldsurfers/api-sdk'
import storage from './utils.storage'

export const authUtils = {
  localLogin: async (authToken: components['schemas']['UserWithAuthTokenDTOSchema']['authToken']) => {
    await fetch('/api/local-login', {
      method: 'POST',
      body: JSON.stringify({
        token: authToken.accessToken,
      }),
    })
    storage?.set('@coldsurf-io/access-token', authToken.accessToken)
    storage?.set('@coldsurf-io/refresh-token', authToken.refreshToken)
  },
  localLogout: async () => {
    await fetch('/api/local-logout', {
      method: 'POST',
    })
    storage?.remove('@coldsurf-io/access-token')
    storage?.remove('@coldsurf-io/refresh-token')
  },
}
