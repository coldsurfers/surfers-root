import styled from '@emotion/styled'
import { HEADER_HEIGHT } from '../app-header'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
`

export const ChildrenWrapper = styled.div`
  flex: 1;
  padding-top: ${HEADER_HEIGHT};
`
