import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { shevilData } from './(data)'

export const metadata: Metadata = {
  title: 'Shevil | SurfTree',
  description: shevilData.subtitle,
  icons: {
    icon: '/icons/favicon.ico',
  },
}

export default function ShevilLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
