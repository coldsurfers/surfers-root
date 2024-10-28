'use client'

import styled from 'styled-components'
import UploadForm from '../../ui/UploadForm'

const UploadPage = () => (
  <Wrapper>
    <UploadForm />
  </Wrapper>
)

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default UploadPage
