'use client';

import styled from '@emotion/styled';

const StyledAppLogo = styled.div<{ $circle?: boolean }>`
  background-image: url('/logo.png');
  background-size: cover;
  background-position: 50%;;
  border-radius: ${({ $circle }) => ($circle ? '50%' : '12px')};
`;

interface Props {
  type?: 'round' | 'square';
}

export const AppLogo = ({ type = 'round', ...otherProps }: Props) => {
  return <StyledAppLogo $circle={type === 'round'} {...otherProps} />;
};
