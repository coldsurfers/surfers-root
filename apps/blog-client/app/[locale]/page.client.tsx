'use client'

import { PostItem } from '@/features'
import { queryLogs } from '@/lib/utils'
import { Paragraph } from '@/ui'
import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useTranslations } from 'next-intl'

const Header = styled.header`
  display: flex;
  flex-direction: column;
`

const Posts = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const Title = styled(Paragraph)`
  ${media.medium(css`
    font-size: 1.25rem;
  `)}
`

const About = styled(Paragraph)`
  font-size: 16px;
  font-weight: 400;

  ${media.medium(css`
    font-size: 14px;
  `)}
`

export default function Page({
  techlogs,
  surflogs,
}: {
  techlogs: Awaited<ReturnType<typeof queryLogs>>
  surflogs: Awaited<ReturnType<typeof queryLogs>>
}) {
  const latestTechlogs = techlogs.slice(0, 5)
  const latestSurflogs = surflogs.slice(0, 5)
  const t = useTranslations()

  return (
    <div>
      <Header>
        <Title as="h1">Blog, COLDSURF</Title>
        <About>{t('MainPage.about')}</About>
      </Header>

      <div>
        <Title as="h1">Latest Surflogs</Title>
        <Posts>
          {latestSurflogs.map((post) => (
            <PostItem key={post.id} post={post} postType="surflog" />
          ))}
        </Posts>
        <Title as="h1">Latest Techlogs</Title>
        <Posts>
          {latestTechlogs.map((post) => (
            <PostItem key={post.id} post={post} postType="techlog" />
          ))}
        </Posts>
      </div>
    </div>
  )
}
