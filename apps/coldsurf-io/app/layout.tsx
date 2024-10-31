import { AuthStoreProvider, RegistryProvider, StyleSheetRegistry, StyledComponentsRegistry } from '@/libs/registries'
import '@coldsurfers/hotsurf/global-light-only.css'
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
      <head></head>
      <body className={[notoSansFont.className].join(' ')}>
        <RegistryProvider registries={[StyledComponentsRegistry, StyleSheetRegistry]}>
          <AuthStoreProvider accessToken={accessToken} refreshToken={refreshToken}>
            <LayoutWrapper>{children}</LayoutWrapper>
          </AuthStoreProvider>
        </RegistryProvider>
      </body>
    </html>
  )
}
