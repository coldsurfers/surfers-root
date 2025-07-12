'use client';

import { TextInput, breakpoints, media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FLOATING_SEARCH_BAR_TOP } from './floating-search-bar.constants';

export const FloatingSearchBarWrapper = styled.div`
  position: fixed;
  top: ${FLOATING_SEARCH_BAR_TOP};
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const FloatingSearchTextInput = styled(TextInput)`
  width: ${breakpoints.medium}px;
  /* prevent mobile zoom autofocus, must be larger than 16px */
  font-size: 16px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

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
