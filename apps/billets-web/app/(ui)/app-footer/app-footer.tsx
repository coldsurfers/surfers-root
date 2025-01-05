'use client'

import { Text } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import Link from 'next/link'

const Container = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-top: 15rem;
`

export function AppFooter() {
  return (
    <Container>
      <Text as="p" style={{ fontWeight: 'bold', margin: 'unset' }}>
        &copy; 2024 COLDSURF, Inc.
      </Text>
      <Link href="/privacy-policy">
        <Text as="p" style={{ margin: 'unset' }}>
          Privacy Policy
        </Text>
      </Link>
      <Link href="/terms-of-service">
        <Text as="p" style={{ margin: 'unset' }}>
          Terms of Service
        </Text>
      </Link>
    </Container>
  )
}
