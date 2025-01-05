import { apiClient } from '@/libs/openapi-client'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { getQueryClient } from '@/libs/utils'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { PageProps } from 'types'

async function validateEventIdParam(eventId: string) {
  if (!eventId) {
    return {
      isValid: false,
      data: null,
    } as const
  }
  try {
    const data = await apiClient.concerts.getConcertById(eventId)
    return {
      isValid: true,
      data,
    } as const
  } catch (e) {
    return {
      isValid: false,
      data: null,
    } as const
  }
}

export function generateMetadata(): Metadata {
  return {
    title: 'Billets | Discover shows around the world',
    description:
      'Billets is a platform to find live shows around the world. Download Billets to see live shows in your city.',
  }
}

export async function PageInner({ params }: PageProps<{ ['event-id']: string }>) {
  const validation = await validateEventIdParam(params['event-id'])
  if (!validation.isValid) {
    return redirect('/404')
  }
  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: apiClient.concerts.queryKeys.getConcertById(params['event-id']),
      queryFn: () => apiClient.concerts.getConcertById(params['event-id']),
    })
  } catch (e) {
    console.error(e)
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>Hello!</div>
    </HydrationBoundary>
  )
}

export default async function EventDetailPage(props: PageProps<{ ['event-id']: string }>) {
  return (
    <ApiErrorBoundaryRegistry>
      <PageInner {...props} />
    </ApiErrorBoundaryRegistry>
  )
}
