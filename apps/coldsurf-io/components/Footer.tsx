'use client'

import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 15rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`

export default function Footer() {
  return (
    <Container>
      <p style={{ fontWeight: 'bold' }}>&copy; COLDSURF</p>
      <Link href="/privacy-policy">
        <p>Privacy Policy</p>
      </Link>
      <Link href="/terms-of-service">
        <p>Terms of Service</p>
      </Link>
    </Container>
  )
}
