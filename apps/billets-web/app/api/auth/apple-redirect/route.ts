import { COOKIE_ACCESS_TOKEN_KEY } from '@/libs/constants'
import { apiClient } from '@/libs/openapi-client'
import { generateAppleClientSecret } from '@/libs/utils/utils.jwt'
import { decodeJwt } from '@coldsurfers/shared-utils'
import axios from 'axios'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import * as qs from 'querystring'
import getRawBody from 'raw-body'

export const dynamic = 'force-dynamic' // 선택적으로 캐시 무효화

export async function POST(req: NextRequest) {
  const rawBody = await getRawBody(req.body as any)
  const parsed = qs.parse(rawBody.toString())

  const code = parsed.code as string
  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 })
  }

  const clientSecret = generateAppleClientSecret()

  try {
    const tokenRes = await axios.post(
      'https://appleid.apple.com/auth/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.APPLE_REDIRECT_URI!,
        client_id: process.env.APPLE_CLIENT_ID!,
        client_secret: clientSecret,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    )

    const { id_token: idToken } = tokenRes.data
    const decoded = decodeJwt(idToken)

    if (!decoded?.email) {
      return NextResponse.json({ error: 'Apple login failed' }, { status: 500 })
    }

    const { authToken } = await apiClient.auth.signIn({
      provider: 'apple',
      email: decoded.email,
      token: idToken,
      platform: 'web',
    })

    const cookieStore = await cookies()

    const responseCookie = cookieStore
      .set(COOKIE_ACCESS_TOKEN_KEY, authToken.accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'none',
        path: '/',
        domain: process.env.NODE_ENV === 'development' ? undefined : '.coldsurf.io',
      })
      .toString()

    return NextResponse.redirect(
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : `https://coldsurf.io`,
      {
        headers: {
          'Set-Cookie': responseCookie,
        },
      },
    )
  } catch (err) {
    console.error('Apple token error:', err)
    return NextResponse.json({ error: 'Apple login failed' }, { status: 500 })
  }
}
