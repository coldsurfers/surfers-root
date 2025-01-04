'use client'

import { Text } from '@coldsurfers/ocean-road'
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

export function AppFooter() {
  return (
    <Container>
      <Text as="p" style={{ fontWeight: 'bold' }}>
        &copy; 2024 COLDSURF, Inc.
      </Text>
      <Link href="/privacy-policy">
        <Text as="p">Privacy Policy</Text>
      </Link>
      <Link href="/terms-of-service">
        <Text as="p">Terms of Service</Text>
      </Link>
    </Container>
  )
}
