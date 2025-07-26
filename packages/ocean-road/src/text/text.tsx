import type { CSSProperties, ElementType, PropsWithChildren } from 'react';
import { StyledTextContainer } from './text.styled';

export const Text = ({
  children,
  style,
  as,
  numberOfLines,
  ...otherProps
}: PropsWithChildren<{
  style?: CSSProperties;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  as?: ElementType<any, keyof JSX.IntrinsicElements>;
  numberOfLines?: number;
}>) => {
  return (
    <StyledTextContainer
      as={as}
      numberOfLines={numberOfLines}
      style={{
        ...style,
      }}
      {...otherProps}
    >
      {children}
    </StyledTextContainer>
  );
};
