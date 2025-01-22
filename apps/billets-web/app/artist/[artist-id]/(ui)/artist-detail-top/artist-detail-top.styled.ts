import styled from '@emotion/styled'

export const StyledArtistDetailTopContainer = styled.section`
  display: flex;
  flex-direction: row;
`

export const StyledArtistDetailTopLeft = styled.div`
  flex: 0.5;
  flex-direction: column;
`

export const StyledArtistDetailTopRight = styled.div`
  flex: 0.5;
`

export const StyledArtistThumbnail = styled.img`
  max-width: calc(405px + 37.5vw);
  width: 100%;

  aspect-ratio: 1 / 1;

  border-radius: 1rem;
`
