import { SITE_URL } from '@/libs/constants';
import { metadataInstance } from '@/libs/metadata';
import { APP_STORE_URL, SERVICE_NAME } from '@coldsurfers/shared-utils';
import { AboutPageLayout } from 'app/(ui)/about-page-layout';

const description = `다방면 문화예술 플랫폼 ${SERVICE_NAME}는 문화 예술 업계 종사자분들의 고충을 듣고, 함께 해결해나가는 파트너이기도 합니다.\n서로의 상생을 위한 협업 문화를 만들어 가고 있습니다.`;

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
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
              url: `${SITE_URL}/partners`,
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
