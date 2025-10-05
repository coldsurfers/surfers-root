import { SITE_URL } from '@/libs/constants';
import { metadataInstance } from '@/libs/metadata';
import { APP_STORE_URL, SERVICE_NAME } from '@coldsurfers/shared-utils';
import { AboutPageLayout } from 'app/(ui)/about-page-layout';
import type { Metadata } from 'next/types';

export const dynamic = 'force-static';

const description =
  '다방면 아티스트 서포트 플랫폼 COLDSURF에서 소규모 브랜드 홍보, 티켓 판매, 공연 홍보 등을 할 수 있습니다.\n지금 바로 신청해보세요!';

export function generateMetadata() {
  const title = `입점하기 | ${SERVICE_NAME}`;

  const openGraph: Metadata['openGraph'] = {
    type: 'website',
    title,
    description,
    url: `${SITE_URL}/store/registration`,
  };
  return metadataInstance.generateMetadata<Metadata>({
    title,
    description,
    openGraph,
    keywords: [
      '입점하기',
      SERVICE_NAME,
      '티켓 판매',
      '공연 홍보',
      '브랜드 홍보',
      '아티스트 서포트',
      '서포트 플랫폼',
      '티켓 판매 플랫폼',
      '공연 홍보 플랫폼',
      '브랜드 홍보 플랫폼',
      '아티스트 서포트 플랫폼',
      '소규모 브랜드',
      '소규모 브랜드 홍보',
      '셀프 브랜딩',
      '개인 브랜드 홍보',
    ],
  });
}

export default function StoreRegistrationLayout({ children }: { children: React.ReactNode }) {
  return (
    <AboutPageLayout>
      {children}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            metadataInstance.generateLdJson({
              type: 'WebPageAbout',
              url: `${SITE_URL}/store/registration`,
              name: SERVICE_NAME,
              image: `${SITE_URL}/favicon.ico`,
              sameAs: [APP_STORE_URL, SITE_URL],
              description,
            })
          ),
        }}
      />
    </AboutPageLayout>
  );
}
