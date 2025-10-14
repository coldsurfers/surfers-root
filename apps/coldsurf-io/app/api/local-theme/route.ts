import { COOKIE_THEME } from '@/libs/constants';
import { createCommonCookieOptions } from '@/libs/utils';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { theme } = (await request.json()) as {
    theme: 'dark' | 'light';
  };

  const res = NextResponse.json({ success: true });
  res.cookies.set(
    COOKIE_THEME,
    theme,
    createCommonCookieOptions({
      maxAge: 60 * 60 * 24 * 365 * 10,
    })
  );

  return res;
}
