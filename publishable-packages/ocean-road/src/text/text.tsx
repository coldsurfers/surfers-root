import {
  type CSSProperties,
  type ComponentPropsWithRef,
  type ElementType,
  type PropsWithChildren,
  forwardRef,
} from 'react';
import { StyledTextContainer } from './text.styled';

type TextProps = PropsWithChildren<
  ComponentPropsWithRef<'span'> & {
    style?: CSSProperties;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    as?: ElementType<any, keyof JSX.IntrinsicElements>;
    numberOfLines?: number;
  }
>;

export const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ children, style, as, numberOfLines, ...otherProps }, ref) => {
    return (
      <StyledTextContainer
        ref={ref}
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
  }
);
