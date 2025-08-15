import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

export const StyledHeaderLinkBadge = styled(Link)<{ $isactive?: 'true' }>`
  border-radius: 2rem;
  border: 1px solid ${semantics.color.border[2]};
  padding: 0.75rem;

  ${(props) =>
    props.$isactive &&
    css`
      background-color: ${semantics.color.background[4]};
    `}
`;

export const StyledHeaderHeading = styled(Text)<{ $isactive?: 'true' }>`
  text-transform: uppercase;
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
  font-weight: bold;

  ${(props) =>
    props.$isactive &&
    css`
      background-color: ${semantics.color.background[4]};
    `}

  ${media.medium(css`
    font-size: 1.25rem;
  `)}

  ${media.small(css`
    font-size: 1rem;
  `)}
`;

export const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-top: 24px;

  overflow-x: scroll;
  scrollbar-width: none; /* For Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.small(css`
    justify-content: flex-start;
    gap: 10px;
  `)}
`;

export const StyledHeaderBigContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 0px 0px 0px;

  ${media.large(css`
    padding: 0px 0px 0px 0px;
  `)}
`;

export const StyledTitleAndColorScheme = styled.div`
  display: flex;
`;

export const StyledHeaderTitle = styled(Text)`
  margin: unset;
`;
