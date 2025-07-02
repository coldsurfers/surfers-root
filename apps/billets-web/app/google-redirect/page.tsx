import { COOKIE_ACCESS_TOKEN_KEY, COOKIE_REFRESH_TOKEN_KEY } from '@/libs/constants';
import { useAuthStore } from '@/libs/stores';
import { cookies } from 'next/headers';
import { useEffect } from 'react';
import { CookieInject } from './(ui)/cookie-inject';

export default async function GoogleRedirectPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY)?.value ?? '';
  const refreshToken = cookieStore.get(COOKIE_REFRESH_TOKEN_KEY)?.value ?? '';

  return <CookieInject accessToken={accessToken} refreshToken={refreshToken} />;
}
