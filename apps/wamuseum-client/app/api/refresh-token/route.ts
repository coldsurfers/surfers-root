import { createApolloClient } from '@/libs';
import { COOKIE_ACCESS_TOKEN_KEY, COOKIE_REFRESH_TOKEN_KEY } from '@/utils/constants';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import {
  type TokenRefreshData,
  TokenRefreshDocument,
  type TokenRefreshInput,
} from 'src/__generated__/graphql';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token available' }, { status: 401 });
    }

    const client = createApolloClient({});

    const data = await client.mutate<
      {
        tokenRefresh: TokenRefreshData;
      },
      {
        input: TokenRefreshInput;
      }
    >({
      mutation: TokenRefreshDocument,
      variables: {
        input: {
          refreshToken,
        },
      },
    });

    if (data.data?.tokenRefresh.__typename !== 'UserWithAuthToken') {
      return NextResponse.json({ error: 'Token refresh failed' }, { status: 401 });
    }

    if (data.data.tokenRefresh.authToken) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        data.data.tokenRefresh.authToken;

      // 새로운 토큰을 쿠키에 설정
      const responseCookie = cookieStore
        .set(COOKIE_ACCESS_TOKEN_KEY, newAccessToken, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/',
          domain: process.env.NODE_ENV === 'development' ? undefined : '.coldsurf.io',
        })
        .set(COOKIE_REFRESH_TOKEN_KEY, newRefreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 7 * 4, // 4 weeks
          sameSite: 'strict',
          path: '/',
          domain: process.env.NODE_ENV === 'development' ? undefined : '.coldsurf.io',
        })
        .toString();

      return new Response(
        JSON.stringify({
          success: true,
          authToken: { accessToken: newAccessToken, refreshToken: newRefreshToken },
        }),
        {
          status: 200,
          headers: {
            'Set-Cookie': responseCookie,
          },
        }
      );
    }

    return NextResponse.json({ error: 'Token refresh failed' }, { status: 401 });
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
