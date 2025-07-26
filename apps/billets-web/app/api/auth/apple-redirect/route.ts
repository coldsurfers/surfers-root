import { SITE_URL } from '@/libs/constants';
import { apiClient } from '@/libs/openapi-client';
import { generateAppleClientSecret } from '@/libs/utils/utils.jwt';
import { decodeJwt } from '@coldsurfers/shared-utils';
import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const code = formData.get('code') as string;

    if (!code) {
      return new Response(JSON.stringify({ error: 'Missing code' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const clientSecret = generateAppleClientSecret();

    const tokenRes = await fetch('https://appleid.apple.com/auth/token', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.APPLE_REDIRECT_URI ?? '',
        client_id: process.env.APPLE_CLIENT_ID ?? '',
        client_secret: clientSecret,
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const tokenJson = await tokenRes.json();
    const idToken = tokenJson.id_token;
    const decoded = decodeJwt(idToken);

    if (!decoded?.email) {
      return new Response(JSON.stringify({ error: 'email not found in decoded token' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { authToken } = await apiClient.auth.signIn({
      provider: 'apple',
      email: decoded.email,
      token: idToken,
      platform: 'web',
    });

    const searchParams = new URLSearchParams();
    searchParams.append('access_token', authToken.accessToken);
    searchParams.append('refresh_token', authToken.refreshToken);

    return NextResponse.redirect(`${SITE_URL}/social-redirect?${searchParams.toString()}`);
  } catch (err) {
    console.error('Apple token error:', err);
    return new Response(JSON.stringify({ error: 'internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
