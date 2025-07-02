import { COOKIE_ACCESS_TOKEN_KEY, COOKIE_REFRESH_TOKEN_KEY } from '@/libs/constants';
import { cookies } from 'next/headers';
import { CookieInject } from './(ui)/cookie-inject';

export default async function SocialRedirectPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY)?.value ?? '';
  const refreshToken = cookieStore.get(COOKIE_REFRESH_TOKEN_KEY)?.value ?? '';

  return <CookieInject accessToken={accessToken} refreshToken={refreshToken} />;
}
