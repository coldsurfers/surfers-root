'use client'

import { Text } from '@coldsurfers/ocean-road'
import Image from 'next/image'
import Link from 'next/link'
import { StyledHeader, StyledHeaderWrapper } from './header.styled'

export function Header() {
  return (
    <StyledHeaderWrapper>
      <StyledHeader>
        <Link href="/" style={{ paddingLeft: '32px', display: 'flex', alignItems: 'center' }}>
          <Image
            src={'/icons/favicon.ico'}
            width={32}
            height={32}
            alt={'LOGO'}
            style={{
              borderRadius: '50%',
              marginRight: '0.5rem',
            }}
          />
          <Text as="h2">COLDSURF</Text>
        </Link>
      </StyledHeader>
    </StyledHeaderWrapper>
  )
}
