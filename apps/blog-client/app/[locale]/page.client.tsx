'use client'

import { useGetLogsQuery } from '@/lib/react-query'
import { Paragraph, PostItem } from '@/ui'
import { media } from '@coldsurfers/ocean-road'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { AppLocale } from 'i18n/types'

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

export default function Page({ locale }: { locale: AppLocale }) {
  const { data: techlogs } = useGetLogsQuery({
    platform: 'techlog',
    locale,
  })
  const { data: surflogs } = useGetLogsQuery({
    platform: 'surflog',
    locale,
  })
  const latestTechlogs = techlogs?.slice(0, 5)
  const latestSurflogs = surflogs?.slice(0, 5)

  return (
    <div style={{ marginTop: '6.5rem' }}>
      <div>
        <Title as="h2">Latest Surflogs</Title>
        <Posts>{latestSurflogs?.map((post) => <PostItem key={post.id} {...post} />)}</Posts>
        <Title as="h2">Latest Techlogs</Title>
        <Posts>{latestTechlogs?.map((post) => <PostItem key={post.id} {...post} />)}</Posts>
      </div>
    </div>
  )
}
