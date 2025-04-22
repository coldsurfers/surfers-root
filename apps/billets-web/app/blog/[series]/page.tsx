import { PageLayout } from '../(components)/page-layout'
import { SeriesCategory } from '../(types)/series'
import { convertSeriesCategoryToTitle } from '../(utils)'
import { SeriesListQuery } from './(component)/series-list-query'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function SeriesPage(props: {
  params: Promise<{ series: SeriesCategory }>
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const pageParam = searchParams.page
  const page = pageParam ? Number(pageParam) : 1

  return (
    <PageLayout title={convertSeriesCategoryToTitle(params.series)}>
      <SeriesListQuery seriesCategory={params.series} page={page} />
    </PageLayout>
  )
}
