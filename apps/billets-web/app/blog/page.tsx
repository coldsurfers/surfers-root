import { PageLayout } from './(components)/page-layout'
import { SeriesListAllQuery } from './(components)/series-list-all-query'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function RootPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const pageParam = searchParams.page
  const page = pageParam ? Number(pageParam) : 1

  return (
    <PageLayout>
      <SeriesListAllQuery page={page} />
    </PageLayout>
  )
}
