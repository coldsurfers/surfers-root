import { SITE_URL } from '@/libs/constants';
import { apiClient } from '@/libs/openapi-client';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code') as string;
  const redirect_uri = process.env.GOOGLE_REDIRECT_URI ?? '';
  const client_id = process.env.GOOGLE_CLIENT_ID ?? '';
  const client_secret = process.env.GOOGLE_CLIENT_SECRET ?? '';

  if (!code) {
    return NextResponse.redirect(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/login'
        : 'https://coldsurf.io/login'
    );
  }

  try {
    // 1. 토큰 교환
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      body: JSON.stringify({
        code,
        client_id,
        client_secret,
        redirect_uri,
        grant_type: 'authorization_code',
      }),
    });

    const { id_token: idToken, access_token } = await tokenRes.json();

    // 2. 사용자 정보 조회
    const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userInfoData = await userInfo.json();
    const { authToken } = await apiClient.auth.signIn({
      provider: 'google',
      email: userInfoData.email,
      token: idToken,
      platform: 'web',
    });
    // 3. 세션/쿠키 설정 등 (예시로 localStorage/token 쿠키 설정 가능)
    // 여기서는 단순히 유저 정보를 보여줌

    const searchParams = new URLSearchParams();
    searchParams.append('access_token', authToken.accessToken);
    searchParams.append('refresh_token', authToken.refreshToken);

    return NextResponse.redirect(`${SITE_URL}/social-redirect?${searchParams.toString()}`);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Authentication failed' }, { status: 500 });
  }
}
