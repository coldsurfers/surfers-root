import { colors, media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'

export const StyledTopCard = styled(Image)`
  border-radius: 1.5rem;
  background: ${colors.oc.violet[2].value};
  width: 580px;
  height: 28rem;
  object-fit: cover;
  object-position: 50%;
  mask: radial-gradient(100% 100% at center top, #000 60%, transparent 100%);

  ${media.small(css`
    width: 100%;
    border-radius: 0rem;
    height: 20rem;
  `)}
`
