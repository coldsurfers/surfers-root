import { initializeApollo, OceanRoadThemeRegistry } from '@/libs'
import { ME_QUERY } from 'gql/queries'
import { Noto_Sans_KR } from 'next/font/google'
import { cookies } from 'next/headers'
import { Suspense } from 'react'
import { RootLayoutClient } from './layout.client'

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const apolloClient = initializeApollo({
    token: accessToken,
  })

  try {
    await apolloClient.query({
      query: ME_QUERY,
    })
  } catch (e) {
    console.error(e)
  }

  const initialState = JSON.parse(JSON.stringify(apolloClient.cache.extract()))

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
  )
}
