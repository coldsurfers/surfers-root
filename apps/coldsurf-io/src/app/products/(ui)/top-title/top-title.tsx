'use client';

import {
  StyledSmallTopTitle,
  StyledSmallTopTitleContainer,
  StyledTopTitle,
  StyledTopTitleContainer,
  StyledTopTitleInner,
} from './top-title.styled';

export function TopTitle() {
  return (
    <StyledTopTitleContainer>
      <StyledTopTitleInner>
        <StyledTopTitle as="h1">{'A COLDSURF products\nto support every artists'}</StyledTopTitle>
        <StyledSmallTopTitleContainer>
          <StyledSmallTopTitle>
            {
              'We are trying to help to create your own artist life with monetizing by your own arts. We are dedicated to contributing to the diversity of the music industry. We will help revitalize local-based performances and support generating revenue through music.'
            }
          </StyledSmallTopTitle>
        </StyledSmallTopTitleContainer>
      </StyledTopTitleInner>
    </StyledTopTitleContainer>
  );
}
