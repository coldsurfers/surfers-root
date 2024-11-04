import {
  AuthStoreProvider,
  OceanRoadThemeRegistry,
  QueryClientRegistry,
  RegistryProvider,
  StyleSheetRegistry,
  StyledComponentsRegistry,
} from '@/libs/registries'
import type { Metadata } from 'next'
import { Noto_Sans as notoSans } from 'next/font/google'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'
import LayoutWrapper from '../components/LayoutWrapper'
import { COOKIES } from '../libs/constants'

const notoSansFont = notoSans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '예정된 많은 공연을 놓치지 마세요 🎉 | COLDSURF',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const accessToken = cookies().get(COOKIES.ACCESS_TOKEN)?.value
  const refreshToken = cookies().get(COOKIES.REFRESH_TOKEN)?.value

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" type="image/png" />
      </head>
      <body className={notoSansFont.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const theme = systemDark ? 'dark' : 'light';
              document.documentElement.setAttribute('data-theme', theme);
          `,
          }}
        />
        <RegistryProvider registries={[StyledComponentsRegistry, StyleSheetRegistry, OceanRoadThemeRegistry]}>
          <AuthStoreProvider accessToken={accessToken} refreshToken={refreshToken}>
            <QueryClientRegistry>
              <LayoutWrapper>{children}</LayoutWrapper>
            </QueryClientRegistry>
          </AuthStoreProvider>
        </RegistryProvider>
      </body>
    </html>
  )
}
