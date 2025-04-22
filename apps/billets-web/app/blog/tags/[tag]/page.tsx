import { getQueryClient } from '@/libs/utils/utils.query-client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { TEMP_FIXED_APP_LOCALE } from 'app/blog/(constants)'
import { queryTags } from 'app/blog/(notion)/query'
import { queryKeyFactory } from 'app/blog/(react-query)/react-query.key-factory'
import { TagPostList } from './(ui)'

export async function generateStaticParams() {
  const allTags = await queryTags()
  const params = allTags.map((tag) => {
    return {
      tag: tag.name,
    }
  })
  return params
}

export default async function TagDetailPage(props: {
  params: Promise<{
    tag: string
  }>
}) {
  const params = await props.params
  const { tag } = params
  const decodedTag = decodeURIComponent(tag)

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(queryKeyFactory.series.listAll(TEMP_FIXED_APP_LOCALE, decodedTag))
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <TagPostList locale={TEMP_FIXED_APP_LOCALE} tag={decodedTag} />
    </HydrationBoundary>
  )
}
