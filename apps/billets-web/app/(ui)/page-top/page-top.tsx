'use client'

import { APP_STORE_URL } from '@/libs/constants'
import { Button } from '@coldsurfers/ocean-road'
import { SERVICE_NAME } from '@coldsurfers/shared-utils'
import Link from 'next/link'
import { StyledHomeMainTitle, StyledHomeTopImage, StyledWrapper } from './page-top.styled'

export function PageTop() {
  return (
    <>
      <StyledWrapper>
        <StyledHomeMainTitle as="h1">{'SURF YOUR TICKETS\nLIKE A PRO'}</StyledHomeMainTitle>
        <StyledHomeMainTitle as="h2" style={{ fontSize: '32px' }}>
          {SERVICE_NAME}
        </StyledHomeMainTitle>
        <Link href={APP_STORE_URL} style={{ display: 'inline-block' }}>
          <Button theme="border">GET THE APP</Button>
        </Link>
      </StyledWrapper>
      <StyledWrapper>
        <StyledHomeTopImage
          src="https://images.unsplash.com/photo-1521334726092-b509a19597c6?q=80&w=2401&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="live-party"
        />
      </StyledWrapper>
    </>
  )
}
