import variables from '@coldsurfers/design-tokens/dist/js/color/semantic/variables'
import FadeLoader from 'react-spinners/FadeLoader'
import { StyledPageLoadingWrapper } from './spinner.styled'
import { SpinnerVariant } from './spinner.types'

export const Spinner = ({ variant }: { variant: SpinnerVariant }) => {
  switch (variant) {
    case 'page-overlay':
      return (
        <StyledPageLoadingWrapper>
          <StyledPageLoadingWrapper>
            <FadeLoader height="13" color={variables.color.foreground[1]} />
          </StyledPageLoadingWrapper>
        </StyledPageLoadingWrapper>
      )
    default:
      return null
  }
}
