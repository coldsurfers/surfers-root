'use client';

import type { components } from '@coldsurfers/api-sdk';
import { useState } from 'react';
import {
  StyledAboutButton,
  StyledAboutContainer,
  StyledAboutImage,
  StyledAboutShowMoreGradation,
} from './about.styled';

type AboutProps = {
  detailImages: components['schemas']['DetailImageDTOSchema'][];
};

export const About = ({ detailImages }: AboutProps) => {
  const [isFolded, setIsFolded] = useState(true);
  return (
    <>
      <StyledAboutContainer $isFolded={isFolded}>
        {detailImages.map((image) => (
          <StyledAboutImage key={image.id} src={image.url} alt={'Detail Image'} />
        ))}
        {isFolded && <StyledAboutShowMoreGradation />}
      </StyledAboutContainer>
      <StyledAboutButton onClick={() => setIsFolded(!isFolded)}>
        {isFolded ? '더보기' : '접기'}
      </StyledAboutButton>
    </>
  );
};
