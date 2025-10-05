import { breakpoints, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const SearchResultWrapper = styled.div`
  background-color: ${semantics.color.background[2]};

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  position: absolute;
  left: 50%;
  top: 64px;
  transform: translateX(-50%);

  border-radius: 1rem;
  padding: 1rem;

  width: ${breakpoints.medium}px;
  max-height: 520px;
  overflow-y: auto;

  display: flex;
  flex-direction: column;

  ${media.large(css`
    width: calc(${breakpoints.medium}px - 2rem);
  `)}

  ${media.medium(css`
    width: calc(${breakpoints.small}px - 2rem);
  `)}

  ${media.small(css`
    width: calc(100vw - 2rem);
  `)}
`;
