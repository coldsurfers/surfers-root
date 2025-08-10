import { COMMON_META_DESCRIPTION } from '@/libs/constants';
import { metadataInstance } from '@/libs/metadata';
import { ApiErrorBoundaryRegistry } from '@/libs/registries';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';
import type { Metadata } from 'next';
import { AboutPageLayout, LandingImage, LandingSection, LandingText, LandingYoutube } from './(ui)';

function PageInner() {
  return (
    <div>
      <LandingSection>
        <LandingText
          bigTitle={'당신의 예술적인\n삶을 위한 모든 것'}
          smallTitle={
            '로컬이 사라지면, 음악도 사라집니다.\n우리는 아티스트가 자신의 무대를 지킬 수 있도록 돕습니다.\n로컬 공연을 되살리고, 음악을 통한 지속 가능한 수익을 만듭니다.\n예술의 다양성을 지키는 것, 그것이 우리의 사명입니다.'
          }
        />
        <LandingImage
          imageUrls={[
            '/landing-image/not_image1.png',
            '/landing-image/not_image2.png',
            '/landing-image/not_image3.png',
            '/landing-image/not_image4.png',
          ]}
        />
      </LandingSection>
      <LandingSection reversed withoutInitialPaddingTop>
        <LandingText
          bigTitle={'첫걸음으로,\n티켓 소개 서비스를 만들었습니다.'}
          smallTitle={
            '2019년 영국에서, 로컬 공연 문화를 쉽게 즐길 수 있다는 걸 처음 경험했습니다.\n그때 알게 된 DICE 앱의 멋진 UI·UX와 간단한 시스템은 큰 영감을 주었습니다.\n하지만 한국은 로컬 공연장이 부족해\n재능 있는 아티스트들이 설 무대가 많지 않습니다.\n그래서 저는 COLDSURF를 만들어,\n한국에서부터 아티스트와 공연장이 함께 성장하는 생태계를 만들고자 합니다.'
          }
        />
        <LandingImage
          imageUrls={[
            'https://images.unsplash.com/photo-1723100350314-1629cf301c8b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1507901747481-84a4f64fda6d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1472653816316-3ad6f10a6592?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1622817245531-a07976979cf5?q=80&w=2641&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1553877690-c351cc96375a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          ]}
        />
      </LandingSection>
      <LandingSection>
        <LandingText
          bigTitle={'영감의 시작,\n이 영상에서 확인하세요.'}
          smallTitle={'Rick Beato의 영상: 밴드가 사라지는 이유에 대하여'}
        />
        <LandingYoutube />
      </LandingSection>
      <LandingSection reversed withoutInitialPaddingTop>
        <LandingText
          bigTitle={'COLDSURF의\n다음 발걸음'}
          smallTitle={
            '우리는 Linktree처럼 아티스트를 지원하고, Reverb처럼 중고 악기 거래 생태계를 만들고자 합니다. 예술과 공연을 넘어, 창작과 문화 전반으로 영역을 확장해 나갈 것입니다.'
          }
        />
        <LandingImage
          imageUrls={[
            'https://images.unsplash.com/photo-1723100350314-1629cf301c8b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1507901747481-84a4f64fda6d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1472653816316-3ad6f10a6592?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1622817245531-a07976979cf5?q=80&w=2641&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1553877690-c351cc96375a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          ]}
        />
      </LandingSection>
    </div>
  );
}

export default function AboutPage() {
  return (
    <ApiErrorBoundaryRegistry>
      <PageInner />
    </ApiErrorBoundaryRegistry>
  );
}
