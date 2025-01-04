'use client'

import { BILLETS_APP_URL } from '@/features/billets/billets.constants'
import { Button } from '@coldsurfers/ocean-road'
import Link from 'next/link'
import { StyledHomeMainTitle, StyledHomeTopImage, StyledWrapper } from './page-top.styled'

export function PageTop() {
  return (
    <>
      <StyledWrapper>
        <StyledHomeMainTitle>Billets</StyledHomeMainTitle>
        <StyledHomeMainTitle>{'예정된\n많은 공연을\n놓치지 마세요 🎉'}</StyledHomeMainTitle>
        <Link href={BILLETS_APP_URL} style={{ display: 'inline-block' }}>
          <Button theme="indigo">무료 앱 다운로드하기</Button>
        </Link>
      </StyledWrapper>
      <StyledWrapper>
        <StyledHomeTopImage src="/landing.webp" alt="live-party" width={500} height={500} />
      </StyledWrapper>
    </>
  )
}
