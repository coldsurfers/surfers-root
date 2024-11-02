import Script from 'next/script'

import { OceanRoadThemeRegistry } from '@/lib'
import { Header, PageLayout } from '@/ui'
import { Noto_Sans_KR } from 'next/font/google'
import { PropsWithChildren } from 'react'
import StyledComponentsRegistry from '../lib/registries/StyledComponentsRegistry'

const notoSansKR = Noto_Sans_KR({ subsets: ['latin'] })

const metaTitle = 'Blog | Coldsurf'
const metaDescription = 'blog, about software techs and tech industry.'

export const metadata = {
  title: metaTitle,
  description: metaDescription,
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
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
        <StyledComponentsRegistry>
          <OceanRoadThemeRegistry>
            <PageLayout>
              <Header />
              {children}
            </PageLayout>
          </OceanRoadThemeRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
