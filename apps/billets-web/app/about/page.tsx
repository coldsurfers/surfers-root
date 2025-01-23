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
