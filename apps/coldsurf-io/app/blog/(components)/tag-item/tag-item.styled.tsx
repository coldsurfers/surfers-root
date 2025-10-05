import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledTagItem = styled.div`
  background-color: ${semantics.color.background[4]};
  opacity: 0.8;
  padding: 0.75rem;
  border-radius: 24px;
  cursor: pointer;

  margin-right: 0.5rem;
  margin-bottom: 0.5rem;

  color: ${semantics.color.foreground[3]};

  ${media.small(css`
    padding: 0.5rem;
  `)}
`;

export const StyledTagItemText = styled(Text)`
  margin: unset;
  font-size: 1rem;

  ${media.small(css`
    font-size: 14px;
  `)}
`;
