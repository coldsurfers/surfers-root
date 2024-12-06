import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { colorScheme } = await request.json()

  if (!['light', 'dark'].includes(colorScheme)) {
    return NextResponse.json({ error: 'Invalid color scheme' }, { status: 400 })
  }

  const response = NextResponse.json({ success: true, colorScheme })
  response.cookies.set('color-scheme', colorScheme, {
    path: '/',
    sameSite: 'lax',
    httpOnly: false, // Allow client access to the cookie if necessary
    secure: process.env.NODE_ENV === 'production', // Set `Secure` in production
  })

  return response
}
