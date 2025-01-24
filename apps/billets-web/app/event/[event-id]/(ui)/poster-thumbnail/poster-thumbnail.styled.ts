import { semantics, Text } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'

export const StyledPosterThumbnail = styled.img`
  border-radius: 12px;
  object-fit: cover;
  object-position: 50%;
  width: 100%;
  aspect-ratio: 1 / 1;
`

export const StyledPosterThumbnailEmpty = styled.div`
  border-radius: 12px;
  object-fit: cover;
  object-position: 50%;
  width: 100%;
  aspect-ratio: 1 / 1;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${semantics.color.background[1]};
`

export const StyledPosterThumbnailEmptyText = styled(Text)`
  text-align: center;
  font-weight: 600;
  font-size: 22px;

  padding-left: 1rem;
  padding-right: 1rem;
`
