import { COOKIE_ACCESS_TOKEN_KEY } from '@/utils/constants'
import cookie from 'cookie'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  return new Response('local logout', {
    status: 200,
    headers: {
      'Set-Cookie': cookie.serialize(COOKIE_ACCESS_TOKEN_KEY, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0), // Expire immediately
        sameSite: 'strict',
        path: '/',
      }),
    },
  })
}
