'use client'

import { useShallow } from 'zustand/shallow'
import { shevilData } from '../../(data)'
import { useCommonStore } from '../../(stores)'
import { HighlightedLink, LinkItem, LinkItemsLayout } from '../../(ui)'
import { parseYtId } from '../../(utils)'

export function LinkItems() {
  const { setSharedLink, toggleShareModalVisible } = useCommonStore(
    useShallow((state) => ({
      toggleShareModalVisible: state.toggleShareModalVisible,
      setSharedLink: state.setSharedLink,
    })),
  )
  return (
    <LinkItemsLayout>
      {shevilData.links.map((link) =>
        link.isHighlighted ? (
          <HighlightedLink key={link.title} type="youtube" youtubeId={parseYtId(link.url) ?? ''} title={link.title} />
        ) : (
          <LinkItem
            key={link.title}
            href={link.url}
            title={link.title}
            onClickShare={() => {
              toggleShareModalVisible()
              setSharedLink(link)
            }}
          />
        ),
      )}
    </LinkItemsLayout>
  )
}
