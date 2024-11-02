'use client'

import variables from '@coldsurfers/design-tokens/dist/js/color/semantic/variables'
import styled from '@emotion/styled'
import { CSSProperties, PropsWithChildren } from 'react'

const ParagraphContainer = styled.p`
  color: ${variables.color.foreground[1]};
  white-space: pre-wrap;
`

export const Paragraph = ({
  children,
  style,
  ...otherProps
}: PropsWithChildren<{
  style?: CSSProperties
}>) => {
  return (
    <ParagraphContainer
      style={{
        ...style,
      }}
      {...otherProps}
    >
      {children}
    </ParagraphContainer>
  )
}
