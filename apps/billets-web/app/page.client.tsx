'use client'

import { BILLETS_APP_URL } from '@/features/billets'
import { RecentList } from '@/ui'
import { Button } from '@coldsurfers/ocean-road'
import Link from 'next/link'
import { StyledHomeMainTitle, StyledHomeTop, StyledHomeTopImage, StyledHomeWrapper } from './page.styled'

export function HomePageClient() {
  return (
    <StyledHomeWrapper>
      <StyledHomeTop>
        <div
          style={{
            flex: 1,
          }}
        >
          <StyledHomeMainTitle>Billets</StyledHomeMainTitle>
          <StyledHomeMainTitle>{'예정된\n많은 공연을\n놓치지 마세요 🎉'}</StyledHomeMainTitle>
          <Link href={BILLETS_APP_URL} style={{ display: 'inline-block' }}>
            <Button theme="pink">Get Billets app</Button>
          </Link>
        </div>
        <div style={{ flex: 1, borderRadius: 8 }}>
          <StyledHomeTopImage
            src="https://coldsurf-aws-s3-bucket.s3.ap-northeast-2.amazonaws.com/billets/static/billets-web/static-images/live-party.webp"
            alt="live-party"
            width={500}
            height={500}
          />
        </div>
      </StyledHomeTop>
      <RecentList />
    </StyledHomeWrapper>
  )
}
