import { media, semantics, Text } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'

export const StyledArtistDetailEventListTitleText = styled(Text)`
  margin-top: 8rem;

  font-size: 28px;

  ${media.large(css`
    font-size: 20px;
  `)}

  ${media.medium(css`
    margin-top: 2rem;
  `)}
`

export const StyledArtistDetailEventListContainer = styled.div`
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const StyledArtistDetailEventListItem = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const StyledArtistDetailEventListItemThumbnail = styled.img`
  width: 110px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: 50%;
  border-radius: 8px;
  margin-right: 1rem;
`

export const StyledArtistDetailEventListItemDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledArtistDetailEventListItemTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin: unset;
  margin-bottom: 0.5rem;

  ${media.medium(css`
    font-size: 18px;
  `)}
`

export const StyledArtistDetailEventListItemDate = styled(Text)`
  font-size: 18px;
  color: ${semantics.color.foreground[1]};

  margin: unset;
  margin-bottom: 0.25rem;

  ${media.medium(css`
    font-size: 16px;
  `)}
`

export const StyledArtistDetailEventListItemVenueText = styled(Text)`
  font-size: 18px;
  color: ${semantics.color.foreground[1]};

  margin: unset;

  ${media.medium(css`
    font-size: 16px;
  `)}
`
