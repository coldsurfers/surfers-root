'use client'

import { CSSProperties, ElementType, PropsWithChildren } from 'react'
import { StyledTextContainer } from './text.styled'

export const Text = ({
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
    <StyledTextContainer
      as={as}
      style={{
        ...style,
      }}
      {...otherProps}
    >
      {children}
    </StyledTextContainer>
  )
}