import axios from 'axios'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

// Apple JWKS URL
const APPLE_JWKS_URL = 'https://appleid.apple.com/auth/keys'

// Fetch Apple public keys
const getApplePublicKeys = async () => {
  const response = await axios.get(APPLE_JWKS_URL)
  return response.data.keys
}

// Get the public key for a given 'kid'
const getPublicKey = async (header: jwt.JwtHeader): Promise<string | null> => {
  const keys = await getApplePublicKeys()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appleKey = keys.find((key: any) => key.kid === header.kid)

  if (!appleKey) {
    throw new Error('Unable to find the matching key.')
  }

  const jwkClient = jwksClient({
    jwksUri: APPLE_JWKS_URL,
  })

  const signingKey = await jwkClient.getSigningKey(header.kid)
  return signingKey.getPublicKey()
}

// Verify the token
const verifyAppleToken = async (token: string, clientId: string) => {
  try {
    // Decode the token header to get the 'kid'
    const decodedHeader = jwt.decode(token, { complete: true })

    if (!decodedHeader || typeof decodedHeader === 'string') {
      throw new Error('Invalid token')
    }

    const publicKey = await getPublicKey(decodedHeader.header)

    if (!publicKey) {
      throw Error('public key is null')
    }

    // Verify the token with the public key
    const payload = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
      issuer: 'https://appleid.apple.com',
      audience: clientId,
    })

    console.log('Token is valid:', payload)
    return payload
  } catch (error) {
    console.error('Token verification failed:', error)
    throw error
  }
}

export default verifyAppleToken
