import { COOKIE_ACCESS_TOKEN_KEY, COOKIE_REFRESH_TOKEN_KEY } from '@/utils/constants';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  const body = await request.json();
  const { accessToken, refreshToken } = body;

  const responseCookie = cookieStore
    .set(COOKIE_ACCESS_TOKEN_KEY, accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'strict',
      path: '/',
      domain: process.env.NODE_ENV === 'development' ? undefined : '.coldsurf.io',
    })
    .set(COOKIE_REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7 * 4, // 4 weeks
      sameSite: 'strict',
      path: '/',
      domain: process.env.NODE_ENV === 'development' ? undefined : '.coldsurf.io',
    })
    .toString();

  if (accessToken && refreshToken) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Set-Cookie': responseCookie,
      },
    });
  }
  return NextResponse.json({ message: 'Token not provided' }, { status: 400 });
}
