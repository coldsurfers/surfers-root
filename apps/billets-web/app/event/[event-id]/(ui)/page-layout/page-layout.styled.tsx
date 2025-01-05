import styled from '@emotion/styled'
import { HEADER_HEIGHT } from 'app/(ui)'

export const StyledPageLayout = styled.div`
  position: relative; /* Required for sticky */
  height: 100vh; /* Tall parent container */
  display: flex;
  align-items: flex-start;
`

export const StyledPosterContainer = styled.div`
  position: sticky;
  top: calc(${HEADER_HEIGHT} + 32px);
  width: 320px;
  aspect-ratio: 1 / 1;
  flex: 1;
`

export const StyledTopInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  margin-left: 48px;
`
