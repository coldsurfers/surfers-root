import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const VenueDetailTopTitleText = styled(Text)`
  font-size: 64px;

  ${media.large(css`
    font-size: 36px;
  `)}
`;

export const VenueDetailTopSubTitleText = styled(Text)`
  font-size: 28px;
  font-style: italic;
`;

export const VenueDetailMemoText = styled(Text)`
  font-size: 28px;
  font-style: italic;

  quotes: "“" "”" "‘" "’";

  &::before {
    content: open-quote;
    font-size: 2.5rem;
    color: ${semantics.color.foreground[2]};
  }

  &::after {
    content: close-quote;
    font-size: 2.5rem;
    color: ${semantics.color.foreground[2]};
  }

  ${media.large(css`
    font-size: 18px;

    &::before {
      font-size: 1.25rem;
    }
    &::after {
      font-size: 1.25rem;
    }
  `)}
`;

export const VenueDetailTopTopLine = styled.div`
  display: flex;
  align-items: center;
`;
