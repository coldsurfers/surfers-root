import { PageLayout } from '../(components)/page-layout'
import { SeriesCategory } from '../(types)/series'
import { convertSeriesCategoryToTitle } from '../(utils)'
import { SeriesListItems } from './(component)/series-list-items'

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
      <SeriesListItems seriesCategory={params.series} page={page} />
    </PageLayout>
  )
}
