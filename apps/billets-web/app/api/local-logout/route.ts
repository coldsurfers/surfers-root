import { COOKIE_ACCESS_TOKEN_KEY } from '@/libs/constants'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  const responseCookie = cookieStore.delete(COOKIE_ACCESS_TOKEN_KEY).toString()
  return new Response('local logout', {
    status: 200,
    headers: {
      'Set-Cookie': responseCookie,
    },
  })
}
