import { COOKIE_THEME } from '@/libs/constants';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  const body = (await request.json()) as {
    theme: 'dark' | 'light';
  };
  const { theme } = body;

  const responseCookie = cookieStore
    .set(COOKIE_THEME, theme, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 365 * 10, // 10년 (초 단위),
      sameSite: 'strict',
      path: '/',
      domain: process.env.NODE_ENV === 'development' ? undefined : '.coldsurf.io',
    })
    .toString();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Set-Cookie': responseCookie,
    },
  });
}
