import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { PageProps } from 'types/common-types'

function PageInner({ params }: PageProps<{ ['venue-id']: string }>) {
  return null
}

export default function VenueDetailPage(pageProps: PageProps<{ ['venue-id']: string }>) {
  return (
    <ApiErrorBoundaryRegistry>
      <PageInner {...pageProps} />
    </ApiErrorBoundaryRegistry>
  )
}
