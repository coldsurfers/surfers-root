import styled from '@emotion/styled'
import { LoaderCircle } from 'lucide-react'
import { semantics } from '../tokens'

export const StyledPageLoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledSpinner = styled(LoaderCircle)`
  color: ${semantics.color.foreground[1]};
  width: 32px;
  height: 32px;
`
