import { StyledPageLoadingWrapper, StyledSpinner } from './spinner.styled'
import { SpinnerVariant } from './spinner.types'

export const Spinner = ({ variant }: { variant: SpinnerVariant }) => {
  switch (variant) {
    case 'page-overlay':
      return (
        <StyledPageLoadingWrapper>
          <StyledPageLoadingWrapper>
            <StyledSpinner />
          </StyledPageLoadingWrapper>
        </StyledPageLoadingWrapper>
      )
    default:
      return null
  }
}
