import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import jwtDecode from 'jwt-decode'
import { FstvlLifeJwtPayload } from './types'

dotenv.config()

const { BILLETS_SERVER_JWT_SECRET: secret } = process.env

export function generateToken(payload: FstvlLifeJwtPayload) {
  if (!secret) {
    throw new Error('no secret')
  }
  return jwt.sign(payload, secret)
}

export function decodeToken(token: string) {
  try {
    const decoded = jwtDecode<FstvlLifeJwtPayload>(token)
    return decoded
  } catch (e) {
    return null
  }
}

export const generateAuthToken = ({ userId }: { userId: string }) => {
  const accessToken = generateToken({
    id: userId,
    exp: 60 * 60 * 24 * 7,
  })
  const refreshToken = generateToken({
    id: userId,
    exp: 60 * 60 * 24 * 30,
  })
  return {
    accessToken,
    refreshToken,
  }
}
