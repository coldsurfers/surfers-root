import Script from 'next/script'

import { OceanRoadThemeRegistry, QueryClientRegistry } from '@/lib'
import { SITE_URL } from '@/lib/constants'
import { metadataInstance } from '@/lib/metadata/metadata-instance'
import { queryKeyFactory } from '@/lib/react-query/react-query.key-factory'
import { getQueryClient } from '@/lib/react-query/react-query.utils'
import { AppLocale } from '@/lib/types/i18n'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { routing } from 'i18n/routing'
import { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Noto_Sans_KR } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ReactNode, Suspense } from 'react'

const notoSansKR = Noto_Sans_KR({ subsets: ['latin'] })

const metaTitle = 'COLDSURF Blog: Latest News and Blogs'
const metaDescription = 'Updates from COLDSURF'

const og: Metadata['openGraph'] = {
  url: SITE_URL,
  type: 'website',
  title: metaTitle,
  description: metaDescription,
  images: {
    url: `${SITE_URL}/icons/favicon.ico`,
  },
  siteName: 'COLDSURF Blog',
}

const alternates: Metadata['alternates'] = {
  canonical: SITE_URL,
  languages: routing.locales.reduce(
    (acc, locale) => ({
      ...acc,
      [locale]: `${SITE_URL}/${locale}`,
    }),
    {},
  ),
}

const meta = metadataInstance.generateMetadata<Metadata>({
  title: metaTitle,
  description: metaDescription,
  openGraph: og,
  alternates,
})

export const metadata: Metadata = meta

export const revalidate = 3600

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout(props: { params: Promise<{ locale: AppLocale }>; children: ReactNode }) {
  const params = await props.params

  const { children } = props

  const { locale } = params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(queryKeyFactory.series.listAll(params.locale))

  const dehydratedState = dehydrate(queryClient)

  return (
    <html lang={locale}>
      <head>
        {/* google search console */}
        <meta name="google-site-verification" content="t8pam4eI0ydfgF_W2Js3Q9bdfCsbvZA83PSE2JDh1ww" />
        {/* <!-- Google tag (gtag.js) --> */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-VDP9GWZWGR" />
        {process.env.NODE_ENV === 'production' && (
          <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-VDP9GWZWGR');
        `}
          </Script>
        )}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" type="image/png" />
      </head>
      <body className={notoSansKR.className}>
        {/* {colorScheme === 'userPreference' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
              const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const theme = systemDark ? 'dark' : 'light';
              document.documentElement.setAttribute('data-theme', theme);
          `,
            }}
          />
        )} */}
        <script
          // https://github.com/reactjs/react.dev/blob/4bae717f59787b4c741f600ee2d2decb07fba226/src/pages/_document.tsx#L103
          dangerouslySetInnerHTML={{
            __html: `
                (function () {
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
                    preferredTheme = localStorage.getItem('theme');
                  } catch (err) { }

                  window.__setPreferredTheme = function(newTheme) {
                    preferredTheme = newTheme;
                    setTheme(newTheme);
                    try {
                      localStorage.setItem('theme', newTheme);
                    } catch (err) { }
                  };

                  var initialTheme = preferredTheme;
                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

                  if (!initialTheme) {
                    initialTheme = darkQuery.matches ? 'dark' : 'light';
                  }
                  setTheme(initialTheme);

                  darkQuery.addEventListener('change', function (e) {
                    if (!preferredTheme) {
                      setTheme(e.matches ? 'dark' : 'light');
                    }
                  });

                  // Detect whether the browser is Mac to display platform specific content
                  // An example of such content can be the keyboard shortcut displayed in the search bar
                  document.documentElement.classList.add(
                      window.navigator.platform.includes('Mac')
                      ? "platform-mac"
                      : "platform-win"
                  );
                })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              metadataInstance.generateLdJson({
                type: 'WebSite',
                name: 'COLDSURF Blog',
                url: SITE_URL,
              }),
            ),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <OceanRoadThemeRegistry>
            <QueryClientRegistry>
              <Suspense>
                <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
              </Suspense>
            </QueryClientRegistry>
          </OceanRoadThemeRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
