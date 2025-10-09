import { COOKIE_ACCESS_TOKEN_KEY, COOKIE_REFRESH_TOKEN_KEY } from '@/libs/constants';
import { createCommonCookieOptions } from '@/libs/utils';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();

  const responseCookie = cookieStore
    .set(
      COOKIE_ACCESS_TOKEN_KEY,
      '',
      createCommonCookieOptions({
        maxAge: 0,
      })
    )
    .set(
      COOKIE_REFRESH_TOKEN_KEY,
      '',
      createCommonCookieOptions({
        maxAge: 0,
      })
    )
    .toString();

  return new Response('local logout', {
    status: 200,
    headers: {
      'Set-Cookie': responseCookie,
    },
  });
}
