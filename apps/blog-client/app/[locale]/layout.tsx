import Script from 'next/script'

import { OceanRoadThemeRegistry, QueryClientRegistry } from '@/lib'
import { PageLayout } from '@/ui'
import { routing } from 'i18n/routing'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Noto_Sans_KR } from 'next/font/google'
import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'

const notoSansKR = Noto_Sans_KR({ subsets: ['latin'] })

const metaTitle = 'Blog | Coldsurf'
const metaDescription = 'blog, about software techs and tech industry.'

export const metadata = {
  title: metaTitle,
  description: metaDescription,
}

export default async function RootLayout({
  children,
  params: { locale },
}: PropsWithChildren<{
  params: { locale: string }
}>) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as never)) {
    // redirect({ href: '/', locale: 'en' })
    notFound()
  }

  setRequestLocale(locale)

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png" />
      </head>
      <body className={notoSansKR.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const theme = systemDark ? 'dark' : 'light';
              document.documentElement.setAttribute('data-theme', theme);
          `,
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <OceanRoadThemeRegistry>
            <QueryClientRegistry>
              <PageLayout>{children}</PageLayout>
            </QueryClientRegistry>
          </OceanRoadThemeRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
