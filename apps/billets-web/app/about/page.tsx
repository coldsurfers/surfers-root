import { generateBilletsLdJson, generateBilletsMetadata } from '@/libs/utils'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return generateBilletsMetadata({
    title: 'Story and Mission | About Billets and COLDSURF',
  })
}

export default function AboutPage() {
  return (
    <div>
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
    </div>
  )
}
