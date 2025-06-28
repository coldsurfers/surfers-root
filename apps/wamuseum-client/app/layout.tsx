import { OceanRoadThemeRegistry, initializeApollo } from '@/libs';
import { COOKIE_ACCESS_TOKEN_KEY, COOKIE_REFRESH_TOKEN_KEY } from '@/utils/constants';
import { Noto_Sans_KR } from 'next/font/google';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { MeDocument } from 'src/__generated__/graphql';
import { RootLayoutClient } from './layout.client';

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY)?.value;
  const refreshToken = cookieStore.get(COOKIE_REFRESH_TOKEN_KEY)?.value;
  const apolloClient = initializeApollo({
    accessToken,
    refreshToken,
  });

  try {
    await apolloClient.query({
      query: MeDocument,
    });
  } catch (e) {
    console.error(e);
  }

  const initialState = JSON.parse(JSON.stringify(apolloClient.cache.extract()));

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={notoSansKr.className}>
        <OceanRoadThemeRegistry>
          <Suspense>
            <RootLayoutClient token={accessToken} initialState={initialState}>
              {children}
            </RootLayoutClient>
          </Suspense>
        </OceanRoadThemeRegistry>
      </body>
    </html>
  );
}
