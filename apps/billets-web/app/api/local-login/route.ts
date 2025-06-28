import { COOKIE_ACCESS_TOKEN_KEY } from '@/libs/constants';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  const body = await request.json();
  const { token } = body;

  const responseCookie = cookieStore
    .set(COOKIE_ACCESS_TOKEN_KEY, token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'none',
      path: '/',
      domain: process.env.NODE_ENV === 'development' ? undefined : '.coldsurf.io',
    })
    .toString();

  if (token) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Set-Cookie': responseCookie,
      },
    });
  }
  return NextResponse.json({ message: 'Token not provided' }, { status: 400 });
}
