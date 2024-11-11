'use client'

import variables from '@coldsurfers/design-tokens/dist/js/color/semantic/variables'
import { FadeLoader } from 'react-spinners'
import { StyledPageLoadingWrapper } from './page-loading-spinner.styled'

export const PageLoadingSpinner = () => {
  return (
    <StyledPageLoadingWrapper>
      <FadeLoader height="13" color={variables.color.foreground[1]} />
    </StyledPageLoadingWrapper>
  )
}
