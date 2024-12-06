/* eslint-disable camelcase */
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { API_HOST, COOKIES } from '../../libs/constants'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const access_token = searchParams.get('access_token')
  const refresh_token = searchParams.get('refresh_token')
  const redirect_type = searchParams.get('redirect_type') as 'signup' | 'signin' | null

  if (!access_token || !refresh_token)
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
    })

  if (redirect_type === 'signup') {
    // create "new wave" profile
    await fetch(`${API_HOST}/api/profile`, {
      method: 'POST',
      headers: { Authorization: access_token },
    })
  }

  const cookieStore = cookies()
  cookieStore.set(COOKIES.ACCESS_TOKEN, access_token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  })
  cookieStore.set(COOKIES.REFRESH_TOKEN, refresh_token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 14,
  })

  switch (redirect_type) {
    case 'signup':
    case 'signin':
    default:
      redirect('/')
      break
  }
}

export async function DELETE() {
  const cookieStore = cookies()
  cookieStore.delete({
    name: COOKIES.ACCESS_TOKEN,
  })
  cookieStore.delete({
    name: COOKIES.REFRESH_TOKEN,
  })

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  })
}
