import { media, semantics, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledTicketCTAContainer = styled.div`
  display: flex;
  width: 100%;

  border-radius: 8px;
  padding: 1rem;

  background-color: ${semantics.color.background[3]};
`

export const StyledTicketCTALeft = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  justify-content: center;
`

export const StyledTicketSellerText = styled(Text)`
  margin: unset;
  margin-top: 0.25rem;
  font-size: 16px;

  ${media.medium(css`
    font-size: 14px;
  `)}
`

export const StyledTicketPriceText = styled(Text)`
  margin: unset;
  font-size: 20px;
  font-weight: 600;

  ${media.medium(css`
    font-size: 18px;
  `)}
`
