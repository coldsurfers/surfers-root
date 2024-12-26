'use client'

import { useState } from 'react'
import { shevilData } from './(data)'
import { Link } from './(data)/data.types'
import { useToggle } from './(hooks)'
import { HeroInfo, LinkItem, LinkItemsLayout, PageLayout, ShareModal, TopCard } from './(ui)'

export default function ShevilPage() {
  const [shareModalVisible, toggleShareModalVisible] = useToggle()
  const [sharedLink, setSharedLink] = useState<Link | null>(null)
  return (
    <>
      <PageLayout>
        <TopCard backgroundImageUrl={shevilData.profileImageUrl} />
        <HeroInfo title={shevilData.title} subtitle={shevilData.subtitle} />
        <LinkItemsLayout>
          {shevilData.links.map((link) => (
            <LinkItem
              key={link.title}
              href={link.url}
              title={link.title}
              onClickShare={() => {
                toggleShareModalVisible()
                setSharedLink(link)
              }}
            />
          ))}
        </LinkItemsLayout>
      </PageLayout>
      <ShareModal
        visible={shareModalVisible}
        sharedLink={sharedLink}
        onClose={() => {
          toggleShareModalVisible()
          setSharedLink(null)
        }}
      />
    </>
  )
}
