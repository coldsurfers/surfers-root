import { NextResponse } from 'next/server';

export async function GET() {
  const query = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.APPLE_CLIENT_ID ?? '',
    redirect_uri: process.env.APPLE_REDIRECT_URI ?? '',
    scope: 'name email',
    response_mode: 'form_post',
  });

  const authUrl = `https://appleid.apple.com/auth/authorize?${query.toString()}`;
  return NextResponse.redirect(authUrl);
}
