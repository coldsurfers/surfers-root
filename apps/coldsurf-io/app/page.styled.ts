import styled from '@emotion/styled'
import Image from 'next/image'

export const StyledHomeMainTitle = styled.h1`
  font-size: 48px;
  font-weight: 900;
  white-space: pre-line; /* This allows newline support */

  @media (max-width: 960px) {
    font-size: 32px;
    white-space: normal;
  }
`

export const StyledHomeWrapper = styled.div`
  flex: 1;
`

export const StyledHomeTop = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  padding: 16px;

  @media (max-width: 960px) {
    flex-direction: column-reverse;
  }
`

export const StyledHomeTopImage = styled(Image)`
  border-radius: 8px;

  @media (max-width: 960px) {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`
