'use client'

import { StyledFooter } from './footer.styled'
import { FooterProps } from './footer.types'

export function Footer({ children }: FooterProps) {
  return <StyledFooter>{children}</StyledFooter>
}
