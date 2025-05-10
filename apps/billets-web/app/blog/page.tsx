'use client'

import { useSearchParams } from 'next/navigation'
import { PageLayout } from './(components)/page-layout'
import { SeriesListAll } from './(components)/series-list-all'

export default function RootPage() {
  const value = useSearchParams()
  const page = value.get('page') ? Number(value.get('page')) : 1

  return (
    <PageLayout>
      <SeriesListAll page={page} />
    </PageLayout>
  )
}
