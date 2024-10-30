'use client'

import { PostItem } from '@/features'
import { useUIStore } from '@/stores'
import { Paragraph } from '@/ui'
import Link from 'next/link'
import styledW from 'styled-components'
import styled from 'styled-components/native'
import { match } from 'ts-pattern'
import { useShallow } from 'zustand/shallow'
import { queryNotionBlogTechArticles, queryNotionBlogThoughtsArticles } from '../lib/utils'

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
  techPosts,
  thoughtsPosts,
}: {
  techPosts: Awaited<ReturnType<typeof queryNotionBlogTechArticles>>
  thoughtsPosts: Awaited<ReturnType<typeof queryNotionBlogThoughtsArticles>>
}) {
  const activeTab = useUIStore(useShallow((state) => state.activeTab))

  return (
    <div>
      <Header>
        <Paragraph
          style={{
            fontSize: 32,
            fontWeight: 'bold',
          }}
        >
          Blog, ColdSurf
        </Paragraph>
        <Paragraph style={{ fontSize: 16, fontWeight: '400', marginTop: 12 }}>
          🤘🏻 I follow Netflix Rockstar Principle. 🎉 I want to deliver the maximum happiness to users by solving their
          problems with product. 📝 I regularly write technical or thought provoking articles to this blog.
        </Paragraph>
        <Link href="/resume" style={{ marginTop: 14, fontSize: 16, marginLeft: 'auto' }}>
          <Paragraph style={{ textDecorationLine: 'underline' }}>Resume →</Paragraph>
        </Link>
      </Header>

      <Posts>
        {match(activeTab)
          .with('main', () => {
            const latestTechPosts = techPosts.slice(0, 5)
            const latestThoughtPosts = thoughtsPosts.slice(0, 5)

            return (
              <div>
                <h1>Latest Surflogs</h1>
                {latestThoughtPosts.map((post) => (
                  // @ts-ignore
                  <PostItem key={post.id} post={post} />
                ))}
                <h1>Latest Techlogs</h1>
                {latestTechPosts.map((post) => (
                  // @ts-ignore
                  <PostItem key={post.id} post={post} />
                ))}
              </div>
            )
          })
          // @ts-ignore
          .with('techlog', () => techPosts.map((post) => <PostItem key={post.id} post={post} />))
          // @ts-ignore
          .with('surflog', () => thoughtsPosts.map((post) => <PostItem key={post.id} post={post} />))
          .otherwise(() => null)}
      </Posts>
    </div>
  )
}
