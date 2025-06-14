import { createRemoteJWKSet, jwtVerify } from 'jose'

const appleJWKsUrl = new URL('https://appleid.apple.com/auth/keys')

// Apple의 JWK 세트 리모트 로딩 핸들러
const JWKS = createRemoteJWKSet(appleJWKsUrl)

export async function verifyAppleIdToken(idToken: string, clientId: string) {
  try {
    const { payload } = await jwtVerify(idToken, JWKS, {
      issuer: 'https://appleid.apple.com',
      audience: clientId,
    })

    // 예: payload에는 email, sub, exp, etc
    return payload
  } catch (e) {
    console.error('❌ Failed to verify Apple id_token:', e)
    throw new Error('Invalid Apple ID Token')
  }
}
