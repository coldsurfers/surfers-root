import { COOKIE_ACCESS_TOKEN_KEY, COOKIE_REFRESH_TOKEN_KEY } from '@/libs/constants';
import { apiClient } from '@/libs/openapi-client';
import { createCommonCookieOptions } from '@/libs/utils';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  const body = (await request.json()) as {
    refreshToken: string;
  };

  try {
    const data = await apiClient.auth.reissueToken({
      refreshToken: body.refreshToken,
    });

    if (data.authToken.accessToken && data.authToken.refreshToken) {
      const responseCookie = cookieStore
        .set(
          COOKIE_ACCESS_TOKEN_KEY,
          data.authToken.accessToken,
          createCommonCookieOptions({
            maxAge: 60 * 60 * 24 * 7, // 1 week
          })
        )
        .set(
          COOKIE_REFRESH_TOKEN_KEY,
          data.authToken.refreshToken,
          createCommonCookieOptions({
            maxAge: 60 * 60 * 24 * 7, // 4 weeks
          })
        )
        .toString();
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Set-Cookie': responseCookie,
        },
      });
    }
    return NextResponse.json({ message: 'token reissue failed' }, { status: 500 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'token reissue failed' }, { status: 500 });
  }
}
