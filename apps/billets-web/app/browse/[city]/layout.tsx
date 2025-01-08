import { PropsWithChildren } from 'react'
import { PageProps } from 'types'
import { Navigation } from './(components)'

export default function BrowseByCityLayout({
  children,
  params,
}: PropsWithChildren<
  PageProps<{
    city: string
  }>
>) {
  return (
    <>
      <Navigation initialCity={params.city} />
      {children}
    </>
  )
}
