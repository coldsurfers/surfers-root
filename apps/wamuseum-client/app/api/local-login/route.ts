import cookie from 'cookie'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { token } = body

  if (token) {
    return new Response('local login', {
      status: 200,
      headers: {
        'Set-Cookie': cookie.serialize('accessToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/',
        }),
      },
    })
  } else {
    return NextResponse.json({ message: 'Token not provided' }, { status: 400 })
  }
}
