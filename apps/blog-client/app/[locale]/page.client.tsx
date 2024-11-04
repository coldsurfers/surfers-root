'use client'

import { PostItem } from '@/features'
import { queryLogs } from '@/lib/utils'
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
        <h1>Blog, COLDSURF</h1>
        <p style={{ fontSize: 16, fontWeight: '400' }}>
          {/* {`Hello, this is COLDSURF blog.\nWe want to make creative, attractive and flexible stuffs. 🎉\nSurflog is about thought provoking ideas. 🗯️\nTechlog is about software engineering articles. 🧑🏻‍💻👩🏻‍💻`} */}
          {t('MainPage.about')}
        </p>
      </Header>

      <div>
        <h1>Latest Surflogs</h1>
        <Posts>
          {latestSurflogs.map((post) => (
            <PostItem key={post.id} post={post} postType="surflog" />
          ))}
        </Posts>
        <h1>Latest Techlogs</h1>
        <Posts>
          {latestTechlogs.map((post) => (
            <PostItem key={post.id} post={post} postType="techlog" />
          ))}
        </Posts>
      </div>
    </div>
  )
}
