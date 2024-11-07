'use client'

import variables from '@coldsurfers/design-tokens/dist/js/color/semantic/variables'
import styled from '@emotion/styled'
import { CSSProperties, ElementType, PropsWithChildren } from 'react'

const ParagraphContainer = styled.p`
  color: ${variables.color.foreground[1]};
  white-space: pre-wrap;
`

export const Paragraph = ({
  children,
  style,
  as,
  ...otherProps
}: PropsWithChildren<{
  style?: CSSProperties
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: ElementType<any, keyof JSX.IntrinsicElements>
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
  )
}
