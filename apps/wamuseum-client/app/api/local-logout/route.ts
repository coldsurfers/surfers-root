import { COOKIE_ACCESS_TOKEN_KEY } from '@/utils/constants'
import cookie from 'cookie'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  return new Response('local logout', {
    status: 200,
    headers: {
      'Set-Cookie': cookie.serialize(COOKIE_ACCESS_TOKEN_KEY, '', {
        httpOnly: true,
        secure: true,
        maxAge: 0,
        sameSite: 'none',
        path: '/',
        domain: process.env.NODE_ENV === 'development' ? undefined : '.coldsurf.io',
      }),
    },
  })
}
