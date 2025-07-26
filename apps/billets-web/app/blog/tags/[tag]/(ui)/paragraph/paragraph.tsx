'use client';

import { semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import type { CSSProperties, ElementType, JSX, PropsWithChildren } from 'react';

const ParagraphContainer = styled.p`
  color: ${semantics.color.foreground[1]};
  white-space: pre-wrap;
`;

export const Paragraph = ({
  children,
  style,
  as,
  ...otherProps
}: PropsWithChildren<{
  style?: CSSProperties;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  as?: ElementType<any, keyof JSX.IntrinsicElements>;
}>) => {
  return (
    <ParagraphContainer
      as={as}
      style={{
        ...style,
      }}
      {...otherProps}
    >
      {children}
    </ParagraphContainer>
  );
};
