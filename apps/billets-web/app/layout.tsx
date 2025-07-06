import {
  APP_STORE_URL,
  COMMON_META_DESCRIPTION,
  COMMON_META_TITLE,
  COOKIE_THEME,
  SITE_URL,
} from '@/libs/constants';
import { metadataInstance } from '@/libs/metadata';
import { apiClient } from '@/libs/openapi-client';
import {
  FirebaseRegistry,
  GlobalErrorBoundaryRegistry,
  OceanRoadThemeRegistry,
  QueryClientRegistry,
  RegistryProvider,
} from '@/libs/registries';
import { getQueryClient } from '@/libs/utils';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import { pretendard } from '../libs/font';
import { AppLayout } from './(ui)';

export const metadata: Metadata = {
  ...metadataInstance.generateMetadata<Metadata>({
    title: COMMON_META_TITLE,
    description: COMMON_META_DESCRIPTION,
    openGraph: {
      siteName: SERVICE_NAME,
      title: COMMON_META_TITLE,
      description: COMMON_META_DESCRIPTION,
    },
  }),
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get(COOKIE_THEME)?.value ?? '';

  try {
    // do not use prefetchQuery, because it will not cause error if server side error is occurred. So catch phrase won't be executed.
    await queryClient.prefetchQuery({
      queryKey: apiClient.user.queryKeys.me,
      queryFn: () => apiClient.user.getMe(),
    });
  } catch {
    // if not logged in, set query data to null (for not csr fetch again)
    // await queryClient.setQueryData(apiClient.user.queryKeys.me, null, {
    //   updatedAt: Date.now(),
    // });
  }

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  return (
    <html lang="en" className={cookieTheme ? `${cookieTheme}` : 'light'}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png" />
        <meta name="naver-site-verification" content="9d79fd58f37f9330e72dddbb8ad64f08cbd6e11e" />
      </head>
      <body className={pretendard.className}>
        {/* do not use this theme control */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const theme = systemDark ? 'dark' : 'light';
              document.documentElement.setAttribute('data-theme', theme);
            `,
          }}
        /> */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                  var themeStorage = '@coldsurf-io/theme';

                  function setTheme(newTheme) {
                    window.__theme = newTheme;
                    if (newTheme === 'dark') {
                      document.documentElement.classList.add('dark');
                    } else if (newTheme === 'light') {
                      document.documentElement.classList.remove('dark');
                    }
                  }

                  var preferredTheme;
                  try {
                    preferredTheme = localStorage.getItem(themeStorage);
                  } catch (err) { }

                  window.__setPreferredTheme = function(newTheme) {
                    preferredTheme = newTheme;
                    setTheme(newTheme);
                    try {
                      localStorage.setItem(themeStorage, newTheme);
                    } catch (err) {
                      console.error(err);
                    }
                  };

                  var initialTheme = preferredTheme;
                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

                  if (!initialTheme) {
                    initialTheme = darkQuery.matches ? 'dark' : 'light';
                  }
                  // setTheme(initialTheme);

                  darkQuery.addEventListener('change', function (e) {
                    if (!preferredTheme) {
                      setTheme(e.matches ? 'dark' : 'light');
                    }
                  });

                  // Detect whether the browser is Mac to display platform specific content
                  // An example of such content can be the keyboard shortcut displayed in the search bar
                  // document.documentElement.classList.add(
                  //     window.navigator.platform.includes('Mac')
                  //     ? "platform-mac"
                  //     : "platform-win"
                  // );
              })();
          `,
          }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              metadataInstance.generateLdJson({
                type: 'Brand',
                image: `${SITE_URL}/favicon.ico`,
                logo: `${SITE_URL}/favicon.ico`,
                url: SITE_URL,
                name: SERVICE_NAME,
                sameAs: [APP_STORE_URL, 'https://coldsurf.io', 'https://blog.coldsurf.io'],
              })
            ),
          }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              metadataInstance.generateLdJson({
                type: 'WebSite',
                url: SITE_URL,
                name: SERVICE_NAME,
              })
            ),
          }}
        />
        <RegistryProvider registries={[OceanRoadThemeRegistry, FirebaseRegistry]}>
          <GlobalErrorBoundaryRegistry>
            <QueryClientRegistry>
              <HydrationBoundary state={dehydratedState}>
                <AppLayout>{children}</AppLayout>
              </HydrationBoundary>
            </QueryClientRegistry>
          </GlobalErrorBoundaryRegistry>
        </RegistryProvider>
      </body>
    </html>
  );
}
