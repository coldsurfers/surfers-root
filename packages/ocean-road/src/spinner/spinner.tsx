import FadeLoader from 'react-spinners/FadeLoader'
import { semantics } from '../tokens'
import { StyledPageLoadingWrapper } from './spinner.styled'
import { SpinnerVariant } from './spinner.types'

export const Spinner = ({ variant }: { variant: SpinnerVariant }) => {
  switch (variant) {
    case 'page-overlay':
      return (
        <StyledPageLoadingWrapper>
          <StyledPageLoadingWrapper>
            <FadeLoader height={13} color={semantics.color.foreground[1]} />
          </StyledPageLoadingWrapper>
        </StyledPageLoadingWrapper>
      )
    default:
      return null
  }
}
