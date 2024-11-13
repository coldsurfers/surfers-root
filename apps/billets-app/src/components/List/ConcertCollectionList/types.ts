import { SectionListData } from 'react-native'
import { ConcertListData } from '../ConcertList/types'

export type ConcertCollectionListSectionT = {
  categoryId: number
  title: string
}

export type ConcertCollectionListItemT = {
  items: ConcertListData
}

export type ConcertCollectionListSection = SectionListData<ConcertCollectionListItemT, ConcertCollectionListSectionT>
export type ConcertCollectionListSections = ReadonlyArray<ConcertCollectionListSection>
