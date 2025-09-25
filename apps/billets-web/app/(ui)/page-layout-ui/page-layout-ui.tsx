'use client';

import { logEvent } from '@/features/firebase/firebase';
import { FloatingSurveyButton } from '@/shared/ui';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import pkg from '../../../package.json';
import { StyledPageLayoutUI } from './page-layout-ui.styled';

export const PageLayoutUI = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <StyledPageLayoutUI $isHome={pathname === '/'}>
      {children}
      {pkg.featureFlags.useSurveyFeature && (
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
