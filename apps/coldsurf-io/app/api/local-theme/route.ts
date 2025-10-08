import { COOKIE_THEME } from '@/libs/constants';
import { createCommonCookieOptions } from '@/libs/utils';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  const body = (await request.json()) as {
    theme: 'dark' | 'light';
  };
  const { theme } = body;

  const responseCookie = cookieStore
    .set(
      COOKIE_THEME,
      theme,
      createCommonCookieOptions({
        maxAge: 60 * 60 * 24 * 365 * 10, // 10년 (초 단위),
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
