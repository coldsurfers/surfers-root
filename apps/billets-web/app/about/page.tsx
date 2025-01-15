import { metadataInstance } from '@/libs/metadata'
import { ApiErrorBoundaryRegistry } from '@/libs/registries'
import { generateBilletsLdJson } from '@/libs/utils'
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
            generateBilletsLdJson({
              type: 'WebSite',
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
