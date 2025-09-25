'use client';

import { logEvent } from '@/features/firebase/firebase';
import { useLocalStorage } from '@/libs/utils/utils.storage';
import { FloatingSurveyButton } from '@/shared/ui';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import pkg from '../../../package.json';
import { StyledPageLayoutUI } from './page-layout-ui.styled';

export const PageLayoutUI = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const [surveyCompleted] = useLocalStorage('@coldsurf-io/survey-completed');

  return (
    <StyledPageLayoutUI $isHome={pathname === '/'}>
      {children}
      {pkg.featureFlags.useSurveyFeature && surveyCompleted !== 'true' && (
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
