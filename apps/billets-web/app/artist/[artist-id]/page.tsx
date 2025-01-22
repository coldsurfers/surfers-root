import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { PageProps } from 'types/common-types'

function PageInner({ params }: PageProps<{ ['artist-id']: string }>) {
  return null
}

export default function ArtistDetailPage(pageProps: PageProps<{ ['artist-id']: string }>) {
  return (
    <ApiErrorBoundaryRegistry>
      <PageInner {...pageProps} />
    </ApiErrorBoundaryRegistry>
  )
}
