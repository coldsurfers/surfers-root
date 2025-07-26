'use client';

import { Text } from '@coldsurfers/ocean-road';
import { StyledHeroInfo } from './hero-info.styled';
import type { HeroInfoProps } from './hero-info.types';

export const HeroInfo = (props: HeroInfoProps) => {
  return (
    <StyledHeroInfo>
      <Text as="h1" style={{ margin: 'unset' }}>
        {props.title}
      </Text>
      <Text as="p" style={{ margin: 'unset' }}>
        {props.subtitle}
      </Text>
    </StyledHeroInfo>
  );
};
