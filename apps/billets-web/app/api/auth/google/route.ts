import { NextResponse } from 'next/server'

export function GET() {
  const redirect_uri = process.env.GOOGLE_REDIRECT_URI!
  const client_id = process.env.GOOGLE_CLIENT_ID!

  const scope = ['openid', 'email', 'profile'].join(' ')

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&access_type=offline&prompt=consent`

  return NextResponse.redirect(authUrl)
}
