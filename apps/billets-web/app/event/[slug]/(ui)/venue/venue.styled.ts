import { colors, IconButton, semantics, Text } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import { Copy as CopyIcon, MapPin } from 'lucide-react'

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

export const MapPinIcon = styled(MapPin)`
  color: ${colors.oc.white.value};
  width: 20px;
  height: 20px;
  margin-right: 0.25rem;
`

export const CtaButtonWrapper = styled.div`
  display: flex;
  margin-top: 1.25rem;
`

export const OpenInMapsText = styled(Text)`
  color: ${colors.oc.white.value};
  font-size: 14px;
  font-weight: 500;
`
