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

  ${media.small(css`
    grid-template-columns: repeat(1, 1fr);
  `)}
`

export const StyledVenueDetailEventListItem = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 2rem;

  ${media.medium(css`
    margin-bottom: 1.5rem;
  `)}

  ${media.small(css`
    flex-direction: row;
    align-items: center;
  `)}
`

export const StyledVenueDetailEventListItemThumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: 50%;
  background-color: ${semantics.color.background[4]};

  border-radius: 12px;

  ${media.small(css`
    width: 100px;
    height: 100px;
  `)}
`

export const StyledVenueDetailEventListItemTitleText = styled(Text)`
  font-size: 16px;

  margin: unset;
  margin-top: 1rem;

  ${media.medium(css`
    font-size: 14px;
    margin-top: 0.5rem;
  `)}

  ${media.small(css`
    margin-top: unset;
    margin-left: 0.5rem;
  `)}
`
