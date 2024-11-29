'use client'

import styled from '@emotion/styled'
import Link from 'next/link'

const Container = styled.div`
  width: 100%;
  height: 15rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`

export function Footer() {
  return (
    <Container>
      <p style={{ fontWeight: 'bold' }}>&copy; 2024 COLDSURF, Inc.</p>
      <Link href="/privacy-policy">
        <p>Privacy Policy</p>
      </Link>
      <Link href="/terms-of-service">
        <p>Terms of Service</p>
      </Link>
    </Container>
  )
}
