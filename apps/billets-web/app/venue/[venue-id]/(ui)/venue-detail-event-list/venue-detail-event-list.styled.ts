import { media, semantics, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledVenueDetailEventListTitleText = styled(Text)`
  font-size: 28px;

  ${media.large(css`
    font-size: 20px;
  `)}
`

export const StyledVenueDetailEventListLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  ${media.medium(css`
    grid-template-columns: repeat(1, 1fr);
  `)}
`

export const StyledVenueDetailEventListItem = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledVenueDetailEventListItemThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50%;
  background-color: ${semantics.color.background[4]};

  border-radius: 12px;
`
