import { SITE_URL } from '@/libs/constants';
import { metadataInstance } from '@/libs/metadata';
import { APP_STORE_URL, SERVICE_NAME } from '@coldsurfers/shared-utils';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';

export const dynamic = 'force-static';

const description =
  '다방면 아티스트 서포트 플랫폼 COLDSURF에서 제공하는 타투 아티스트님들의 프로모션.\n지금 바로 신청해보세요!';

export function generateMetadata() {
  const title = `Tattoo | ${SERVICE_NAME}`;

  const openGraph: Metadata['openGraph'] = {
    type: 'website',
    title,
    description,
    images: [`${SITE_URL}/favicon.ico`],
    url: `${SITE_URL}/tattoo`,
  };

  return metadataInstance.generateMetadata<Metadata>({
    title,
    description,
    openGraph,
    keywords: [
      '타투',
      '타투 프로모션',
      '타투 아티스트',
      '타투 아티스트 프로모션',
      '타투 아티스트 프로모션 플랫폼',
      SERVICE_NAME,
    ],
  });
}

export default function TattooLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            metadataInstance.generateLdJson({
              type: 'WebPageAbout',
              url: `${SITE_URL}/tattoo`,
              name: SERVICE_NAME,
              image: `${SITE_URL}/favicon.ico`,
              sameAs: [APP_STORE_URL, SITE_URL],
              description,
            })
          ),
        }}
      />
    </>
  );
}
