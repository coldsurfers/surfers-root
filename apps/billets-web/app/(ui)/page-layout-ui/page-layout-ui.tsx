'use client';

import { logEvent } from '@/features/firebase/firebase';
import { useHasSurveyHydrated, useSurveyStore } from '@/features/survey';
import { FloatingSurveyButton } from '@/shared/ui';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import pkg from '../../../package.json';
import { StyledPageLayoutUI } from './page-layout-ui.styled';

export const PageLayoutUI = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const hasHydrated = useHasSurveyHydrated();
  const miniSurveyCompleted = useSurveyStore((state) => state.miniSurveyCompleted);

  // Hydration이 완료되지 않았거나 설문조사가 완료되지 않은 경우에만 버튼 표시
  const shouldShowSurveyButton =
    hasHydrated && pkg.featureFlags.useSurveyFeature && !miniSurveyCompleted;

  return (
    <StyledPageLayoutUI $isHome={pathname === '/'}>
      {children}
      {shouldShowSurveyButton && (
        <FloatingSurveyButton
          onClick={() => {
            logEvent({
              name: 'click_survey_floating_button',
              params: {},
            });
          }}
        />
      )}
    </StyledPageLayoutUI>
  );
};
