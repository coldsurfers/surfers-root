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
        <StyledTopTitle as="h1">{'모든 아티스트를 지원하는 COLDSURF의 제품'}</StyledTopTitle>
        <StyledSmallTopTitleContainer>
          <StyledSmallTopTitle>
            {
              '우리는 아티스트가 자신의 예술로 수익을 창출하며, 자신만의 예술적 삶을 만들어가도록 돕습니다.\n음악 산업의 다양성에 기여하는 것에 헌신하며, 로컬 기반 공연을 되살리고 음악을 통한 지속 가능한 수익 창출을 지원합니다.'
            }
          </StyledSmallTopTitle>
        </StyledSmallTopTitleContainer>
      </StyledTopTitleInner>
    </StyledTopTitleContainer>
  );
}
