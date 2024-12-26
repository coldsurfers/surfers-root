'use client'

import { shevilData } from './(data)'
import { useToggle } from './(hooks)'
import { HeroInfo, LinkItem, LinkItemsLayout, PageLayout, ShareModal, TopCard } from './(ui)'

export default function ShevilPage() {
  const [shareModalVisible, toggleShareModalVisible] = useToggle()
  return (
    <>
      <PageLayout>
        <TopCard backgroundImageUrl="/shevil-hero.webp" />
        <HeroInfo title={shevilData.title} subtitle={shevilData.subtitle} />
        <LinkItemsLayout>
          {shevilData.links.map((link) => (
            <LinkItem
              key={link.title}
              href={link.url}
              title={link.title}
              onClickShare={() => toggleShareModalVisible()}
            />
          ))}
        </LinkItemsLayout>
      </PageLayout>
      <ShareModal visible={shareModalVisible} onClose={() => toggleShareModalVisible()} />
    </>
  )
}
