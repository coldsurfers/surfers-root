'use client';

import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { match } from 'ts-pattern';

type Props = {
  type: 'twitter' | 'facebook';
};

const StyledShareButton = styled.img``;

export const ShareButton = forwardRef<HTMLImageElement, Props>(({ type }, ref) => {
  return match(type)
    .with('twitter', () => <StyledShareButton ref={ref} src="/icons/sns/x/logo.svg" />)
    .with('facebook', () => (
      <StyledShareButton ref={ref} src="/icons/sns/facebook/Facebook_Logo_Primary.png" />
    ))
    .exhaustive();
});
