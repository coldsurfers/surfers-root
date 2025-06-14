import { COOKIE_ACCESS_TOKEN_KEY } from '@/libs/constants'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  const responseCookie = cookieStore
    .set(COOKIE_ACCESS_TOKEN_KEY, '', {
      httpOnly: true,
      secure: true,
      maxAge: 0,
      sameSite: 'none',
      path: '/',
      domain: process.env.NODE_ENV === 'development' ? undefined : '.coldsurf.io',
    })
    .toString()
  return new Response('local logout', {
    status: 200,
    headers: {
      'Set-Cookie': responseCookie,
    },
  })
}
