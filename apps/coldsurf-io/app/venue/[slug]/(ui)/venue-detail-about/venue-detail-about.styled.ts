import { Text, media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledTitleText = styled(Text)`
  font-size: 28px;

  ${media.large(css`
    font-size: 20px;
  `)}
`;
