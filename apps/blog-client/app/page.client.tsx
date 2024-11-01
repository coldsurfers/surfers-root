'use client'

import { PostItem } from '@/features'
import { queryLogs } from '@/lib/utils'
import { Paragraph } from '@/ui'
import styledW from 'styled-components'
import styled from 'styled-components/native'

const Header = styled.Text`
  margin-top: 50px;
  margin-bottom: 50px;

  display: flex;
  flex-direction: column;
`

const Posts = styledW.ol`
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

  return (
    <div>
      <Header>
        <Paragraph
          style={{
            fontSize: 32,
            fontWeight: 'bold',
          }}
        >
          Blog, COLDSURF
        </Paragraph>
        <Paragraph style={{ fontSize: 16, fontWeight: '400', marginTop: 12 }}>
          {`Hello, this is COLDSURF blog.\nWe want to make creative, attractive and flexible stuffs. 🎉\nSurflog is about thought provoking ideas. 🗯️\nTechlog is about software engineering articles. 🧑🏻‍💻👩🏻‍💻`}
        </Paragraph>
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
