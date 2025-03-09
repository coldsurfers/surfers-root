import styled from '@emotion/styled'

export const StyledHomeWrapper = styled.div`
  flex: 1;
`

export const StyledHomeTop = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;

  @media (max-width: 960px) {
    flex-direction: column-reverse;
  }
`
