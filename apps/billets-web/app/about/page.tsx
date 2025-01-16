import { SITE_URL } from '@/libs/constants'
import { metadataInstance } from '@/libs/metadata'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { Metadata } from 'next'
import { PageTop, SubmitForm } from './(ui)'

export async function generateMetadata(): Promise<Metadata> {
  return metadataInstance.generateMetadata<Metadata>({
    title: 'Story and Mission | About Billets and COLDSURF',
  })
}

function PageInner() {
  return (
    <>
      <PageTop />
      <SubmitForm />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            metadataInstance.generateLdJson({
              type: 'WebSite',
              url: SITE_URL,
              name: 'Billets',
            }),
          ),
        }}
      />
    </>
  )
}

export default function AboutPage() {
  return (
    <ApiErrorBoundaryRegistry>
      <PageInner />
    </ApiErrorBoundaryRegistry>
  )
}
