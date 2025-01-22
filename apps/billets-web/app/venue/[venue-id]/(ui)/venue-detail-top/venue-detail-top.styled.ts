import { media, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const VenueDetailTopTitleText = styled(Text)`
  font-size: 64px;

  ${media.large(css`
    font-size: 36px;
  `)}
`
