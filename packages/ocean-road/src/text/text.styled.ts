import styled from '@emotion/styled'
import { semantics } from '../contexts/ColorSchemeProvider'

export const StyledTextContainer = styled.span`
  color: ${semantics.color.foreground[1]};
  white-space: pre-wrap;
`
