import { COOKIE_ACCESS_TOKEN_KEY, COOKIE_REFRESH_TOKEN_KEY } from '@/libs/constants';
import { apiClient } from '@/libs/openapi-client';
import { generateAppleClientSecret } from '@/libs/utils/utils.jwt';
import { decodeJwt } from '@coldsurfers/shared-utils';
import { serialize } from 'cookie';
import type { NextRequest } from 'next/server';

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
      return new Response(JSON.stringify({ error: 'Apple login failed' }), {
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

    const accessTokenCookie = serialize(COOKIE_ACCESS_TOKEN_KEY, authToken.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      // apple 에서 redirect되기 때문에 일단 none으로 두고 /api/local-login에서 strict로 변경
      sameSite: 'none',
      path: '/',
      domain: process.env.NODE_ENV === 'development' ? undefined : '.coldsurf.io',
    });

    const refreshTokenCookie = serialize(COOKIE_REFRESH_TOKEN_KEY, authToken.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 4 weeks
      // apple 에서 redirect되기 때문에 일단 none으로 두고 /api/local-login에서 strict로 변경
      sameSite: 'none',
      path: '/',
      domain: process.env.NODE_ENV === 'development' ? undefined : '.coldsurf.io',
    });

    const headers = new Headers();
    headers.append('Set-Cookie', accessTokenCookie);
    headers.append('Set-Cookie', refreshTokenCookie);

    return new Response(null, {
      status: 302,
      headers: {
        Location:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/social-redirect'
            : 'https://coldsurf.io/social-redirect',
        ...headers,
      },
    });
  } catch (err) {
    console.error('Apple token error:', err);
    return new Response(JSON.stringify({ error: 'Apple login failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
