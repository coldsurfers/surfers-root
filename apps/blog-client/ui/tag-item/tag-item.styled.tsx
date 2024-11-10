import variables from '@coldsurfers/design-tokens/dist/js/color/semantic/variables'
import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Paragraph } from '../paragraph'

export const StyledTagItem = styled.div`
  background-color: ${variables.color.background[4]};
  opacity: 0.8;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;

  margin-right: 0.5rem;
  margin-bottom: 0.5rem;

  color: ${variables.color.foreground[3]};
`

export const StyledTagItemText = styled(Paragraph)`
  margin: unset;
  ${media.medium(css`
    font-size: 14px;
  `)}
`
