'use client'

import Link from 'next/link'
import styled from 'styled-components/native'
import styledW from 'styled-components'
import { useEffect, useState } from 'react'
import styles from './index.module.css'
import {
  queryNotionBlogTechArticles,
  queryNotionBlogThoughtsArticles,
} from '../lib/utils'
import Paragraph from '../components/Paragraph'
import PostItem from '../features/posts/ui/PostItem'

const Header = styled.Text`
  margin-top: 50px;
  margin-bottom: 50px;

  display: flex;
  flex-direction: column;
`

const Heading = styled(Paragraph)<{ $isActive: boolean }>`
  margin-bottom: 20px;
  text-transform: uppercase;
  font-size: 16px;
  opacity: 0.6;
  letter-spacing: 0.5px;
  font-weight: bold;
  border-bottom-width: ${({ $isActive }) => ($isActive ? '1px' : '0px')};
  border-bottom-color: ${({ $isActive }) => ($isActive ? 'white' : 'unset')};
`

const Posts = styledW.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const ACTIVE_TAB_KEY = '@blog.coldsurf/activeTab'

export default function Page({
  techPosts,
  thoughtsPosts,
}: {
  techPosts: Awaited<ReturnType<typeof queryNotionBlogTechArticles>>
  thoughtsPosts: Awaited<ReturnType<typeof queryNotionBlogThoughtsArticles>>
}) {
  const [activeTab, setActiveTab] = useState<'tech' | 'thought'>(() => {
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem(ACTIVE_TAB_KEY)
      return savedTab === 'thought' ? 'thought' : 'tech'
    }
    return 'tech'
  })

  useEffect(() => {
    localStorage.setItem(ACTIVE_TAB_KEY, activeTab)
  }, [activeTab])

  return (
    <div>
      <main className={styles.container}>
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
            🤘🏻 I follow Netflix Rockstar Principle. 🎉 I want to deliver the
            maximum happiness to users by solving their problems with product.
            📝 I regularly write technical or thought provoking articles to this
            blog.
          </Paragraph>
          <Link
            href="/resume"
            style={{ marginTop: 14, fontSize: 16, marginLeft: 'auto' }}
          >
            <Paragraph style={{ textDecorationLine: 'underline' }}>
              Resume →
            </Paragraph>
          </Link>
        </Header>

        <div style={{ display: 'flex', gap: 20 }}>
          <div
            onClick={() => setActiveTab('tech')}
            style={{ cursor: 'pointer' }}
          >
            <Heading $isActive={activeTab === 'tech'}>TechLogs</Heading>
          </div>
          <div
            onClick={() => setActiveTab('thought')}
            style={{ cursor: 'pointer' }}
          >
            <Heading $isActive={activeTab === 'thought'}>ThoughtLogs</Heading>
          </div>
        </div>
        <Posts>
          {(activeTab === 'tech' ? techPosts : thoughtsPosts).map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </Posts>
      </main>
    </div>
  )
}
