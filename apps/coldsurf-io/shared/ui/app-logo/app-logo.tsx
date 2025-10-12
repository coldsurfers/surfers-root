'use client';

import styled from '@emotion/styled';

const StyledAppLogo = styled.div<{ $circle?: boolean; $transparent?: boolean }>`
  background-image: ${({ $transparent }) => ($transparent ? 'url("/icons/app-logo/app-logo-transparent.png")' : 'url("/logo.png")')};
  background-size: cover;
  background-position: 50%;;
  border-radius: ${({ $circle }) => ($circle ? '50%' : '12px')};
`;

interface Props {
  type?: 'round' | 'square';
  transparent?: boolean;
}

export const AppLogo = ({ type = 'round', transparent = false, ...otherProps }: Props) => {
  return <StyledAppLogo $circle={type === 'round'} $transparent={transparent} {...otherProps} />;
};
