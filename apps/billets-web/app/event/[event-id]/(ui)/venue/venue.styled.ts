import { IconButton, semantics, Text } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import { Copy as CopyIcon } from 'lucide-react'

export const StyledVenueContainer = styled.div`
  width: 100%;
`

export const StyledVenueTitleText = styled(Text)`
  font-weight: 500;
  font-size: 20px;
  margin: unset;

  margin-top: 1rem;
`

export const StyledVenueAddressContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`

export const StyledVenueAddressText = styled(Text)`
  margin: unset;
  font-weight: 400;
  font-size: 16px;

  display: flex;
  align-items: center;
`

export const StyledIconButton = styled(IconButton)`
  margin-left: 0.5rem;
`

export const StyledVenueCopyIcon = styled(CopyIcon)`
  width: 18px;
  height: 18px;
  color: ${semantics.color.foreground[1]};
`
