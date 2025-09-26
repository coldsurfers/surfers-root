'use client';

import { logEvent } from '@/features/firebase/firebase';
import { useSurveyStore } from '@/features/survey';
import { FloatingSurveyButton } from '@/shared/ui';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import pkg from '../../../package.json';
import { StyledPageLayoutUI } from './page-layout-ui.styled';

export const PageLayoutUI = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const miniSurveyCompleted = useSurveyStore((state) => state.miniSurveyCompleted);

  return (
    <StyledPageLayoutUI $isHome={pathname === '/'}>
      {children}
      {pkg.featureFlags.useSurveyFeature && !miniSurveyCompleted && (
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
