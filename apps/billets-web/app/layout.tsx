import {
  FirebaseRegistry,
  GlobalErrorBoundaryRegistry,
  OceanRoadThemeRegistry,
  QueryClientRegistry,
  RegistryProvider,
} from '@/libs/registries'
import type { Metadata } from 'next'
import { Noto_Sans as notoSans } from 'next/font/google'
import { ReactNode } from 'react'
import { AppLayout } from './(ui)'

const notoSansFont = notoSans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discover live events and tickets | Browser tickets on Billets',
  icons: {
    icon: '/logo.png',
  },
}

export default async function RootLayout({ children }: { children: ReactNode }) {
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
        <RegistryProvider registries={[OceanRoadThemeRegistry, FirebaseRegistry]}>
          <GlobalErrorBoundaryRegistry>
            <QueryClientRegistry>
              <AppLayout>{children}</AppLayout>
            </QueryClientRegistry>
          </GlobalErrorBoundaryRegistry>
        </RegistryProvider>
      </body>
    </html>
  )
}
